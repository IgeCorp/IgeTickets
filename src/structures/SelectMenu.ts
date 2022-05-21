export default class SelectMenu {
    type: number;
    custom_id: string;
    options: SelectMenuOption[];
    placeholder: string | undefined;
    min_values: number;
    max_values: number;
    disabled: boolean;

    constructor(options: SelectMenuData) {
        this.type = 3;
        this.custom_id = options?.customId;
        this.options = options?.options ?? [];
        this.placeholder = options?.placeholder;
        this.min_values = options?.minValues ?? 1;
        this.max_values = options?.maxValues ?? 1;
        this.disabled = options?.disabled ?? false;
    }
}

interface SelectMenuData {
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