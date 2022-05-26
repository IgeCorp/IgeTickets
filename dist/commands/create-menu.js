"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const menu_1 = __importDefault(require("../components/modals/menu"));
const Command_1 = __importDefault(require("../structures/Command"));
class CreateMenu extends Command_1.default {
    constructor() {
        super({
            name: "create-menu",
            name_localizations: {
                "fr": "creer-menu",
                "en-GB": "create-menu",
                "en-US": "create-menu",
            },
            description: "Creates a menu",
            description_localizations: {
                "fr": "Crée un menu",
                "en-GB": "Creates a menu",
                "en-US": "Creates a menu"
            },
            guildOnly: true,
            defaultMemberPermissions: discord_js_1.PermissionFlagsBits.ManageGuild.toString()
        });
    }
    async run(interaction) {
        const menu = new menu_1.default();
        await interaction.client.sendModal(interaction, menu);
        menu.handleSubmit(interaction);
    }
}
module.exports = new CreateMenu;
