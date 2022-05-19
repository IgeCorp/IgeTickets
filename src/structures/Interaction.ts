import type { Interaction as DiscordInteraction, CommandInteraction as DiscordCommand } from 'discord.js';
import Client from './Client';

export interface Interaction extends DiscordInteraction {
    client: Client;
}

export interface CommandInteraction extends DiscordCommand {
    client: Client;
}