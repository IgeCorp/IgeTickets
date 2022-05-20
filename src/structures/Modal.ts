export default class Modal {
    data: any;
    
    constructor(options: ModalData) {
        this.data = this._transform(options);

        return this;
    }
    private _transform(options: ModalData) {
        const componentsRows = [];

        for (const components of options.components) {
            componentsRows.push(components);
        }

        return JSON.parse(JSON.stringify({
            'title': options.title,
            'custom_id': options.customId,
            'components': componentsRows
        }));
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