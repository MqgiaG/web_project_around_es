import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { validationConfig } from "./utils/constants.js";
import { ICardData } from "./utils/types.js";

// 1. Instancia de API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "e3614bdc-394c-45e2-9011-90e8d44c909b",
    "Content-Type": "application/json",
  },
});

// 2. Información del Usuario
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// 3. Modales base
const imagePopup = new PopupWithImage("#popup-image");
imagePopup.setEventListeners();

const popupConfirmation = new PopupWithConfirmation("#popup-delete");
popupConfirmation.setEventListeners();

let cardSection: Section<ICardData>;

// 4. Función Creadora de Tarjetas
const createCard = (data: ICardData) => {
  const userId = userInfo.getUserId();

  const card = new Card(
    data,
    "#card-template",
    userId,
    // Ver Imagen (Línea 46 corregida: pasa un objeto { name, link })
    (name, link) => imagePopup.open({ name, link }),
    // Borrar Tarjeta
    (cardId, cardElement) => {
      popupConfirmation.setConfirmAction(async () => {
        popupConfirmation.renderLoading(true, "Eliminando...");
        try {
          await api.deleteCard(cardId);
          cardElement.remove();
          popupConfirmation.close();
        } catch (err) {
          console.error(`Error al eliminar tarjeta: ${err}`);
        } finally {
          popupConfirmation.renderLoading(false);
        }
      });
      popupConfirmation.open();
    },
    // Dar / Quitar Like
    async (cardId, isLiked) => {
      try {
        const updatedCard = isLiked
          ? await api.unlikeCard(cardId)
          : await api.likeCard(cardId);
        
        const newIsLiked = updatedCard.isLiked !== undefined ? updatedCard.isLiked : !isLiked;
        card.setLikes(newIsLiked);
      } catch (err) {
        console.error(`Error al cambiar me gusta: ${err}`);
      }
    }
  );

  return card.generateCard();
};

// 5. Modal Editar Perfil
const editProfilePopup = new PopupWithForm(
  "#popup-edit-profile",
  async (formData) => {
    editProfilePopup.renderLoading(true, "Guardando...");
    try {
      const updatedUser = await api.setUserInfo({
        name: formData.name,
        about: formData.about,
      });
      userInfo.setUserInfo(updatedUser);
      editProfilePopup.close();
    } catch (err) {
      console.error(`Error al editar perfil: ${err}`);
    } finally {
      editProfilePopup.renderLoading(false);
    }
  }
);
editProfilePopup.setEventListeners();

// 6. Modal Nueva Tarjeta
const newCardPopup = new PopupWithForm(
  "#popup-add-card",
  async (formData) => {
    newCardPopup.renderLoading(true, "Guardando...");
    try {
      const newCardData = await api.addCard({
        name: formData.title,
        link: formData.link,
      });
      const newCardElement = createCard(newCardData);
      cardSection.prependItem(newCardElement);
      newCardPopup.close();
    } catch (err) {
      console.error(`Error al agregar tarjeta: ${err}`);
    } finally {
      newCardPopup.renderLoading(false);
    }
  }
);
newCardPopup.setEventListeners();

// 7. Modal Editar Avatar
const editAvatarPopup = new PopupWithForm(
  "#popup-edit-avatar",
  async (formData) => {
    editAvatarPopup.renderLoading(true, "Guardando...");
    try {
      const updatedUser = await api.setUserAvatar({
        avatar: formData.avatar,
      });
      userInfo.setUserInfo(updatedUser);
      editAvatarPopup.close();
    } catch (err) {
      console.error(`Error al actualizar avatar: ${err}`);
    } finally {
      editAvatarPopup.renderLoading(false);
    }
  }
);
editAvatarPopup.setEventListeners();

// 8. Botones y Escuchadores del DOM
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarContainer = document.querySelector(".profile__avatar-container");

const nameInput = document.querySelector("#input-name") as HTMLInputElement;
const descriptionInput = document.querySelector("#input-about") as HTMLInputElement;

profileEditButton?.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  if (nameInput && descriptionInput) {
    nameInput.value = currentUserData.name;
    descriptionInput.value = currentUserData.about;
  }
  formValidators["edit-profile-form"]?.resetValidation();
  editProfilePopup.open();
});

addButton?.addEventListener("click", () => {
  formValidators["add-card-form"]?.resetValidation();
  newCardPopup.open();
});

avatarContainer?.addEventListener("click", () => {
  formValidators["edit-avatar-form"]?.resetValidation();
  editAvatarPopup.open();
});

// 9. Validadores de Formulario
const formValidators: Record<string, FormValidator> = {};

const enableValidation = (config: typeof validationConfig) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement as HTMLFormElement);
    const formName = formElement.getAttribute("name") || formElement.id;
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// 10. Carga inicial asíncrona
async function loadInitialData() {
  try {
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    userInfo.setUserInfo(userData);

    cardSection = new Section(
      {
        items: initialCards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          cardSection.addItem(cardElement);
        },
      },
      ".cards__list"
    );

    cardSection.renderItems(initialCards);
  } catch (err) {
    console.error(`Error en la carga inicial: ${err}`);
  }
}

loadInitialData();