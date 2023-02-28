import React from "react";
import './HeaderMovie.css';

function HeaderMovie({ logo }) {
    return (
        <header className="headerMovie">
            <img className="headerMovie__logo"
                src={logo}
                alt="логотип" />
            <nav className="headerMovie__nav">
                <li className="headerMovie__link">Фильмы</li>
                <li className="headerMovie__link">Сохраненные фильмы</li>
            </nav>
            <button  className="headerMovie__btn">Аккаунт</button>
        </header>
    )

}

export default HeaderMovie;