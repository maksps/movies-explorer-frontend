import React, { useState, useEffect, useCallback } from "react";
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import SearchForm from '../SearchForm/SearchForm.js';
import btnImagechecked from '../../images/icon-movie-checked.svg';
import btnImage from '../../images/icon-movie.svg';
import movieApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
const imgUrl = 'https://api.nomoreparties.co/';






function Movies({ preloaderVisible }) {
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [filteredMovie, setFilteredMovie] = useState([]);
    const [isCheckShotMovie, setCheckShotMovie] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [numberCards, setNumberCards] = useState(0);
    const [numberAddCards, setNumberAddCards] = useState(0);
    const [screenWidth, setscreenWidth] = useState(window.innerWidth);
    const [showedMoviesList, setShowedMoviesList] = useState([]);
    
    
    function getSavedMovies() {
        mainApi.getMovies().then(savedMovies => {
            setSavedMovies(savedMovies);
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        // setNumberCards(0);
        setscreenWidth(window.innerWidth);
        getSavedMovies();
        if (localStorage.getItem('filteredMovie')) {
            setFilteredMovie(JSON.parse(localStorage.getItem('filteredMovie')));
        };
        if (localStorage.getItem('movies')) {
            setMovies(JSON.parse(localStorage.getItem('movies')));
        };
        if (localStorage.getItem('savedMovies')) {
            setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
        };
    }, []);

    useEffect(() => {
        setNumberCards(numberCards + numberAddCards);
    }, [filteredMovie])




    useEffect(() => {
        const handleResize = (event) => {
            setscreenWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        defineNumberAddCards();
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [screenWidth]);

    const handleClickAddCards = () => {
        setNumberCards(numberCards + numberAddCards);
    };

    useEffect(() => {

        setShowedMoviesList(filteredMovie.slice(0, numberCards));
        defineNumberAddCards();
    }, [numberCards])



    const defineNumberAddCards = () => {
        if (numberCards === 0) {
            if (screenWidth > 769) {
                return setNumberAddCards(12);
            }
            if (screenWidth <= 769 && screenWidth > 560) {
                return setNumberAddCards(8);
            }
            else {
                return setNumberAddCards(5);
            }
        }
        else {
            if (screenWidth > 769) {
                return setNumberAddCards(3);
            }
            if (screenWidth <= 769 && screenWidth > 560) {
                return setNumberAddCards(2);
            }
            else
                return setNumberAddCards(2);
        }
    }


    function checkempty(form) {
        if (form == null ||
            // /^\s*$/.test(form) ||
            form.length === 0) {
            setInfoMessage('Нужно ввести ключевое слово')
            return true;
        } else {
            return false;
        }
    }

    function filter(searchKey, data) {
        let resultFilter = [];
        if (isCheckShotMovie) {
            const shortMovies = data.filter(item => item.duration <= 40);
            resultFilter = shortMovies.filter(item => item.nameRU.toLowerCase().includes(searchKey.toLowerCase()));
        } else {
            resultFilter = data.filter(item => item.nameRU.toLowerCase().includes(searchKey.toLowerCase()));
        }
        if (resultFilter.length === 0) { setInfoMessage('Ничего не найдено') }
        else { setInfoMessage('') }
        return resultFilter
    }




    const handleSearch = (searchKey) => {
        setNumberCards(0);
        if (!checkempty(searchKey)) {
            if (movies.length === 0) {
                preloaderVisible(true);
                movieApi.getMovies().then(res => {
                    localStorage.setItem('movies', JSON.stringify(res));
                    setMovies(res);
                    setFilteredMovie(filter(searchKey, res));
                    localStorage.setItem('filteredMovie', JSON.stringify(filter(searchKey, res)));
                }).catch((err) => {
                    console.log(err);
                    setInfoMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                }).finally(() => {
                    preloaderVisible(false);
                });
            } else {
                setFilteredMovie(filter(searchKey, movies));
                localStorage.setItem('filteredMovie', JSON.stringify(filter(searchKey, movies)));
            }
        }
    };



    function handleClickBtn(data, isChecked) {
        if (!isChecked) {
            const movie = { country: data.country, director: data.director, duration: data.duration, year: data.year, description: data.description, image: `${imgUrl}${data.image.url}`, trailerLink: data.trailerLink, thumbnail: `${imgUrl}${data.image.formats.thumbnail.url}`, movieId: data.id, nameRU: data.nameRU, nameEN: data.nameEN, };

            mainApi.addMovie(movie).then((res) => {
                getSavedMovies();
            }).catch((err) => console.log(err))
        }
        else {
            mainApi.deleteMovie(data).then(() => {
                console.log("Фильм удален");
                getSavedMovies();
                setSavedMovies((state) => state.filter((c) => c._id !== data));
            }).catch((err) => console.log(err))
        }

    };




    return (
        <div className="movies">
            <SearchForm
                onSubmit={handleSearch}
                onCheckboxCheked={setCheckShotMovie}

            />

            <MoviesCardList
                movies={showedMoviesList}
                btnImagechecked={btnImagechecked}
                btnImage={btnImage}
                onClickBtn={handleClickBtn}
                isSavedMovies={false}
                savedMovies={savedMovies}
                infoMessage={infoMessage}
            />
            <button onClick={handleClickAddCards} className={((numberCards + 1) <= filteredMovie.length) ? "movies__btn-more " : "movies__btn-more movies__btn-more_unvisible"}>Ещё</button>

        </div>
    )

}

export default Movies;