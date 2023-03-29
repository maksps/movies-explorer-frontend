/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => this._getResponseData(res));
  }

  deleteMovie(id) {
    return fetch(`${this._url}${'movies/'}${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }

  addMovie(data) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }

  editProfile(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}${'cards/'}${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }
}

const mainApi = new MainApi(
  {
    url: 'https://api.maksps.nomoredomains.work/',
    // url: 'http://localhost:3000/',
  },
);

export default mainApi;
