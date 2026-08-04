import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement?.querySelector(".popup__image");
        this._captionElement = this._popupElement?.querySelector(".popup__caption");
    }
    open(data) {
        if (data && this._imageElement && this._captionElement) {
            this._imageElement.src = data.link;
            this._imageElement.alt = data.name;
            this._captionElement.textContent = data.name;
        }
        super.open();
    }
}
