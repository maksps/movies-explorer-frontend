import React from "react";
import './header.css';
import './__nav/header__nav.css';
import './__link/header__link.css';
import './__btn/header__btn.css';
import './__logo/header__logo.css';



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