import { TextInputStyle } from "discord.js";
import TextInput from "./TextInput";

export default class Modal {
    data: any;
    
    constructor(options: ModalData) {
        this.data = this._transform(options);

        return this;
    }

    private _transform(options: ModalData): { title: string; custom_id: string; components: ModalComponents[]; } {
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

interface ModalData {
    title: string;
    customId: string;
    components: ModalComponents[];
}

interface ModalComponents {
    type: number;
    components: any[];
}

export const testModal = new Modal({
    title: 'Modal Title',
    customId: 'modal-id',
    components: [
        {
            type: 1,
            components: [
                new TextInput({
                    label: 'Text Input',
                    placeholder: 'Placeholder',
                    value: 'Value',
                    customId: 'text-input-id',
                    style: TextInputStyle.Paragraph,
                    required: true
                })
            ]
        }
    ]
});