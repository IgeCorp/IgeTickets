import { ChannelType } from "discord.js";
import { CommandInteraction } from "../../structures/Interaction";
import SelectMenu from "../../structures/SelectMenu";

export default class Channels extends SelectMenu {
    constructor(interaction: CommandInteraction) {
        const channels = interaction.guild?.channels;
        let options: { label: any; value: any; description: string; }[] = []

        channels?.cache.map((channel: any) => {
            if (channel.type !== ChannelType.GuildText) return;
            options.push({
                label: channel.name,
                value: channel.id,
                description: "Use this channel for the menu"
            });
        });

        super({
            customId: "channels",
            options: options,
            placeholder: "Select one channel"
        })
    }
}