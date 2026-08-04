import { ICardData } from "../utils/types.js";

export class Card {
  private _name: string;
  private _link: string;
  private _id: string;
  private _isLiked: boolean;
  private _ownerId?: string; // Guardamos el ID del creador de la tarjeta
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
    
    // Si owner viene como objeto o string según la respuesta de la API:
    this._ownerId = typeof data.owner === "object" ? data.owner?._id : data.owner;
    
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
    const deleteButton = this._element.querySelector(".card__delete-button") as HTMLButtonElement | null;

    this._likeButton = this._element.querySelector(".card__like-button") as HTMLButtonElement;

    if (cardImage) {
      cardImage.src = this._link;
      cardImage.alt = this._name;
    }

    if (cardTitle) {
      cardTitle.textContent = this._name;
    }

    // 🛠️ 1. Ocultar el botón de borrar si la tarjeta no fue creada por el usuario actual
    if (this._ownerId && this._ownerId !== this._userId && deleteButton) {
      deleteButton.remove();
    }

    this._renderLikes();
    this._setEventListeners();

    return this._element;
  }

  public setLikes(isLiked: boolean): void {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  // 🛠️ 2. Dejar solo la clase activa correcta sin duplicar reglas sin efecto
  private _renderLikes(): void {
    if (this._likeButton) {
      if (this._isLiked) {
        this._likeButton.classList.add("card__like-button_is-active");
      } else {
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