"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelectMenu {
    type;
    custom_id;
    options;
    placeholder;
    min_values;
    max_values;
    disabled;
    constructor(options) {
        this.type = 3;
        this.custom_id = options?.customId;
        this.options = options?.options ?? [];
        this.placeholder = options?.placeholder;
        this.min_values = options?.minValues ?? 1;
        this.max_values = options?.maxValues ?? 1;
        this.disabled = options?.disabled ?? false;
    }
}
exports.default = SelectMenu;
