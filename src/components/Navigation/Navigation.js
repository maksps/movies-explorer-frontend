import React, {  useState } from "react";
import { Link } from 'react-router-dom';
import './Navigation.css';
import navBtn from '../../images/nav-button.svg';


function Navigation() {

    const [isPopapOpen, setPopapOpen ] = useState(false);

    function handleClick() {
        if (!isPopapOpen) {
            setPopapOpen(true);
            return;
        }
        setPopapOpen(false);
        return;
    }

    return (
        <>
            <nav className="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item"><Link to="/movies"  className="navigation__link" >Фильмы</Link></li>
                    <li className="navigation__item"><Link to="/saved-movies" className="navigation__link" >Сохраненные фильмы</Link></li>
                </ul>

                <button className="navigation__btn"><Link to="/profile" className="navigation__btn-link">Аккаунт</Link></button>
            </nav>

            <button className="navigation-mobile" onClick={handleClick} type="button"><img className="navigation-mobile__btn"
                src={navBtn}
                alt="навигация" />
            </button>

            <div className={isPopapOpen ? `popup popup_opened` : `popup`}>
                <div className="popup-container">
                    <nav className="popup-navigation">
                        <ul className="popup-navigation__list">
                            <li className="popup-navigation__item"><Link to="/" className="popup-navigation__link" >Главная</Link></li>
                            <li className="popup-navigation__item"><Link to="/movies" className="popup-navigation__link" >Фильмы</Link></li>
                            <li className="popup-navigation__item"><Link to="/saved-movies" className="popup-navigation__link" >Сохраненные фильмы</Link></li>
                        </ul>

                        <button className="navigation__btn">Аккаунт</button>
                    </nav>
                    <button className="popup__btn-exit" onClick={handleClick} type="button" aria-label="выход"></button>
                </div>
            </div>
        </>
    )
}

export default Navigation;