export default class TextInput {
    data: any;

    constructor(options: TextInputData) {
        this.data = this._transform(options);

        return this;
    }
    private _transform(options: TextInputData): any {
        return JSON.parse(JSON.stringify({
            'type': 4,
            'custom_id': options.customId,
            'style': options.style,
            'label': options.label,
            'min_length': options?.minLength,
            'max_length': options?.maxLength,
            'required': options?.required ?? false,
            'value': options?.value,
            'placeholder': options?.placeholder
        }));
    }
}

interface TextInputData {
    customId: string;
    style: any;
    label: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
}