import { ApplicationCommandOptionType, ChannelType, PermissionFlagsBits } from "discord.js";
import Command from "../structures/Command";
import { CommandInteraction } from "../structures/Interaction";

class CreateTeam extends Command {
    constructor() {
        super({
            name: "create-team",
            name_localizations: {
                "fr": "creer-equipe",
                "en-GB": "create-team",
                "en-US": "create-team",
            },
            description: "Creates a team",
            description_localizations: {
                "fr": "Crée une équipe",
                "en-GB": "Creates a team",
                "en-US": "Creates a team"
            },
            guildOnly: true,
            defaultMemberPermissions: PermissionFlagsBits.ManageGuild.toString(),
            options: [
                {
                    type: ApplicationCommandOptionType.Role,
                    name: "role",
                    name_localizations: {
                        "fr": "role",
                        "en-GB": "role",
                        "en-US": "role"
                    },
                    description: "The role of the team",
                    description_localizations: {
                        "fr": "Le role de l'équipe",
                        "en-GB": "The role of the team",
                        "en-US": "The role of the team"
                    },
                    required: true
                }, {
                    type: ApplicationCommandOptionType.String,
                    name: "name",
                    name_localizations: {
                        "fr": "nom",
                        "en-GB": "name",
                        "en-US": "name"
                    },
                    description: "The name of the team",
                    description_localizations: {
                        "fr": "Le nom de l'équipe",
                        "en-GB": "The name of the team",
                        "en-US": "The name of the team"
                    },
                    required: true
                }, {
                    type: ApplicationCommandOptionType.Channel,
                    name: "category",
                    name_localizations: {
                        "fr": "categorie",
                        "en-GB": "category",
                        "en-US": "category"
                    },
                    description: "The category where the tickets will be created",
                    description_localizations: {
                        "fr": "La catégorie où les tickets seront créés",
                        "en-GB": "The category where the tickets will be created",
                        "en-US": "The category where the tickets will be created"
                    },
                    required: true
                }
            ]
        });
    }

    async run(interaction: CommandInteraction): Promise<void> {
        let desactivated = false;

        const role = interaction.options.get("role");
        const name = interaction.options.get("name");
        const category = interaction.options.get("category");

        if (role!.role!.position > interaction.guild!.members.cache.get(interaction.client.user!.id)!.roles.highest.position) {
            interaction.reply("You can't create a team with a role higher than my highest role");
            return;
        }

        if (category?.channel?.type !== 4) {
            await interaction.reply("The category must be a category");
            return;
        }

        interaction.client.db.query(`SELECT * FROM teams WHERE guild = ${interaction.guild!.id}`, async (err: any, results: any) => {
            if (err) {
                console.error(err);
                interaction.reply("An error occured while creating the team");
                return;
            }

            if (results.length >= 5) {
                interaction.reply("You can't create more than 5 teams");
                return;
            }

            await results.forEach((team: any) => {
                if (desactivated !== true) {
                    if (team.name === name!.value) {
                        interaction.reply("A team with this name already exists");
                        desactivated = true;

                        return;
                    }

                    if (team.role === role!.role!.id) {
                        interaction.reply("A team with this role already exists");
                        desactivated = true;

                        return;
                    }

                    if (team.category === category!.channel!.id) {
                        interaction.reply("A team with this category already exists");
                        desactivated = true;

                        return;
                    }
                }
            });

            if (desactivated === true) return;

            interaction.client.db.query(`INSERT INTO teams (guild, name, role, category) VALUES (${interaction.guild!.id}, '${name!.value}', ${role!.role!.id}, ${category!.channel!.id})`, (err: any, _results: any) => {
                if (err) {
                    console.error(err);
                    interaction.reply("An error occured while creating the team");
                    return;
                }

                interaction.reply("Team created");
            });
        });
    }
}

export = new CreateTeam;