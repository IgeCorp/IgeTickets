import { CommandInteraction } from "../../structures/Interaction";
import SelectMenu from "../../structures/SelectMenu";

export default class Team extends SelectMenu {
    constructor(interaction: CommandInteraction) {
        let options: { label: any; value: any; description: string; }[] = [];
        
        interaction.client.db.query(`SELECT * FROM teams WHERE guild = ${interaction.guild!.id}`, (err, res) => {
            if (err) {
                interaction.reply("An error occured while fetching the teams.");
                return;
            }
            
            res.forEach((row: any) => {
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
        })
    }
}