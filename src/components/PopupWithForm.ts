import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  private _formElement: HTMLFormElement | null;
  private _inputList: NodeListOf<HTMLInputElement> | null;
  private _submitButton: HTMLButtonElement | null;
  private _submitButtonText: string;
  private _handleFormSubmit: (formData: Record<string, string>) => void;

  constructor(
    popupSelector: string,
    handleFormSubmit: (formData: Record<string, string>) => void
  ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement?.querySelector(".popup__form") as HTMLFormElement;
    this._inputList = this._formElement?.querySelectorAll(".popup__input");
    this._submitButton = this._formElement?.querySelector(".popup__button") as HTMLButtonElement;
    this._submitButtonText = this._submitButton?.textContent || "Guardar";
  }

  private _getInputValues(): Record<string, string> {
    const formValues: Record<string, string> = {};
    this._inputList?.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this._formElement?.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close(): void {
    super.close();
    this._formElement?.reset();
  }

  renderLoading(isLoading: boolean, loadingText: string = "Guardando..."): void {
    if (this._submitButton) {
      if (isLoading) {
        this._submitButton.textContent = loadingText;
      } else {
        this._submitButton.textContent = this._submitButtonText;
      }
    }
  }
}