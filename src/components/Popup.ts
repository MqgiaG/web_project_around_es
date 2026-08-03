export class Popup {
  protected _popupElement: HTMLElement | null;
  private _handleEscClose: (evt: KeyboardEvent) => void;

  constructor(popupSelector: string) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscCloseImpl.bind(this);
  }

  open(): void {
    if (this._popupElement) {
      this._popupElement.classList.add("popup_is-opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  }

  close(): void {
    if (this._popupElement) {
      this._popupElement.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  private _handleEscCloseImpl(evt: KeyboardEvent): void {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(): void {
    this._popupElement?.addEventListener("mousedown", (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (
        target.classList.contains("popup_is-opened") ||
        target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}