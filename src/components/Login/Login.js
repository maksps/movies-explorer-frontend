import React from "react";
import './Login.css';
import FormComponent from '../FormComponent/FormComponent.js';

function Login() {
    return (
        // <div className="login">
            <FormComponent
                titleText={'Рады видеть!'}
                btnSubmitText={'Войти'}
                navText={'Ещё не зарегистрированы?'}
                navLink={'#'}
                navLinkText={'Регистрация'}
            />
        // </div>
    )
}

export default Login;