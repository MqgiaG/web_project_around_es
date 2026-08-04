export class Card {
    constructor(data, cardSelector, userId, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._element = null;
        this._likeButton = null;
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
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)?.content
            .querySelector(".card")
            ?.cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector(".card__image");
        const cardTitle = this._element.querySelector(".card__title");
        const deleteButton = this._element.querySelector(".card__delete-button");
        this._likeButton = this._element.querySelector(".card__like-button");
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
    setLikes(isLiked) {
        this._isLiked = isLiked;
        this._renderLikes();
    }
    // 🛠️ 2. Dejar solo la clase activa correcta sin duplicar reglas sin efecto
    _renderLikes() {
        if (this._likeButton) {
            if (this._isLiked) {
                this._likeButton.classList.add("card__like-button_is-active");
            }
            else {
                this._likeButton.classList.remove("card__like-button_is-active");
            }
        }
    }
    _setEventListeners() {
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
