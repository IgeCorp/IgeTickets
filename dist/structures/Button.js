"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Button {
    data;
    constructor(options) {
        this.data = this._transform(options);
        return this;
    }
    _transform(options) {
        return JSON.parse(JSON.stringify({
            'type': 2,
            'style': options.style,
            'label': options?.label,
            'emoji': options?.emoji,
            'custom_id': options?.customId,
            'url': options?.url,
            'disabled': options?.disabled ?? false,
        }));
    }
}
exports.default = Button;
