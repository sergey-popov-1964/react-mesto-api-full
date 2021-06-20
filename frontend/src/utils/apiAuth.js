class ApiAuth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  authorization({email, password}) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(this.handleResponse);

  }

  registration({email, password}) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(this.handleResponse);
  }

  checkToken(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`
      },
    })
      .then(this.handleResponse);
  }

}

const baseUrl = 'https://back.sergeykms.students.nomoredomains.club';
const apiAuth = new ApiAuth(baseUrl);
export default apiAuth;
