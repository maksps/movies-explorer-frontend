import React, { useState, useEffect, useCallback } from "react";
import './FormComponent.css';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function FormComponent({ titleText, btnSubmitText, navText, navLink, navLinkText, onSubmit, onNameInputVisible }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleInputName(e) {
        setName(e.target.value)
    }

    function handleInputEmail(e) {
        setEmail(e.target.value)
    }

    function handleInputPassword(e) {
        setPassword(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(
            {
                password: password,
                email: email,
                name: name
            }
        );
    }

    return (
        <div className="formComponent">
            <div className="formComponent__container">
                <img className="formComponent__logo" src={logo} alt="логотип" />
                <h2 className="formComponent__title">{titleText}</h2>
                <form className="formComponent__form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label className={onNameInputVisible ? `inputLabel` : `inputLabel_unvisible`}>
                            <span className="inputLabel__title">Имя</span>
                            <input className="inputLabel__input" value={name || ''} onChange={handleInputName} name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required={onNameInputVisible ? true : false} autoComplete="off"></input>
                            <span className="inputLabel__input-error"></span>
                        </label>
                        <label className="inputLabel">
                            <span className="inputLabel__title">E-mail</span>
                            <input className="inputLabel__input" value={email || ''} onChange={handleInputEmail} name="email" type="email" placeholder="E-mail" required autoComplete="off"></input>
                            <span className="inputLabel__input-error"></span>
                        </label>
                        <label className="inputLabel">
                            <span className="inputLabel__title">Пароль</span>
                            <input className="inputLabel__input" value={password || ''} onChange={handleInputPassword} type="password" name="password" placeholder="Пароль" autoComplete="off" required></input>
                            <span className="inputLabel__input-error">''message</span>
                        </label>
                    </div>
                    <button className="formComponent__btn-save" type="submit">{btnSubmitText}</button>
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

export default FormComponent;