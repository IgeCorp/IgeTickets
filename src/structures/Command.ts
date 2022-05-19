import { ApplicationCommandOptionType, ApplicationCommandType, PermissionResolvable } from 'discord.js';

export default class Command {
    constructor(options: CustomApplicationCommand) {
        this._transform(options);
    }

    private _transform(options: CustomApplicationCommand): string {
        const newOptions = {
            'type': options.type,
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
            'guild_only': options.guildOnly === true ? (process.argv[2] === '--dev' ? false: true) : false
        }

        return JSON.stringify(newOptions);
    }
}

interface CustomApplicationCommand {
    type: ApplicationCommandType.ChatInput;
    name: string;
    description: string;
    defaultMemberPermission?: PermissionResolvable;
    dmPermission?: string;
    options?: CustomApplicationCommandOptions[];
    guildOnly: boolean;
}

interface CustomApplicationCommandOptions {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required: boolean;
    choices?: CustomApplicationCommandOptionsChoices[];
    options: CustomApplicationCommandOptions[];
    min_value?: number;
    max_value?: number;
    autocomplete?: boolean
}

interface CustomApplicationCommandOptionsChoices {
    name: string;
    value: string | number;
}