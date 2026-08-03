export class Card {
    constructor(data, cardSelector, userId, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._element = null;
        this._likeButton = null;
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
        this._likeButton = this._element.querySelector(".card__like-button");
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
    setLikes(isLiked) {
        this._isLiked = isLiked;
        this._renderLikes();
    }
    _renderLikes() {
        if (this._likeButton) {
            if (this._isLiked) {
                // Agregamos las variaciones de clases CSS activas más comunes para asegurar que cambie de color
                this._likeButton.classList.add("card__like-button_active");
                this._likeButton.classList.add("card__like-button_is-active");
            }
            else {
                this._likeButton.classList.remove("card__like-button_active");
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
