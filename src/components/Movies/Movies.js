import React, { useState, useEffect, useCallback } from "react";
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import SearchForm from '../SearchForm/SearchForm.js';
import btnImagechecked from '../../images/icon-movie-checked.svg';
import btnImage from '../../images/icon-movie.svg';
import movieApi from "../../utils/MoviesApi";




function Movies() {

    const [movies, setMovies] = useState([]);


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



   

    useEffect(() => {
        movieApi.getMovies().then(data => {

            setMovies(data)
        });

    }, []);
    // console.log(movies);








    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList
                movie={movies}
                btnImagechecked={btnImagechecked}
                btnImage={btnImage}
            />
            <button className="movies__btn-more">Ещё</button>
        </div>
    )

}

export default Movies;