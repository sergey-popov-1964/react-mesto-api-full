class Api {
  constructor(baseUrl, dataAuth) {
    this._baseUrl = baseUrl;
    this.dataAuth = dataAuth;
  }

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.dataAuth}`
      },
    })
      .then(this.handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.dataAuth}`
      },
    })
      .then(this.handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.dataAuth}`
      },
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.dataAuth}`
      },
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.dataAuth}`
      },
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

  deleteCards(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.dataAuth}`
      },
    })
      .then(this.handleResponse);
  }

  changeLikeCardStatus(id, isLike) {
    if (isLike) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.dataAuth}`
        },
      })
        .then(this.handleResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.dataAuth}`
        },
      })
        .then(this.handleResponse);
    }
  }

}

const dataAuth = localStorage.getItem('token');
const baseUrl = 'http://back.sergeykms.students.nomoredomains.club';
const api = new Api(baseUrl, dataAuth);
export default api;
