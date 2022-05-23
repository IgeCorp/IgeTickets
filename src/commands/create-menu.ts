import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import Command from "../structures/Command";
import { CommandInteraction } from "../structures/Interaction";

class CreateMenu extends Command {
    constructor() {
        super({
            name: "create-menu",
            name_localization: {
                "fr": "creer-menu",
                "en-GB": "create-menu"
            },
            description: "Creates a menu",
            description_localization: {
                "fr": "Crée un menu",
                "en-GB": "Creates a menu"
            },
            guildOnly: true,
            defaultMemberPermissions: PermissionFlagsBits.ManageGuild.toString(),
            options: [
                {
                    type: ApplicationCommandOptionType.Channel,
                    name: "channel",
                    name_localization: {
                        "fr": "channel",
                        "en-GB": "channel"
                    },
                    description: "The channel where the menu will be created",
                    description_localization: {
                        "fr": "Le channel où le menu sera créé",
                        "en-GB": "The channel where the menu will be created"
                    },
                    required: true
                }
            ]
        });
    }

    async run(interaction: CommandInteraction): Promise<void> {
        const channel = interaction.options.get("channel");

        console.log(channel?.channel);
    }
}

export = new CreateMenu;