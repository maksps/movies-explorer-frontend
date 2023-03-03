import React, {  useState } from "react";
import './MoviesCard.css';
// import btnIcon from '../../images/icon-movie.svg'
// "../../images/icon-movie-checked.svg"
const imgUrl = 'https://api.nomoreparties.co/'
// card.movie.image.url

function MoviesCard(card) {

    const [isChecked, setChecked] = useState(false);

    function handleClick() {
        if (!isChecked) {
            setChecked(true);
            return;
        }
        setChecked(false);
        return;
    }
    console.log(card.movie.image.url);
    return (
        <div className="moviesCard">
            <div className="moviesCard__container">
                <div className="moviesCard__text-container">
                    <h3 className="moviesCard__title">{card.movie.nameRU}</h3>
                    <span className="moviesCard__time">{card.movie.duration}</span> 
                </div>
                <button onClick={handleClick} className="moviesCard__btn moviesCard__btn_checked" type="button"><img className="moviesCard__btn-image" src={isChecked ? card.btnImage : card.btnImagechecked} alt="кнопка" /></button>
            </div>
             <img className="moviesCard__sreenshot" src={`${imgUrl}${card.movie.image.url}`} alt="скриншот фильма" /> 

        </div>
    )

}

export default MoviesCard;