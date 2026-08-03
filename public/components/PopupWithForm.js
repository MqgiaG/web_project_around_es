import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popupElement?.querySelector(".popup__form");
        this._inputList = this._formElement?.querySelectorAll(".popup__input");
        this._submitButton = this._formElement?.querySelector(".popup__button");
        this._submitButtonText = this._submitButton?.textContent || "Guardar";
    }
    _getInputValues() {
        const formValues = {};
        this._inputList?.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement?.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._formElement?.reset();
    }
    renderLoading(isLoading, loadingText = "Guardando...") {
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
