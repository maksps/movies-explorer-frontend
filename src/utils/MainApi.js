class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json()
    }

    getMovies() {
        return fetch(`${this._url}movies`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'content-type': 'application/json'
            },
        })
            .then((res) => {
                return this._getResponseData(res);
            });
    }

    deleteMovie(id) {
        return fetch(`${this._url}${'movies/'}${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'content-type': 'application/json'
            },
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    addMovie(data) {
        return fetch(`${this._url}movies`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        });
    }


    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'content-type': 'application/json'
            },
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    editProfile(data) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        });
    }


    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}${'cards/'}${id}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'content-type': 'application/json'
            },
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    
}

const mainApi = new MainApi(
    {
        // url:'http://api.maksps.nomoredomains.rocks/'
        url: 'http://localhost:3000/',

        // url: 'https://mesto.nomoreparties.co/v1/cohort-50/',
        // headers: {
        //     authorization: '6df29fdd-ef30-40f2-9646-a62800cbaefa',
        //     'content-type': 'application/json',
        // },
    }
);

export default mainApi;

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VhYTQ3NDYxYzVmM2ZhOGFjYWViMjYiLCJpYXQiOjE2Nzc5NzAzNzIsImV4cCI6MTY3ODU3NTE3Mn0.8dEU_Zq2cV89A9DXBE_HlH6U9C41ee1BLteBWxbnz_M"