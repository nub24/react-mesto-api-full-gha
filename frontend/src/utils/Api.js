import { address, token } from "./constants";

class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
    this._headers = {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  //обработка запроса
  _request(url, options) {
    const fetchAddress = `${this._address}/${url}`

    return fetch(fetchAddress, options).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
  }

  //получение информации о пользователе с сервера
  getUserInfo() {
    return this._request(`users/me`, {
      headers: this._headers,
    })
  }

  //получение карточек
  getCards() {
    return this._request(`cards`, {
      headers: this._headers,
    })
  }

  //передача карточки на сервер
  postCard({ name, link }) {
    return this._request(`cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
  }

  //простановка лайка
  _putLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
  }

  //удоление лайка
  _delLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  //установка/снятие лайка
  toggleLike(cardId, isLiked) {
    return isLiked ? this._delLike(cardId) : this._putLike(cardId);
  }

  //удаление карточки
  delCard(id) {
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  //передача информации о пользователе на сервер
  patchProfile({ name, about }) {
    return this._request(`users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
  }

  //передача аватарки на сервер
  patchAvatar(avatar) {
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
      headers: this._headers,
    })
  }
}

export const api = new Api({ address, token });
