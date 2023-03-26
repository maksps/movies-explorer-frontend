import React, { useState, useEffect } from "react";
import './MoviesCard.css';
import mainApi from "../../utils/MainApi";
const imgUrl = 'https://api.nomoreparties.co/';



function MoviesCard(card) {

    const [isChecked, setChecked] = useState(false);
    

    function handleClick() {
        if (!isChecked) {
            setChecked(true);
            card.onClickBtn(card.movie, isChecked);
            return;
        }
        setChecked(false);
       const resultFilter =  card.savedMovies.filter(item => item.movieId === card.movie.id);
        if(resultFilter[0]){
            card.onClickBtn(resultFilter[0]._id, isChecked);
            
        }
       
        return;
    }




    function setChekedCard() {
        if (card.savedMovies.map((movie) => (movie.movieId)).includes(card.movie.id)) {
            setChecked(true);
        }
 
    }
   
   

    useEffect(() => {
        if (!card.isSavedMovies) { setChekedCard() }
        
    }, []);



    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };




    return (
        <div className="moviesCard">
            <div className="moviesCard__container">
                <div className="moviesCard__text-container">
                    <h3 className="moviesCard__title">{card.movie.nameRU}</h3>
                    <span className="moviesCard__time">{getTimeFromMins(card.movie.duration)}</span>
                </div>
                <button onClick={handleClick} className="moviesCard__btn moviesCard__btn_checked" type="button"><img className="moviesCard__btn-image" src={isChecked ? card.btnImage : card.btnImagechecked} alt="кнопка" /></button>
            </div>
            <a href={card.movie.trailerLink} target="_blank" rel="noreferrer"><img className="moviesCard__sreenshot" src={card.isSavedMovies ? card.movie.image : `${imgUrl}${card.movie.image.url}`} alt="скриншот фильма" /></a>

           

        </div>
    )

}



export default MoviesCard;