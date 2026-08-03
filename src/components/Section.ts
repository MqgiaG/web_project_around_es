export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement | null;

  constructor(
    { items, renderer }: { items: T[]; renderer: (item: T) => void },
    containerSelector: string
  ) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items?: T[]): void {
    const itemsToRender = items || this._items;
    itemsToRender.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element: HTMLElement): void {
    this._container?.append(element);
  }

  prependItem(element: HTMLElement): void {
    this._container?.prepend(element);
  }
}