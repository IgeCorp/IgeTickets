import { ApplicationCommandOptionType, ApplicationCommandType, PermissionResolvable } from 'discord.js';

export default class Command {
    data: any;
    
    constructor(options: CustomApplicationCommand) {
        this.data = this._transform(options);

        return this;
    }

    private _transform(options: CustomApplicationCommand): any {
        const commandOptions: any[] = [];

        if (options.options) {
            options.options.forEach((option: CustomApplicationCommandOptions) => {
                commandOptions.push({
                    type: option.type,
                    name: option.name,
                    description: option.description,
                    required: option.required
                });
            });
        }

        return JSON.parse(JSON.stringify({
            'type': ApplicationCommandType.ChatInput,
            'name': options.name,
            'description': options.description,

            'options': commandOptions,
            'guild_only': options.guildOnly !== true ? (process.argv[2] === '--dev' ? true : false) : true
        }));
    }
}

interface CustomApplicationCommand {
    name: string;
    name_localization?: NameLocalization;
    description: string;
    description_localization?: DescriptionLocalization;
    defaultMemberPermission?: PermissionResolvable;
    dmPermission?: string;
    options?: CustomApplicationCommandOptions[];
    guildOnly?: boolean;
}

interface CustomApplicationCommandOptions {
    type: any;
    name: string;
    name_localization?: NameLocalization;
    description: string;
    description_localization?: DescriptionLocalization;
    required: boolean;
    choices?: CustomApplicationCommandOptionsChoices[];
    options?: CustomApplicationCommandOptions[];
    min_value?: number;
    max_value?: number;
    autocomplete?: boolean
}

interface CustomApplicationCommandOptionsChoices {
    name: string;
    value: string | number;
}

interface NameLocalization {    
    [key: string]: string;
}

interface DescriptionLocalization {
    [key: string]: string;
}