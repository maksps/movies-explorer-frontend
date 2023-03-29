import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies, btnImage, btnImagechecked, onClickBtn, isSavedMovies, savedMovies, infoMessage,
}) {
  return (
    <div className="moviesCardList">
      <h2 className="moviesCardList__info">{infoMessage}</h2>
      <div className="moviesCardList__container">
        {
                    movies.map((movie) => (

                      <MoviesCard
                        movie={movie}
                        btnImagechecked={btnImage}
                        btnImage={btnImagechecked}
                        key={movie.id}
                        onClickBtn={onClickBtn}
                        isSavedMovies={isSavedMovies}
                        savedMovies={savedMovies}
                      />
                    ))
                }
      </div>
    </div>
  );
}

export default MoviesCardList;
