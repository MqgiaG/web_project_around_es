import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popupElement?.querySelector(".popup__form");
        this._submitButton = this._formElement?.querySelector(".popup__button");
        this._submitButtonText = this._submitButton?.textContent || "Sí";
        this._handleConfirm = null;
    }
    setConfirmAction(action) {
        this._handleConfirm = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement?.addEventListener("submit", (evt) => {
            evt.preventDefault();
            if (this._handleConfirm) {
                this._handleConfirm();
            }
        });
    }
    renderLoading(isLoading, loadingText = "Eliminando...") {
        if (this._submitButton) {
            if (isLoading) {
                this._submitButton.textContent = loadingText;
            }
            else {
                this._submitButton.textContent = this._submitButtonText;
            }
        }
    }
}
