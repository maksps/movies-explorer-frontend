import React, { useState } from "react";
import './Login.css';
import FormComponent from '../FormComponent/FormComponent.js';

function Login({ onLogin, errMessage, setErrMessage }) {

        return (

        <FormComponent
            titleText={'Рады видеть!'}
            btnSubmitText={'Войти'}
            navText={'Ещё не зарегистрированы?'}
            navLink={'/signup'}
            navLinkText={'Регистрация'}
            onSubmit={onLogin}
            onNameInputVisible={false}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
        />

    )
}

export default Login;