import React from "react";
import './Header.css';

function Header({ logo }) {
    return (
        <header className="header">
            <img className="header__logo"
                src={logo}
                alt="логотип" />
            <nav className="header__nav">
                <li className="header__link">Фильмы</li>
                <li className="header__link">Сохраненные фильмы</li>
            </nav>
            <button  className="header__btn">Аккаунт</button>
        </header>
    )

}

export default Header;