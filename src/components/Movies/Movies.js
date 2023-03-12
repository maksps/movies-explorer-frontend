import React, { useState, useEffect, useCallback } from "react";
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import SearchForm from '../SearchForm/SearchForm.js';
import btnImagechecked from '../../images/icon-movie-checked.svg';
import btnImage from '../../images/icon-movie.svg';
import movieApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
const imgUrl = 'https://api.nomoreparties.co/'





function Movies({preloaderVisible}) {

    // const allMoviesBase = useCallback(async () => {
    //     try {
    //         const movies = await movieApi.getMovies();
    //         if (movies === null) {
    //             return console.log("ошибка");
    //         }

    //         return setMovies(movies);
    //     } catch (e) {
    //         return console.log(e);
    //     }
    // }, []);
    // console.log(movies)
    // allMoviesBase();

    // const  getMoviesArr = async () => {
    //     const movies = await movieApi.getMovies();
    //     return movies
    // }

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([])
    const [isCheckShotMovie, setCheckShotMovie] = useState(false);
    
    const [numberCards, setNumberCards] = useState(0);
    const [screenWidth, setscreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // movieApi.getMovies().then(data => {
        //     setMovies(data)
        // });
        setscreenWidth(window.innerWidth);
        setNumberCards(defineNumberCards());
        getSavedMovies();
    }, []);


    useEffect(() => {
        const handleResize = (event) => {
            setscreenWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [screenWidth]);



    const handleClickAddCards = () => {
        setNumberCards(numberCards + defineNumberCards())

    };

    const defineNumberCards = () => {
        if (numberCards === 0) {
            if (screenWidth > 769) {
                return 12;
            }
            if (screenWidth <= 769 && screenWidth > 560) {
                return 8;
            }
            else {
                return 2;
            }
        }
        else {
            if (screenWidth > 769) {
                return 3;
            }
            if (screenWidth <= 769 && screenWidth > 560) {
                return 2;
            }
            else
                return 2;
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

    function handleSearch(data) {
        if (!checkempty(data)) {
            preloaderVisible(true);
            movieApi.getMovies().then(movies => {
                if (isCheckShotMovie) {
                    const shortMovies = movies.filter(item => item.duration <= 40);
                    const resultFilter = shortMovies.filter(item => item.nameRU.toLowerCase().includes(data.toLowerCase()));
                    setMovies(resultFilter);
                    return
                }
                const resultFilter = movies.filter(item => item.nameRU.toLowerCase().includes(data.toLowerCase()));
                setMovies(resultFilter)
            }).catch((err) => {
                console.log(err);
              }).finally(()=>{
                preloaderVisible(false);
              })
        }
    };




    function handleClickBtn(data, isChecked) {
        if (!isChecked) {
            const movie = { country: data.country, director: data.director, duration: data.duration, year: data.year, description: data.description, image: `${imgUrl}${data.image.url}`, trailerLink: data.trailerLink, thumbnail: `${imgUrl}${data.image.formats.thumbnail.url}`, movieId: data.id, nameRU: data.nameRU, nameEN: data.nameEN, };

            mainApi.addMovie(movie).then((res) => {
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
            // console.log(savedMovies.map((movie) => (movie.movieId)))
            // return savedMovies.map((movie) => (movie.movieId)); 
            // setsavedMovies(savedMovies.map((movie) => (movie.movieId)))
            setSavedMovies(savedMovies);


        }).catch((err) => console.log(err))
    }

    // const savedMoviesId = [];
    

    return (
        <div className="movies">
            <SearchForm
                onSubmit={handleSearch}
                onCheckboxCheked={setCheckShotMovie}

            />
            {/* <Preloader
            isVisible ={isPreloaderVisible}
            /> */}
            <MoviesCardList
                movies={movies}
                btnImagechecked={btnImagechecked}
                btnImage={btnImage}
                nomberCards={numberCards}
                onClickBtn={handleClickBtn}
                isSavedMovies={false}
                savedMovies={savedMovies}
            />
            <button onClick={handleClickAddCards} className="movies__btn-more">Ещё</button>
            
        </div>
    )

}

export default Movies;