import { Client as DiscordClient, Collection, Partials } from 'discord.js';
import { readdirSync } from 'fs';
import { Connection, createConnection } from 'mysql';
import { join } from 'path';
import Command from './Command';

export default class Client extends DiscordClient {
    db: Connection;
    slashs: Collection<string, Command>;
    
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

        this.login(process.env.DISCORD_TOKEN);
    }

    get commands(): Collection<string, Command> {
        return this.slashs;
    }

    postSlashs(slashs: any): void {
        if (!this.isReady()) return console.error('Client is not ready.');

        this.application.commands.set(slashs.toJSON());
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
                const file = require(join(__dirname, '../commands', command));
                this.slashs.set(file.options.name, file);
                delete require.cache[require.resolve(join(__dirname, '../commands', command))];
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