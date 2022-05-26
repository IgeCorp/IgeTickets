"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../structures/Command"));
class Query extends Command_1.default {
    constructor() {
        super({
            name: "query",
            description: "Sql query",
            defaultMemberPermissions: discord_js_1.PermissionFlagsBits.Administrator.toString(),
            guildOnly: true,
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "query",
                    description: "The query to run",
                    required: true
                }
            ]
        });
    }
    async run(interaction) {
        const query = interaction.options.get("query");
        interaction.client.db.query(`${query.value}`, (err, result) => {
            if (err) {
                interaction.reply({
                    content: `An error occurred while running the query: \`\`\`\n${err}\n\`\`\``
                });
            }
            else {
                interaction.reply({
                    content: `Query executed successfully: \`\`\`\n${JSON.stringify(result)}\n\`\`\``
                });
            }
        });
    }
}
module.exports = new Query;
