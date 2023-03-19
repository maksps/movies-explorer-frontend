import React, { useState, useEffect, useCallback } from "react";
import './FormComponent.css';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function FormComponent({ titleText, btnSubmitText, navText, navLink, navLinkText, onSubmit, onNameInputVisible }) {
    const [formState, setFormState] = useState({ name: '', email: '', password: '', nameValid: onNameInputVisible? false: true, emailValid: false, passwordValid: false})
    const [validationMessage, setValidationMessage] = useState({ name: '', email: '', password: '' });
    const [onButtonDisable, SetButtonnDisable] = useState(true);


    useEffect(() => {
        if (formState.nameValid && formState.emailValid && formState.passwordValid){
            SetButtonnDisable(false)
        } else {
            SetButtonnDisable(true)
        }             
    }, [formState]);


    // function handleInput(e) {
    //     const { name, value, validationMessage, validity } = e.target;
    //     setFormState({ ...formState, [name]: value, [`${name}Valid`]: validity.valid});
    //     setValidationMessage({ [name]: validationMessage });
    // }


    const handleInput = useCallback((e) => {
        const { name, value, validationMessage, validity } = e.target;
        setFormState({ ...formState, [name]: value, [`${name}Valid`]: validity.valid});
        setValidationMessage({ [name]: validationMessage });
    },[formState])


    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.validity.valid);
        onSubmit(
            // {
            //     password: password,
            //     email: email,
            //     name: name
            // }
            formState
        );
    }

    return (
        <div className="formComponent">
            <div className="formComponent__container">
                <img className="formComponent__logo" src={logo} alt="логотип" />
                <h2 className="formComponent__title">{titleText}</h2>
                <form className="formComponent__form" onSubmit={handleSubmit} noValidate>
                    <div className="input-container">
                        <label className={onNameInputVisible ? `inputLabel` : `inputLabel_unvisible`}>
                            <span className="inputLabel__title">Имя</span>
                            <input className="inputLabel__input" value={formState.name || ''} onChange={handleInput} name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required={onNameInputVisible ? true : false} autoComplete="off" ></input>
                            <span className="inputLabel__input-error">{validationMessage.name}</span>
                        </label>
                        <label className="inputLabel">
                            <span className="inputLabel__title">E-mail</span>
                            <input className="inputLabel__input" value={formState.email || ''} onChange={handleInput} name="email" type="email" placeholder="E-mail" required autoComplete="off"></input>
                            <span className="inputLabel__input-error">{validationMessage.email}</span>
                        </label>
                        <label className="inputLabel">
                            <span className="inputLabel__title">Пароль</span>
                            <input className="inputLabel__input" value={formState.password || ''} onChange={handleInput} type="password" name="password" placeholder="Пароль" minLength="4" autoComplete="off" required></input>
                            <span className="inputLabel__input-error">{validationMessage.password}</span>
                        </label>
                    </div>
                    <button className={onButtonDisable ? 'formComponent__btn-save formComponent__btn-save_inactive' : 'formComponent__btn-save '} type="submit" disabled={onButtonDisable} >{btnSubmitText} </button>
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