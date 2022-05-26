"use strict";
module.exports = (client, interaction) => {
    if (interaction.isCommand()) {
        const command = client.slashs.get(interaction.commandName);
        try {
            command?.run(interaction);
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: `An error occurred while running the command ${command.name}: \`\`\`\n${error}\n\`\`\``
            });
        }
    }
};
