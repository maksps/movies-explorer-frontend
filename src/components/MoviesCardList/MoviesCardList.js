import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js'

function MoviesCardList({ movie, btnImage, btnImagechecked }) {
    
    return (
        <div className="moviesCardList">
            {
                movie.map((movi) => (
                    // console.log(movi.image.url)
                    <MoviesCard
                        movie={movi}
                        btnImagechecked={btnImage}
                        btnImage={btnImagechecked}
                        key={movi.id}
                    />
                ))
            }

            {/* <MoviesCard
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
            /> */}




        </div>
    )

}

export default MoviesCardList;


