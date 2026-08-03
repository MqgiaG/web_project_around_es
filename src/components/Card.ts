import { ICardData } from "../utils/types.js";

export class Card {
  private _name: string;
  private _link: string;
  private _id: string;
  private _isLiked: boolean;
  private _cardSelector: string;
  private _userId: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _handleDeleteClick: (cardId: string, cardElement: HTMLElement) => void;
  private _handleLikeClick: (cardId: string, isLiked: boolean) => void;

  private _element: HTMLElement | null = null;
  private _likeButton: HTMLButtonElement | null = null;

  constructor(
    data: ICardData,
    cardSelector: string,
    userId: string,
    handleCardClick: (name: string, link: string) => void,
    handleDeleteClick: (cardId: string, cardElement: HTMLElement) => void,
    handleLikeClick: (cardId: string, isLiked: boolean) => void
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked || false;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  private _getTemplate(): HTMLElement {
    const cardElement = (
      document.querySelector(this._cardSelector) as HTMLTemplateElement
    )?.content
      .querySelector(".card")
      ?.cloneNode(true) as HTMLElement;

    return cardElement;
  }

  public generateCard(): HTMLElement {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image") as HTMLImageElement;
    const cardTitle = this._element.querySelector(".card__title") as HTMLElement;

    this._likeButton = this._element.querySelector(".card__like-button") as HTMLButtonElement;

    if (cardImage) {
      cardImage.src = this._link;
      cardImage.alt = this._name;
    }

    if (cardTitle) {
      cardTitle.textContent = this._name;
    }

    this._renderLikes();
    this._setEventListeners();

    return this._element;
  }

  public setLikes(isLiked: boolean): void {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  private _renderLikes(): void {
    if (this._likeButton) {
      if (this._isLiked) {
        // Agregamos las variaciones de clases CSS activas más comunes para asegurar que cambie de color
        this._likeButton.classList.add("card__like-button_active");
        this._likeButton.classList.add("card__like-button_is-active");
      } else {
        this._likeButton.classList.remove("card__like-button_active");
        this._likeButton.classList.remove("card__like-button_is-active");
      }
    }
  }

  private _setEventListeners(): void {
    const cardImage = this._element?.querySelector(".card__image");
    const deleteButton = this._element?.querySelector(".card__delete-button");

    this._likeButton?.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

    deleteButton?.addEventListener("click", () => {
      if (this._element) {
        this._handleDeleteClick(this._id, this._element);
      }
    });

    cardImage?.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}