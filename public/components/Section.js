export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems(items) {
        const itemsToRender = items || this._items;
        itemsToRender.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container?.append(element);
    }
    prependItem(element) {
        this._container?.prepend(element);
    }
}
