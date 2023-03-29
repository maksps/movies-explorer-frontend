class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  getMovies() {
    return fetch(this._url)
      .then((res) => {
        if (!res.ok) {
          Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      });
  }
}

const movieApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

export default movieApi;
