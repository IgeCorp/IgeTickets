import { Client as DiscordClient, Collection, Partials } from 'discord.js';
import { readdirSync } from 'fs';
import { Connection, createConnection } from 'mysql';
import { join } from 'path';
import axios from 'axios';
import Command from './Command';
import { CommandInteraction } from './Interaction';
import Modal from './Modal';

export default class Client extends DiscordClient {
    db: Connection;
    slashs: Collection<string, any>;
    testGuild: string | undefined;
    private _baseApiURI: string;
    private _guildCommandsApiURI: string;
    private _headers: { Authorization: string; 'Content-Type': string; };
    
    constructor() {
        super({
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.ThreadMember,
                Partials.User
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

        this.slashs = new Collection();
        this.testGuild = process.env.TEST_GUILD;

        this.db = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWD,
            database: process.env.DB,
            localAddress: process.env.DB_IP
        });

        this.db.connect();

        this._eventsHandler();
        this._loadCommands();
        this._loadTables();

        this._baseApiURI = `https://discord.com/api/v10/applications/{application_id}/commands`;
        this._guildCommandsApiURI = `https://discord.com/api/v10/applications/{application_id}/guilds/{guild_id}/commands`;
        this._headers = {
            'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json'
        }

        this.login(process.env.DISCORD_TOKEN);
    }

    async postSlashs(slashs: any): Promise<void> {
        if (!this.isReady()) return console.error('Client is not ready.');

        //await this._deleteAllCommandsOfClient();

        const apiURI = this._baseApiURI.replace('{application_id}', this.user.id);
        const guildApiURI = this._guildCommandsApiURI.replace('{application_id}', this.user.id).replace('{guild_id}', `${this.testGuild}`);

        slashs.forEach((slash: Command) => {
            try {
                if (slash.data.guild_only) return axios({
                    method: 'post',
                    url: guildApiURI,
                    headers: this._headers,
                    data: slash.data
                });
                
                axios({
                    method: 'post',
                    url: apiURI,
                    headers: this._headers,
                    data: slash.data
                });
            } catch (error: any) {
                console.error(error);
            }
        });
    }

    async sendModal(interaction: CommandInteraction, modal: Modal): Promise<void> {
        const apiUri = 'https://discord.com/api/v10/interactions/{interaction_id}/{interaction_token}/callback';

        const uri = apiUri.replace('{interaction_id}', interaction.id).replace('{interaction_token}', interaction.token);

        try {
            await axios({
                method: 'post',
                url: uri,
                headers: this._headers,
                data: {
                    type: 9,
                    data: modal.data
                }
            });
        } catch (error: any) {
            console.error(error.response);
        }
    }

    private async _deleteAllCommandsOfClient(): Promise<void> {
        const apiURI = this._baseApiURI.replace('{application_id}', this.user!.id);
        const guildApiURI = this._guildCommandsApiURI.replace('{application_id}', this.user!.id).replace('{guild_id}', `${this.testGuild}`);

        try {
            const data = await axios({
                method: 'get',
                url: apiURI,
                headers: this._headers
            });

            const data2 = await axios({
                method: 'get',
                url: guildApiURI,
                headers: this._headers
            });

            // data.data.forEach((command: any) => {
            //     axios({
            //         method: 'delete',
            //         url: apiURI + `/${command.id}`,
            //         headers: this._headers
            //     });
            // });

            // data2.data.forEach((command: any) => {
            //     axios({
            //         method: 'delete',
            //         url: guildApiURI + `/${command.id}`,
            //         headers: this._headers
            //     });
            // });
        } catch (error: any) {
            console.error(error);
        }
    }

    private _eventsHandler(): void {
        let count = 0;
        const events = readdirSync(join(__dirname, '../events'));
        events.forEach(event => {
            try {
                const file = require(join(__dirname, '../events', event));
                this.on(event.split('.')[0], file.bind(null, this));
                delete require.cache[require.resolve(join(__dirname, '../events', event))];
                count++;
            } catch (error: any) {
                throw new Error(`An error occurred while loading event ${event}: ${error}`);
            }
        });
        console.log(`Loaded ${count}/${events.length} events.`);
    }

    private _loadCommands(): void {
        let count = 0;
        const commands = readdirSync(join(__dirname, '../commands'));
        commands.forEach(command => {
            try {
                delete require.cache[require.resolve(join(__dirname, '../commands', command))];
                const file = require(join(__dirname, '../commands', command));
                this.slashs.set(file.data.name, file);
                count++;
            } catch (error: any) {
                throw new Error(`An error occurred while loading command ${command}: ${error}`);
            }
        });
        console.log(`Loaded ${count}/${commands.length} commands.`);
    }

    _loadTables(): void {
        let count = 0;
        const tables = readdirSync(join(__dirname, '../database'));
        tables.forEach(table => {
            try {
                const file = require(join(__dirname, '../database', table));
                new file(this);
                delete require.cache[require.resolve(join(__dirname, '../database', table))];
                count++;
            } catch (error: any) {
                throw new Error(`An error occurred while loading table ${table}: ${error}`);
            }
        });
        console.log(`Loaded ${count}/${tables.length} tables.`);
    }
}