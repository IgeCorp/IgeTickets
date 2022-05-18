import { Client as DiscordClient, Collection, Partials } from 'discord.js';
import mysql from 'mysql';

export default class Client extends DiscordClient {
    db: mysql.Connection;
    slashs: Collection<string, any>;
    
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

        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWD,
            database: process.env.DB,
            localAddress: process.env.DB_IP
        });

        this.db.connect();
        this.login(process.env.DISCORD_TOKEN);
    }
}