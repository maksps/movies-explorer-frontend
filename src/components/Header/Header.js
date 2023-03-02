import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';

function Header({ logo }) {
    
    return (
        <header className="header">
            <img className="header__logo"
                src={logo}
                alt="логотип" />
            <nav className="header__nav">
                <button className="header__btn"><Link to="/signup" className="header__link">Регистрация</Link></button>
                <button className="header__btn header__btn_green"><Link to="/signin" className="header__link">Войти</Link></button>
            </nav>
        </header>
    )

}

export default Header;