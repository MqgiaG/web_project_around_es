import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  private _imageElement: HTMLImageElement | null;
  private _captionElement: HTMLElement | null;

  constructor(popupSelector: string) {
    super(popupSelector);
    this._imageElement = this._popupElement?.querySelector(".popup__image") as HTMLImageElement | null;
    this._captionElement = this._popupElement?.querySelector(".popup__caption") as HTMLElement | null;
  }

  open(name: string, link: string): void {
    if (this._imageElement && this._captionElement) {
      this._imageElement.src = link;
      this._imageElement.alt = name;
      this._captionElement.textContent = name;
    }
    super.open();
  }
}