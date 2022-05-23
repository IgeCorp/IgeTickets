import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import Menu from "../components/modals/menu";
import Team from "../components/selectors/team";
import Command from "../structures/Command";
import { CommandInteraction } from "../structures/Interaction";

class CreateMenu extends Command {
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
            defaultMemberPermissions: PermissionFlagsBits.ManageGuild.toString()
        });
    }

    async run(interaction: CommandInteraction): Promise<void> {
        await interaction.client.sendModal(interaction, new Menu(interaction));
    }
}

export = new CreateMenu;