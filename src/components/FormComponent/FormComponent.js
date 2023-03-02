import React from "react";
import './FormComponent.css';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function formСomponent({ titleText, btnSubmitText, navText, navLink, navLinkText, children }) {
    return (
        <div className="formComponent">
            <div className="formComponent__container">
            <img className="formComponent__logo" src={logo} alt="логотип" />
            <h2 className="formComponent__title">{titleText}</h2>
            <form className="formComponent__form">
                {children}
                <label className="inputLaebel">
                    <span className="inputLabel__title">E-mail</span>
                    <input className="inputLabel__input" type="email" placeholder="E-mail" required autoComplete="off"></input>
                    <span className="inputLabel__input-error"></span>
                </label>
                <label className="inputLabel">
                    <span className="inputLabel__title">Пароль</span>
                    <input className="inputLabel__input" type="password" placeholder="Пароль" autoComplete="off" required></input>
                    <span className="inputLabel__input-error">Что-то пошлоdddddddddddddddddd fdfdf dfdgfg</span>
                </label>
                <button class="formComponent__btn-save" type="submit">{btnSubmitText}</button>
            </form>

            <nav className="formComponent__nav">
                <span className="formComponent__nav-text">{navText}
                    <Link className="formComponent__nav-link" to={navLink}>{navLinkText}</Link>
                </span>
            </nav>
            </div>
        </div>
    )
}

export default formСomponent;