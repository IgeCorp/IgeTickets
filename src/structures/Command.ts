import { ApplicationCommandType } from 'discord.js';

export default class Command {
    data: any;
    
    constructor(options: CustomApplicationCommand) {
        this.data = this._transform(options);

        return this;
    }

    private _transform(options: CustomApplicationCommand): any {
        let commandOptions: CustomApplicationCommandOptions[] = [];

        if (options.options) {
            options.options.forEach((option: CustomApplicationCommandOptions) => {
                commandOptions.push({
                    type: option.type,
                    name: option.name,
                    name_localization: option.name_localization ?? {},
                    description: option.description,
                    description_localization: option.description_localization ?? {},
                    required: option.required
                });
            });
        }

        return JSON.parse(JSON.stringify({
            'type': ApplicationCommandType.ChatInput,
            'name': options.name,
            'name_localization': options.name_localization ?? {},
            'description': options.description,
            'description_localization': options.description_localization ?? {},
            'options': commandOptions,
            'guild_only': options.guildOnly !== true ? (process.argv[2] === '--dev' ? true : false) : true,
            'default_member_permissions': options.defaultMemberPermissions ?? '',
            'dm_permission': options.dmPermission ?? false,
        }));
    }
}

interface CustomApplicationCommand {
    name: string;
    name_localization?: NameLocalization;
    description: string;
    description_localization?: DescriptionLocalization;
    defaultMemberPermissions?: string
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