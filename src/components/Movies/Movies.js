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
    const [savedMovies, setSavedMovies] = useState([])
    const [isCheckShotMovie, setCheckShotMovie] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [numberCards, setNumberCards] = useState(0);
    const [numberAddCards, setNumberAddCards] = useState(0);
    const [screenWidth, setscreenWidth] = useState(0);
    const [showedMoviesList, setShowedMoviesList] = useState([]);

    useEffect(() => {
        setscreenWidth(window.innerWidth);
        getSavedMovies(); 
    }, []);

    useEffect(() => {
        setNumberCards(numberCards+numberAddCards);
    }, [movies])




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
        setShowedMoviesList(movies.slice(0, numberCards));
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
            alert("Поле не может быть пустым");
            return true;
        } else {
            return false;
        }
    }

    const handleSearch = (data) => {

        setNumberCards(0);
       
        if (!checkempty(data)) {
            preloaderVisible(true);
            movieApi.getMovies().then(movies => {
                

                if (isCheckShotMovie) {
                    const shortMovies = movies.filter(item => item.duration <= 40);
                    const resultFilter = shortMovies.filter(item => item.nameRU.toLowerCase().includes(data.toLowerCase()));
                    if (resultFilter.length === 0) {
                        setInfoMessage('Ничего не найдено')
                    }
                    else { setInfoMessage('') }
                    setMovies(resultFilter);
                    return
                }
                const resultFilter = movies.filter(item => item.nameRU.toLowerCase().includes(data.toLowerCase()));
              
                if (resultFilter.length === 0) { setInfoMessage('Ничего не найдено') }
                else { setInfoMessage('') }
                setMovies(resultFilter);
                


            }).catch((err) => {
                console.log(err);
                setInfoMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            }).finally(() => {
                preloaderVisible(false);
            })
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
                setSavedMovies((state) => state.filter((c) => c._id !== data));
            }).catch((err) => console.log(err))
        }

    };

    function getSavedMovies() {
        mainApi.getMovies().then(savedMovies => {
            setSavedMovies(savedMovies);
        }).catch((err) => console.log(err))
    }


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
            <button onClick={handleClickAddCards} className={((numberCards+1) <= movies.length)? "movies__btn-more " : "movies__btn-more movies__btn-more_unvisible"  }>Ещё</button>

        </div>
    )

}

export default Movies;