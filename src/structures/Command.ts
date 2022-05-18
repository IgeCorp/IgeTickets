import { ApplicationCommandData } from "discord.js";

export default class Command {
    options: ApplicationCommandData;

    constructor(options: ApplicationCommandData) {
        this.options = options;

        // return an error when the type of the command is not equal to 'CHAT_INPUT'
        //if (!['CHAT_INPUT'].includes(this.options!.type)) throw new Error('The type of the command must be equal to "CHAT_INPUT"');

        return this;
    }
}