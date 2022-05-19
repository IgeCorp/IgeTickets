import { ApplicationCommandOptionType, ApplicationCommandType, PermissionResolvable } from 'discord.js';

export default class Command {
    data: { type: ApplicationCommandType; name: string; description: string; options: void[] | null; guild_only: boolean; };
    
    constructor(options: CustomApplicationCommand) {
        this.data = this._transform(options);

        return this;
    }

    private _transform(options: CustomApplicationCommand) {
        return {
            'type': ApplicationCommandType.ChatInput,
            'name': options.name,
            'description': options.description,

            'options': options.options === undefined ? null : [
                options.options?.forEach((option: CustomApplicationCommandOptions) => {
                    return {
                        'type': option.type,
                        'name': option.name,
                        'description': option.description,
                        'required': option.required,
                        'choices': option.choices === undefined ? null : [
                            option.choices.forEach((choice: CustomApplicationCommandOptionsChoices) => {
                                return {
                                    'name': choice.name,
                                    'value': choice.value
                                };
                            })
                        ],
                        'min_value': option?.min_value,
                        'max_value': option?.max_value,
                        'autocomplete': option?.autocomplete
                    };
                })
            ],
            'guild_only': options.guildOnly !== true ? (process.argv[2] === '--dev' ? true : false) : true
        }
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