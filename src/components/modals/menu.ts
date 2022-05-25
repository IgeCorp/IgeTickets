import { ChannelType, ModalSubmitInteraction, TextInputStyle } from "discord.js";
import { CommandInteraction } from "../../structures/Interaction";
import Modal from "../../structures/Modal";
import TextInput from "../../structures/TextInput";
import Team from "../selectors/team";

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
                            placeholder: "Please give a complete description of the menu",
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
            time: 120000,
            filter: (modal: ModalSubmitInteraction) => modal.customId === "menu-creation"
        }).then(async (modal: ModalSubmitInteraction) => {
            const title = modal.fields.getTextInputValue("title");
            const description = modal.fields.getTextInputValue("description");
            const team = modal.fields.getTextInputValue("team");
            const channel = modal.fields.getTextInputValue("channel");

            if (!title || !description || !team || !channel) return modal.reply("You must fill in all the fields.");

            interaction.client.db.query(`SELECT * FROM teams WHERE guild = ${interaction.guild!.id}`, (err, res) => {
                if (err) {
                    modal.reply("An error occured while trying to get the teams");
                    return;
                }

                const teamsName = team.split(" ");
                const teamIds: any[] = [];

                let desactived = false;

                res.forEach((row: any) => {
                    for (const teamName of teamsName) {
                        if (desactived === false && row.name.toLowerCase() === teamName.toLowerCase()) teamIds.push(row.id);
                        else if (desactived === false && row.name.toLowerCase() !== teamName.toLowerCase()) {
                            desactived = true;
                            modal.reply(`The team ${teamName} is not in the database`);
                            return;
                        }
                    }
                });

                if (desactived !== false) return;

                const verifyType = channel!.match(/^[0-9]{18}$/);

                if (verifyType === null) return modal.reply("The channel id is not valid");

                const getChannel = interaction.guild!.channels.cache.get(`${channel}`);

                if (getChannel?.type !== ChannelType.GuildText) return modal.reply("The channel type is not guild text");

                if (!getChannel.permissionsFor(interaction.client.user!)!.has("SendMessages")) return modal.reply("I don't have the permission to send messages in this channel");

                let messageData = {
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
                    components: [
                        {
                            type: 1,
                            components: [
                                new Team(interaction)
                            ]
                        }
                    ]
                }

                interaction.client.db.query(`INSERT INTO menus (guild, title, description, team, channel) VALUES (${interaction.guild!.id}, '${title}', '${description}', '${teamIds.join(" ")}', '${channel}')`, (err, _res) => {
                    if (err) {
                        modal.reply("An error occured while trying to create the menu");
                        return;
                    }

                    let error = false;

                    getChannel.send(messageData)
                        .then(async (message: any) => {
                            interaction.client.db.query(`UPDATE menus SET message = '${message.id}' WHERE guild = ${interaction.guild!.id} AND channel = '${channel}'`, (err, _res) => {
                                if (err) {
                                    error = true;
                                    modal.reply("An error occured while trying to create the menu");
                                    return;
                                }
                            });
                        })
                        .catch(err => {
                        modal.reply("An error occured while trying to send the message");
                        console.error(err);
                        error = true;

                        interaction.client.db.query(`DELETE FROM menus WHERE guild = ${interaction.guild!.id} AND title = '${title}'`, (err, _res) => {
                            if (err) {
                                modal.reply("An error occured while trying to delete the menu");
                                console.error(err);
                            }
                        });
                    });

                    if (error === false) modal.reply("The menu has been created");

                    
                });
            });
        }).catch(console.error);
    }
}