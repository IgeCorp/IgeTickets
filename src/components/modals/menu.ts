import { TextInputStyle } from "discord.js";
import { CommandInteraction } from "../../structures/Interaction";
import Modal from "../../structures/Modal";
import TextInput from "../../structures/TextInput";

export default class Menu extends Modal {
    constructor(interaction: CommandInteraction) {
        super({
            title: "Menu Creation",
            customId: "menu-creation",
            components: [
                {
                    type: 1,
                    components: [
                        new TextInput({
                            customId: "description",
                            placeholder: "Menu description",
                            required: true,
                            label: "Description",
                            maxLength: 4000,
                            minLength: 1,
                            style: TextInputStyle.Paragraph
                        })
                    ]
                }
            ]
        });
    }
}

// new TextInput({
//     customId: "title",
//     placeholder: "Menu title",
//     required: true,
//     label: "Title",
//     maxLength: 100,
//     minLength: 1,
//     style: TextInputStyle.Short
// })

//             new TextInput({
//                 customId: "team",
//                 placeholder: "Type the name of the team(s) you want to add to the menu",
//                 required: true,
//                 label: "Type the name of the team(s) you want to add to the menu",
//                 style: TextInputStyle.Short
//             })

//             new TextInput({
//                 customId: "channel",
//                 placeholder: "Type the id of the channel you want to use for the menu",
//                 required: true,
//                 label: "Type the id of the channel you want to use for the menu",
//                 style: TextInputStyle.Short
//             })