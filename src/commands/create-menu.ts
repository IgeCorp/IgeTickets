import { ApplicationCommandOptionType } from "discord.js";
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
            defaultMemberPermission: "ModerateMembers",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "name",
                    name_localization: {
                        "fr": "nom",
                        "en-GB": "name"
                    },
                    description: "The name of the menu",
                    description_localization: {
                        "fr": "Le nom du menu",
                        "en-GB": "The name of the menu"
                    },
                    required: true
                }
            ]
        });
    }

    async run(interaction: CommandInteraction): Promise<void> {
    }
}

export = new CreateMenu;