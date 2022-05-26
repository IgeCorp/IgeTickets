"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const mysql_1 = require("mysql");
const path_1 = require("path");
const axios_1 = __importDefault(require("axios"));
class Client extends discord_js_1.Client {
    db;
    slashs;
    testGuild;
    _baseApiURI;
    _guildCommandsApiURI;
    _headers;
    constructor() {
        super({
            partials: [
                discord_js_1.Partials.Channel,
                discord_js_1.Partials.GuildMember,
                discord_js_1.Partials.Message,
                discord_js_1.Partials.ThreadMember,
                discord_js_1.Partials.User
            ], intents: [
                'DirectMessages',
                'GuildBans',
                'GuildIntegrations',
                'GuildMembers',
                'GuildMessages',
                'GuildWebhooks',
                'Guilds',
                'MessageContent'
            ], allowedMentions: {
                repliedUser: false
            }
        });
        this.slashs = new discord_js_1.Collection();
        this.testGuild = process.env.TEST_GUILD;
        this.db = (0, mysql_1.createConnection)({
            localAddress: process.env.DB_IP,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWD,
            database: process.env.DB,
            connectTimeout: 10000
        });
        this.db.connect();
        this._loadEvents();
        this._loadCommands();
        // this._dropAllTables();
        this._loadTables();
        this._baseApiURI = `https://discord.com/api/v10/applications/{application_id}/commands`;
        this._guildCommandsApiURI = `https://discord.com/api/v10/applications/{application_id}/guilds/{guild_id}/commands`;
        this._headers = {
            'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json'
        };
        this.login(process.env.DISCORD_TOKEN);
    }
    postSlashs() {
        if (!this.isReady())
            return console.error('Client is not ready.');
        const apiURI = this._baseApiURI.replace('{application_id}', this.user.id);
        const guildApiURI = this._guildCommandsApiURI.replace('{application_id}', this.user.id).replace('{guild_id}', `${this.testGuild}`);
        this.slashs.forEach(async (slash) => {
            try {
                if (slash.data.guild_only)
                    return await (0, axios_1.default)({
                        method: 'post',
                        url: guildApiURI,
                        headers: this._headers,
                        data: slash.data
                    });
                await (0, axios_1.default)({
                    method: 'post',
                    url: apiURI,
                    headers: this._headers,
                    data: slash.data
                });
            }
            catch (error) {
                console.error(error);
            }
        });
        console.log('Slashs posted.');
    }
    async sendModal(interaction, modal) {
        const apiUri = 'https://discord.com/api/v10/interactions/{interaction_id}/{interaction_token}/callback';
        const uri = apiUri.replace('{interaction_id}', interaction.id).replace('{interaction_token}', interaction.token);
        try {
            await (0, axios_1.default)({
                method: 'post',
                url: uri,
                headers: this._headers,
                data: {
                    type: 9,
                    data: modal.data
                }
            });
        }
        catch (error) {
            console.error(error.response);
        }
    }
    async _deleteAllCommandsOfClient() {
        const apiURI = this._baseApiURI.replace('{application_id}', this.user.id);
        const guildApiURI = this._guildCommandsApiURI.replace('{application_id}', this.user.id).replace('{guild_id}', `${this.testGuild}`);
        try {
            const data = await (0, axios_1.default)({
                method: 'get',
                url: apiURI,
                headers: this._headers
            });
            const data2 = await (0, axios_1.default)({
                method: 'get',
                url: guildApiURI,
                headers: this._headers
            });
            console.log(data.data);
            console.log(data2.data);
            data.data.forEach((command) => {
                (0, axios_1.default)({
                    method: 'delete',
                    url: apiURI + `/${command.id}`,
                    headers: this._headers
                });
            });
            data2.data.forEach((command) => {
                (0, axios_1.default)({
                    method: 'delete',
                    url: guildApiURI + `/${command.id}`,
                    headers: this._headers
                });
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    /* Loaders */
    _loadEvents() {
        let count = 0;
        const events = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, '../events'));
        events.forEach(event => {
            try {
                const file = require((0, path_1.join)(__dirname, '../events', event));
                this.on(event.split('.')[0], file.bind(null, this));
                count++;
            }
            catch (error) {
                throw new Error(`An error occurred while loading event ${event}: ${error}`);
            }
        });
        console.log(`Loaded ${count}/${events.length} events.`);
    }
    _loadCommands() {
        let count = 0;
        const commands = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, '../commands'));
        commands.forEach(command => {
            try {
                const file = require((0, path_1.join)(__dirname, '../commands', command));
                this.slashs.set(file.data.name, file);
                count++;
            }
            catch (error) {
                throw new Error(`An error occurred while loading command ${command}: ${error}`);
            }
        });
        console.log(`Loaded ${count}/${commands.length} commands.`);
    }
    _loadTables() {
        let count = 0;
        const tables = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, '../database'));
        tables.forEach(table => {
            try {
                const file = require((0, path_1.join)(__dirname, '../database', table));
                new file(this);
                delete require.cache[require.resolve((0, path_1.join)(__dirname, '../database', table))];
                count++;
            }
            catch (error) {
                throw new Error(`An error occurred while loading table ${table}: ${error}`);
            }
        });
        console.log(`Loaded ${count}/${tables.length} tables.`);
    }
    _dropAllTables() {
        const tables = (0, fs_1.readdirSync)((0, path_1.join)(__dirname, '../database'));
        tables.forEach((table) => this.db.query(`DROP TABLE IF EXISTS ${table.split('.')[0]}`));
        console.log('Tables dropped.');
    }
}
exports.default = Client;
