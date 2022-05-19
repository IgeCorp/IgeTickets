import Client from "../structures/Client";
import { Interaction } from "../structures/Interaction";

export = (client: Client, interaction: Interaction) => {
    if (interaction.isCommand()) {
        const command = client.slashs.find(slash => slash.data.name === interaction.commandName);

        try {
            command.run(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: `An error occurred while running the command ${command.data.name}: \`\`\`\n${error}\n\`\`\``
            });
        }
    }
}