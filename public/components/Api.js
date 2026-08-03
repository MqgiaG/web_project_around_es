export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    // Verificación de respuesta
    async _checkResponse(res) {
        if (res.ok) {
            return (await res.json());
        }
        throw new Error(`Error: ${res.status}`);
    }
    // 1. Obtener información del usuario
    async getUserInfo() {
        try {
            const res = await fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers,
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en getUserInfo: ${err}`);
            throw err;
        }
    }
    // 2. Obtener tarjetas iniciales
    async getInitialCards() {
        try {
            const res = await fetch(`${this._baseUrl}/cards`, {
                headers: this._headers,
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en getInitialCards: ${err}`);
            throw err;
        }
    }
    // 3. Editar perfil de usuario (nombre y profesión)
    async setUserInfo({ name, about }) {
        try {
            const res = await fetch(`${this._baseUrl}/users/me`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({ name, about }),
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en setUserInfo: ${err}`);
            throw err;
        }
    }
    // 4. Agregar nueva tarjeta
    async addCard({ name, link }) {
        try {
            const res = await fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({ name, link }),
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en addCard: ${err}`);
            throw err;
        }
    }
    // 5. Eliminar tarjeta
    async deleteCard(cardId) {
        try {
            const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: this._headers,
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en deleteCard: ${err}`);
            throw err;
        }
    }
    // 6. Dar Like
    async likeCard(cardId) {
        try {
            const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this._headers,
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en likeCard: ${err}`);
            throw err;
        }
    }
    // 7. Quitar Like
    async unlikeCard(cardId) {
        try {
            const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this._headers,
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en unlikeCard: ${err}`);
            throw err;
        }
    }
    // 8. Actualizar foto de perfil (Avatar)
    async setUserAvatar({ avatar }) {
        try {
            const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({ avatar }),
            });
            return await this._checkResponse(res);
        }
        catch (err) {
            console.error(`Error en setUserAvatar: ${err}`);
            throw err;
        }
    }
}
