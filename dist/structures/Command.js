"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Command {
    data;
    constructor(options) {
        this.data = this._transform(options);
        return this;
    }
    _transform(options) {
        let commandOptions = [];
        if (options.options) {
            options.options.forEach((option) => {
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
            'type': discord_js_1.ApplicationCommandType.ChatInput,
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
exports.default = Command;
