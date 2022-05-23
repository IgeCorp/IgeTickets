import { CommandInteraction } from "../../structures/Interaction";
import SelectMenu from "../../structures/SelectMenu";

export default class Team extends SelectMenu {
    constructor(interaction: CommandInteraction) {
        let options: { label: any; value: any; }[] = [];

        interaction.client.db.query(`SELECT * FROM teams WHERE guild = ${interaction.guild!.id}`, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }

            res.forEach((row: any) => {
                console.log(row);
                options.push({
                    label: row.name,
                    value: row.role
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