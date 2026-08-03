// --- Datos para solicitudes / Formularios ---
export interface IUserData {
  name: string;
  about: string;
}

export interface IAvatarFormData {
  avatar: string;
}

export interface ICardFormData {
  name: string;
  link: string;
}

// --- Respuestas de la API y modelos principales ---
export interface IUser {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

export interface ILike {
  _id: string;
}

export interface ICardData {
  _id: string;
  name: string;
  link: string;
  owner: string | IUser; // Acepta el ID en string que da esta API o el objeto completo
  createdAt?: string;
  isLiked: boolean; // Booleano directo de la respuesta del servidor
  likes?: ILike[];
}

// --- Configuración de formularios y API ---
export interface IFormConfig {
  formSelector: string;
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass?: string;
}

export interface IApiOptions {
  baseUrl: string;
  headers: {
    authorization: string;
    "Content-Type": string;
  };
}