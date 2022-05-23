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
                    name_localizations: option.name_localizations || {},
                    description: option.description,
                    description_localizations: option.description_localizations || {},
                    required: option.required
                });
            });
        }

        return JSON.parse(JSON.stringify({
            'type': ApplicationCommandType.ChatInput,
            'name': options.name,
            'name_localizations': options.name_localizations || {},
            'description': options.description,
            'description_localizations': options.description_localizations || {},
            'options': commandOptions,
            'guild_only': options.guildOnly !== true ? (process.argv[2] === '--dev' ? true : false) : true,
            'default_member_permissions': options.defaultMemberPermissions ?? '',
            'dm_permission': options.dmPermission ?? false,
            'default_permission': false
        }));
    }
}

interface CustomApplicationCommand {
    name: string;
    name_localizations?: NameLocalizations;
    description: string;
    description_localizations?: DescriptionLocalizations;
    defaultMemberPermissions?: string
    dmPermission?: string;
    options?: CustomApplicationCommandOptions[];
    guildOnly?: boolean;
}

interface CustomApplicationCommandOptions {
    type: any;
    name: string;
    name_localizations?: NameLocalizations;
    description: string;
    description_localizations?: DescriptionLocalizations;
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

interface NameLocalizations {    
    [key: string]: string;
}

interface DescriptionLocalizations {
    [key: string]: string;
}