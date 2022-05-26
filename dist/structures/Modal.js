"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Modal {
    data;
    constructor(options) {
        this.data = this._transform(options);
        return this;
    }
    _transform(options) {
        let componentsRows = [];
        for (const components of options.components) {
            componentsRows.push(components);
        }
        return {
            'title': options.title,
            'custom_id': options.customId,
            'components': componentsRows ?? []
        };
    }
}
exports.default = Modal;
