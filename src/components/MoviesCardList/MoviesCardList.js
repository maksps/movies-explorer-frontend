import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js'

function MoviesCardList({ movies, btnImage, btnImagechecked, nomberCards, onClickBtn, isSavedMovies }) {
    
   
    return (
        <div className="moviesCardList"> 
            {
                
                movies.slice(0, nomberCards).map((movie) => (
                    
                    <MoviesCard
                        movie={movie}
                        btnImagechecked={btnImage}
                        btnImage={btnImagechecked}
                        key={movie.id}
                        onClickBtn={onClickBtn}
                        isSavedMovies={isSavedMovies}
                    />
                ))
            }

        </div>
    )
}

export default MoviesCardList;


