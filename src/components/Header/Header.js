import React from "react";
import './Header.css';

function Header({ logo }) {
    
    return (
        <header className="header">
            <img className="header__logo"
                src={logo}
                alt="логотип" />
            <nav className="header__nav">
                <button className="header__btn">Регистрация</button>
                <button className="header__btn header__btn_green">Войти</button>
            </nav>
        </header>
    )

}

export default Header;