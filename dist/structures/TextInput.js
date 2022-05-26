"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextInput {
    type;
    custom_id;
    style;
    label;
    min_length;
    max_length;
    required;
    value;
    placeholder;
    constructor(options) {
        this.type = 4;
        this.custom_id = options.customId;
        this.style = options.style;
        this.label = options.label;
        this.min_length = options?.minLength;
        this.max_length = options?.maxLength;
        this.required = options?.required ?? false;
        this.value = options?.value;
        this.placeholder = options?.placeholder;
    }
}
exports.default = TextInput;
