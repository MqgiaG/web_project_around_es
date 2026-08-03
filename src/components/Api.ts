import {
  IApiOptions,
  IUser,
  ICardData,
  IUserData,
  ICardFormData,
  IAvatarFormData,
} from "../utils/types";

export class Api {
  private _baseUrl: string;
  private _headers: IApiOptions["headers"];

  constructor(options: IApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Verificación de respuesta
  private async _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return (await res.json()) as T;
    }
    throw new Error(`Error: ${res.status}`);
  }

  // 1. Obtener información del usuario
  public async getUserInfo(): Promise<IUser> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
      return await this._checkResponse<IUser>(res);
    } catch (err) {
      console.error(`Error en getUserInfo: ${err}`);
      throw err;
    }
  }

  // 2. Obtener tarjetas iniciales
  public async getInitialCards(): Promise<ICardData[]> {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
      return await this._checkResponse<ICardData[]>(res);
    } catch (err) {
      console.error(`Error en getInitialCards: ${err}`);
      throw err;
    }
  }

  // 3. Editar perfil de usuario (nombre y profesión)
  public async setUserInfo({ name, about }: IUserData): Promise<IUser> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name, about }),
      });
      return await this._checkResponse<IUser>(res);
    } catch (err) {
      console.error(`Error en setUserInfo: ${err}`);
      throw err;
    }
  }

  // 4. Agregar nueva tarjeta
  public async addCard({ name, link }: ICardFormData): Promise<ICardData> {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link }),
      });
      return await this._checkResponse<ICardData>(res);
    } catch (err) {
      console.error(`Error en addCard: ${err}`);
      throw err;
    }
  }

  // 5. Eliminar tarjeta
  public async deleteCard(cardId: string): Promise<{ message: string }> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return await this._checkResponse<{ message: string }>(res);
    } catch (err) {
      console.error(`Error en deleteCard: ${err}`);
      throw err;
    }
  }

  // 6. Dar Like
  public async likeCard(cardId: string): Promise<ICardData> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
      return await this._checkResponse<ICardData>(res);
    } catch (err) {
      console.error(`Error en likeCard: ${err}`);
      throw err;
    }
  }

  // 7. Quitar Like
  public async unlikeCard(cardId: string): Promise<ICardData> {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
      return await this._checkResponse<ICardData>(res);
    } catch (err) {
      console.error(`Error en unlikeCard: ${err}`);
      throw err;
    }
  }

  // 8. Actualizar foto de perfil (Avatar)
  public async setUserAvatar({ avatar }: IAvatarFormData): Promise<IUser> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar }),
      });
      return await this._checkResponse<IUser>(res);
    } catch (err) {
      console.error(`Error en setUserAvatar: ${err}`);
      throw err;
    }
  }
}