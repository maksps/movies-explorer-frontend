import React from "react";
import './Login.css';
import FormComponent from '../FormComponent/FormComponent.js';

function Login() {
    return (
        
            <FormComponent
                titleText={'Рады видеть!'}
                btnSubmitText={'Войти'}
                navText={'Ещё не зарегистрированы?'}
                navLink={'/signup'}
                navLinkText={'Регистрация'}
            />
        
    )
}

export default Login;