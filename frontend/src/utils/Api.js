import { address } from "./constants";

class Api {
  constructor({ address }) {
    this._address = address;
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
    const token = localStorage.getItem('token');
    return this._request(`users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //получение карточек
  getCards() {
    const token = localStorage.getItem('token')
    return this._request(`cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //передача карточки на сервер
  postCard({ name, link }) {
    const token = localStorage.getItem('token')
    return this._request(`cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
  }

  //простановка лайка
  _putLike(id) {
    const token = localStorage.getItem('token')
    return this._request(`cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //удоление лайка
  _delLike(id) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //установка/снятие лайка
  toggleLike(cardId, isLiked) {
    return isLiked ? this._delLike(cardId) : this._putLike(cardId);
  }

  //удаление карточки
  delCard(id) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //передача информации о пользователе на сервер
  patchProfile({ name, about }) {
    const token = localStorage.getItem('token');
    return this._request(`users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    })
  }

  //передача аватарки на сервер
  patchAvatar(avatar) {
    const token = localStorage.getItem('token');
    return this._request(`users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }
}

export const api = new Api({ address });
