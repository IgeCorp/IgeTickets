import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import Command from "../structures/Command";
import { CommandInteraction } from "../structures/Interaction";
import { testModal } from "../structures/Modal";

class Query extends Command {
    constructor() {
        super({
            name: "query",
            description: "Sql query",
            defaultMemberPermissions: PermissionFlagsBits.Administrator.toString(),
            guildOnly: true,
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "query",
                    description: "The query to run",
                    required: true
                }
            ]
        });
    }

    async run(interaction: CommandInteraction): Promise<void> {
        const query = interaction.options.get("query");

        interaction.client.db.query(`${query!.value}`, (err, result) => {
            if (err) {
                interaction.reply({
                    content: `An error occurred while running the query: \`\`\`\n${err}\n\`\`\``
                });
            } else {
                interaction.reply({
                    content: `Query executed successfully: \`\`\`\n${JSON.stringify(result)}\n\`\`\``
                });
            }
        });
    }
}

export = new Query;