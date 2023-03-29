import React from 'react';
import './Register.css';
import FormComponent from '../FormComponent/FormComponent';

function Register({ onRegister, infoMessage, setInfoMessage }) {
  return (
    <FormComponent
      titleText="Добро пожаловать!"
      btnSubmitText="Зарегистрироваться"
      navText="Уже зарегистрированы?"
      navLink="/signin"
      navLinkText="Войти"
      onNameInputVisible
      onSubmit={onRegister}
      infoMessage={infoMessage}
      setInfoMessage={setInfoMessage}
    />

  );
}

export default Register;
