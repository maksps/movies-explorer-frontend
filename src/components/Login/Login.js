import React, { useState } from "react";
import './Login.css';
import FormComponent from '../FormComponent/FormComponent.js';

function Login({ onLogin, infoMessage, setInfoMessage }) {

        return (

        <FormComponent
            titleText={'Рады видеть!'}
            btnSubmitText={'Войти'}
            navText={'Ещё не зарегистрированы?'}
            navLink={'/signup'}
            navLinkText={'Регистрация'}
            onSubmit={onLogin}
            onNameInputVisible={false}
            infoMessage={infoMessage}
            setInfoMessage={setInfoMessage}
        />

    )
}

export default Login;