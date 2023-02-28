import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js'

function MoviesCardList({ movie, btnImage, btnImagechecked }) {

    return (
        <div className="moviesCardList">
            {/* {
                movies.map((movie) => (
                    <MoviesCard
                        movie={movie}
                    />
                ))
            } */}

            <MoviesCard
                movie={movie}
                btnImagechecked={btnImage}
                btnImage={btnImagechecked}
            />
            <MoviesCard
                movie={movie}
                btnImagechecked={btnImage}
                btnImage={btnImagechecked}
            />
            <MoviesCard
                movie={movie}
                btnImagechecked={btnImage}
                btnImage={btnImagechecked}
            />
            <MoviesCard
                movie={movie}
                btnImagechecked={btnImage}
                btnImage={btnImagechecked}
            />
            <MoviesCard
                movie={movie}
                btnImagechecked={btnImage}
                btnImage={btnImagechecked}
            />
            <MoviesCard
                movie={movie}
                btnImagechecked={btnImage}
                btnImage={btnImagechecked}
            />




        </div>
    )

}

export default MoviesCardList;


