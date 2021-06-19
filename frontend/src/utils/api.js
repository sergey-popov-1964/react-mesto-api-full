class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    // this.baseHeaders = baseHeaders;
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
      // headers: this.baseHeaders,
    })
      .then(this.handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      // headers: this.baseHeaders,
    })
      .then(this.handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      // headers: this.baseHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      // headers: this.baseHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      // headers: this.baseHeaders,
      body: JSON.stringify(data)
    })
      .then(this.handleResponse);
  }

  deleteCards(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      // headers: this.baseHeaders,
    })
      .then(this.handleResponse);
  }

  changeLikeCardStatus(id, isLike) {
    if (isLike) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        // headers: this.baseHeaders,
      })
        .then(this.handleResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        // headers: this.baseHeaders,
      })
        .then(this.handleResponse);
    }
  }

}

const baseHeaders = {authorization: 'be1a7eff-1608-42e4-ab79-a96e12a8c4b6', 'Content-Type': 'application/json'};
const baseUrl = 'http://localhost:3000';
const api = new Api(baseUrl);

export default api;
