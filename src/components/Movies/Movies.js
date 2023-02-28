import React from "react";
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import SearchForm from '../SearchForm/SearchForm.js';
import btnImagechecked from '../../images/icon-movie-checked.svg';
import btnImage from '../../images/icon-movie.svg'
const movie = {
    image: 'https://mobimg.b-cdn.net/v3/fetch/26/260e062829bc021a8ab11fb329edeac9.jpeg?w=1470&r=0.5625',
    name: 'Аватар',
    duration: '1ч 60мин'
}




function Movies() {
    
    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList
                movie={movie}
                btnImagechecked={ btnImagechecked}
                btnImage={ btnImage}
            />
        </div>
    )

}

export default Movies;