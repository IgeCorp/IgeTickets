"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SelectMenu_1 = __importDefault(require("../../structures/SelectMenu"));
class Channels extends SelectMenu_1.default {
    constructor(interaction) {
        const channels = interaction.guild?.channels;
        let options = [];
        channels?.cache.map((channel) => {
            if (channel.type !== discord_js_1.ChannelType.GuildText)
                return;
            options.push({
                label: channel.name,
                value: channel.id,
                description: "Use this channel for the menu"
            });
        });
        super({
            customId: "channels",
            options: options,
            placeholder: "Select one channel"
        });
    }
}
exports.default = Channels;
