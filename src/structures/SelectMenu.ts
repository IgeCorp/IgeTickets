export default class SelectMenu {
    data: any;

    constructor(options: SelectMenuData) {
        this.data = this._transform(options);

        return this;
    }
    private _transform(options: SelectMenuData): any {
        return JSON.parse(JSON.stringify({
            'type': 3,
            'custom_id': options?.customId,
            'options': options?.options ?? [],
            'placeholder': options?.placeholder,
            'min_values': options?.minValues ?? 1,
            'max_values': options?.maxValues ?? 1,
            'disabled': options?.disabled ?? false
        }));
    }
}

interface SelectMenuData {
    type: number;
    customId: string;
    options: SelectMenuOption[];
    placeholder?: string;
    minValues?: number;
    maxValues?: number;
    disabled?: boolean;
}

interface SelectMenuOption {
    label: string;
    value: string;
    description?: string;
    emoji?: SelectMenuOptionEmoji;
    default?: boolean;
}

interface SelectMenuOptionEmoji {
    name: string;
    id: string;
    animated?: boolean;
}