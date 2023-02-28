import React from "react";
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies() {
    return (
        <div className="savedMovies">
            <SearchForm />
            <MoviesCardList />
        </div>
    )

}

export default SavedMovies;