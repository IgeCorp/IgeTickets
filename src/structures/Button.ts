export default class Button {
    data: any;

    constructor(options: ButtonData) {
        this.data = this._transform(options);

        return this;
    }

    private _transform(options: ButtonData): any {
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

interface ButtonData {
    style: any;
    label?: string;
    emoji?: ButtonEmoji;
    customId?: string;
    url?: string;
    disabled?: boolean;
}

interface ButtonEmoji {
    name: string;
    id: string;
    animated?: boolean;
}