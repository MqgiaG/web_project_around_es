import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  private _formElement: HTMLFormElement | null;
  private _submitButton: HTMLButtonElement | null;
  private _submitButtonText: string;
  private _handleConfirm: (() => void) | null;

  constructor(popupSelector: string) {
    super(popupSelector);
    this._formElement = this._popupElement?.querySelector(".popup__form") as HTMLFormElement;
    this._submitButton = this._formElement?.querySelector(".popup__button") as HTMLButtonElement;
    this._submitButtonText = this._submitButton?.textContent || "Sí";
    this._handleConfirm = null;
  }

  setConfirmAction(action: () => void): void {
    this._handleConfirm = action;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this._formElement?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }

  renderLoading(isLoading: boolean, loadingText: string = "Eliminando..."): void {
    if (this._submitButton) {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = this._submitButtonText;
      }
    }
  }
}