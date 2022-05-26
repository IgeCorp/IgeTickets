"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SelectMenu_1 = __importDefault(require("../../structures/SelectMenu"));
class Team extends SelectMenu_1.default {
    constructor(interaction) {
        let options = [];
        interaction.client.db.query(`SELECT * FROM teams WHERE guild = ${interaction.guild.id}`, (err, res) => {
            if (err) {
                interaction.reply("An error occured while fetching the teams.");
                return;
            }
            res.forEach((row) => {
                options.push({
                    label: row.name,
                    value: row.role,
                    description: row.description
                });
            });
        });
        super({
            customId: "team",
            options: options,
            placeholder: "Select one or multiple teams",
            minValues: 1,
            maxValues: 10
        });
    }
}
exports.default = Team;
