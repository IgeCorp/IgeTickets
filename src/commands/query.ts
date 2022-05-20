import { ApplicationCommandOptionType } from "discord.js";
import Command from "../structures/Command";
import { CommandInteraction } from "../structures/Interaction";

class Query extends Command {
    constructor() {
        super({
            name: "query",
            description: "Sql query",
            defaultMemberPermission: "SendMessages",
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

    run(interaction: CommandInteraction): void {
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