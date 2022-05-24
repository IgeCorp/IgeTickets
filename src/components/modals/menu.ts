import { ChannelType, ModalSubmitInteraction, TextInputStyle } from "discord.js";
import { CommandInteraction } from "../../structures/Interaction";
import Modal from "../../structures/Modal";
import TextInput from "../../structures/TextInput";

export default class Menu extends Modal {
    constructor() {
        super({
            title: "Menu Creation",
            customId: "menu-creation",
            components: [
                {
                    type: 1,
                    components: [
                        new TextInput({
                            customId: "title",
                            placeholder: "Menu title",
                            required: true,
                            label: "Title",
                            maxLength: 100,
                            minLength: 1,
                            style: TextInputStyle.Short
                        })
                    ]
                }, {
                    type: 1,
                    components: [
                        new TextInput({
                            customId: "description",
                            placeholder: "Menu description",
                            required: true,
                            label: "Description",
                            maxLength: 4000,
                            minLength: 20,
                            style: TextInputStyle.Paragraph
                        })
                    ]
                }, {
                    type: 1,
                    components: [
                        new TextInput({
                            customId: "team",
                            placeholder: "Type the name of the team(s) you want to add to the menu",
                            required: true,
                            label: "Team(s)",
                            maxLength: 2000,
                            minLength: 1,
                            style: TextInputStyle.Short
                        })
                    ]
                }, {
                    type: 1,
                    components: [
                        new TextInput({
                            customId: "channel",
                            placeholder: "Type the id of the channel you want to use for the menu",
                            required: true,
                            label: "Channel",
                            maxLength: 18,
                            minLength: 18,
                            style: TextInputStyle.Short
                        })
                    ]
                }
            ]
        });
    }

    async handleSubmit(interaction: CommandInteraction): Promise<void> {
        await interaction.awaitModalSubmit({
            time: 180000,
            filter: (modal: ModalSubmitInteraction) => modal.customId === "menu-creation"
        }).then(async (modal: ModalSubmitInteraction) => {
            const title = modal.fields.getTextInputValue("title");
            const description = modal.fields.getTextInputValue("description");
            const team = modal.fields.getTextInputValue("team");
            const channel = modal.fields.getTextInputValue("channel");

            interaction.client.db.query(`SELECT * FROM teams WHERE guild = ${interaction.guild!.id}`, (err, res) => {
                if (err) {
                    interaction.reply("An error occured while trying to get the teams");
                    return;
                }

                const teams = res.rows;
                const teamsName = team.split(" ");
                const teamIds = [];

                let desactived = false;

                for (const team of teams) {
                    for (const teamName of teamsName) {
                        if (desactived !== true && team.name.toLowerCase() === teamName.toLowerCase()) teamIds.push(team.id);
                        else {
                            desactived = true;
                            interaction.reply(`The team ${teamName} does not exist`);
                        }
                    }
                }

                if (desactived === false) return;

                const verifyType = channel!.match(/^[0-9]{18}$/);

                if (verifyType === null) return interaction.reply("The channel id is not valid");

                const getChannel = interaction.guild!.channels.cache.get(`${channel}`);

                if (getChannel?.type !== ChannelType.GuildText) return interaction.reply("The channel type is not guild text");

                if (!getChannel.permissionsFor(interaction.client.user!)!.has("SendMessages")) return interaction.reply("I don't have the permission to send messages in this channel");

                const messageData = {
                    content: null,
                    embeds: [
                        {
                            title: title,
                            description: description,
                            color: 0x619bff,
                            thumbnail: {
                                url: `${interaction.guild!.iconURL()}`
                            }
                        }
                    ],
                    components: []
                }

                interaction.client.db.query(`INSERT INTO menus (guild, title, description, team, channel) VALUES (${interaction.guild!.id}, '${title}', '${description}', '${teamIds.join(" ")}', '${channel}')`, (err, _res) => {
                    if (err) {
                        interaction.reply("An error occured while trying to create the menu");
                        return;
                    }

                    let error = false;

                    getChannel.send(messageData).catch(err => {
                        interaction.reply("An error occured while trying to send the message");
                        console.error(err);
                        error = true;

                        interaction.client.db.query(`DELETE FROM menus WHERE guild = ${interaction.guild!.id} AND title = '${title}'`, (err, _res) => {
                            if (err) {
                                interaction.reply("An error occured while trying to delete the menu");
                                console.error(err);
                            }
                        });
                    });

                    if (error === false) interaction.reply("The menu has been created");
                });
            });
        }).catch(console.error);
    }
}