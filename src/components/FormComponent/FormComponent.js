import React, { useState, useEffect, useCallback } from 'react';
import './FormComponent.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function FormComponent({
  titleText, btnSubmitText, navText, navLink, navLinkText,
   onSubmit, onNameInputVisible, infoMessage, setInfoMessage,
}) {
  const [formState, setFormState] = useState({
    name: '', email: '', password: '', nameValid: !onNameInputVisible, emailValid: false, passwordValid: false,
  });
  const [validationMessage, setValidationMessage] = useState({ name: '', email: '', password: '' });
  const [onButtonDisable, setButtonnDisable] = useState(true);

  useEffect(() => {
    if (formState.nameValid && formState.emailValid && formState.passwordValid) {
      setButtonnDisable(false);
    } else {
      setButtonnDisable(true);
    }
  }, [formState]);

  const handleInput = useCallback((e) => {
    const {
      name, value, validationMessage, validity,
    } = e.target;
    setFormState({ ...formState, [name]: value, [`${name}Valid`]: validity.valid });
    setValidationMessage({ [name]: validationMessage });
    setInfoMessage('');
  }, [formState]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(
      formState,
    );
  }

  return (
    <div className="formComponent">
      <div className="formComponent__container">
        <img className="formComponent__logo" src={logo} alt="логотип" />
        <h2 className="formComponent__title">{titleText}</h2>
        <form className="formComponent__form" onSubmit={handleSubmit} noValidate>
          <div className="input-container">
            <label className={onNameInputVisible ? 'inputLabel' : 'inputLabel_unvisible'}>
              <span className="inputLabel__title">Имя</span>
              <input className="inputLabel__input" value={formState.name || ''} onChange={handleInput} name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required={!!onNameInputVisible} pattern="^[а-яА-ЯёЁa-zA-Z0-9 ]+$" autoComplete="off" />
              <span className="inputLabel__input-error">{validationMessage.name}</span>
            </label>
            <label className="inputLabel">
              <span className="inputLabel__title">E-mail</span>
              <input className="inputLabel__input" value={formState.email || ''} onChange={handleInput} name="email" type="email" placeholder="E-mail" required autoComplete="off" />
              <span className="inputLabel__input-error">{validationMessage.email}</span>
            </label>
            <label className="inputLabel">
              <span className="inputLabel__title">Пароль</span>
              <input className="inputLabel__input" value={formState.password || ''} onChange={handleInput} type="password" name="password" placeholder="Пароль" minLength="4" autoComplete="off" required />
              <span className="inputLabel__input-error">{validationMessage.password ? validationMessage.password : infoMessage}</span>
            </label>
          </div>
          <button className={onButtonDisable ? 'formComponent__btn-save formComponent__btn-save_inactive' : 'formComponent__btn-save '} type="submit" disabled={onButtonDisable}>
            {btnSubmitText}
            {' '}
          </button>
        </form>
        <nav className="formComponent__nav">
          <span className="formComponent__nav-text">
            {navText}
            <Link className="formComponent__nav-link" to={navLink}>{navLinkText}</Link>
          </span>
        </nav>
      </div>
    </div>
  );
}

export default FormComponent;
