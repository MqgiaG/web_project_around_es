export interface UserInfoData {
  name: string;
  about: string;
  avatar?: string;
  _id?: string;
}

export class UserInfo {
  private _nameElement: HTMLElement | null;
  private _aboutElement: HTMLElement | null;
  private _avatarElement: HTMLImageElement | null;
  private _userId: string;

  constructor({
    nameSelector,
    aboutSelector,
    avatarSelector,
  }: {
    nameSelector: string;
    aboutSelector: string;
    avatarSelector: string;
  }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = "";
  }

  // Devuelve la información actual visible en la página
  getUserInfo() {
    return {
      name: this._nameElement?.textContent || "",
      about: this._aboutElement?.textContent || "",
    };
  }

  // Devuelve el ID del usuario autenticado
  getUserId() {
    return this._userId;
  }

  // Asigna el ID del usuario
  setUserId(id: string) {
    this._userId = id;
  }

  // Recibe la información del servidor y actualiza el DOM de forma segura
  setUserInfo({ name, about, avatar, _id }: UserInfoData) {
    if (name && this._nameElement) {
      this._nameElement.textContent = name;
    }
    if (about && this._aboutElement) {
      this._aboutElement.textContent = about;
    }
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
    if (_id) {
      this._userId = _id;
    }
  }
}