export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscCloseImpl.bind(this);
    }
    open() {
        if (this._popupElement) {
            this._popupElement.classList.add("popup_is-opened");
            document.addEventListener("keydown", this._handleEscClose);
        }
    }
    close() {
        if (this._popupElement) {
            this._popupElement.classList.remove("popup_is-opened");
            document.removeEventListener("keydown", this._handleEscClose);
        }
    }
    _handleEscCloseImpl(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        this._popupElement?.addEventListener("mousedown", (evt) => {
            const target = evt.target;
            if (target.classList.contains("popup_is-opened") ||
                target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}
