import type { Interaction as DiscordInteraction, CommandInteraction as DiscordCommand, ModalSubmitInteraction as DiscordModalInteraction } from 'discord.js';
import Client from './Client';
import Modal from './Modal';

export interface Interaction extends DiscordInteraction {
    client: Client;
    showModal(modal: Modal): Promise<void>;
}

export interface CommandInteraction extends DiscordCommand {
    client: Client;
}

export interface ModalSubmitInteraction extends DiscordModalInteraction {
    client: Client;
}