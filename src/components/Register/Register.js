import React from "react";
import './Register.css';
import FormComponent from '../FormComponent/FormComponent.js';

function Register() {
    return (
            <FormComponent
                titleText={'Добро пожаловать!'}
                btnSubmitText={'Зарегистрироваться'}
                navText={'Уже зарегистрированы?'}
                navLink={'#'}
                navLinkText={'Войти'}>
                <label className="inputLaebel">
                    <span className="inputLabel__title">Имя</span>
                    <input className="inputLabel__input" type="text" placeholder="Имя" minLength="2" maxLength="40" required autoComplete="off"></input>
                    <span className="inputLabel__input-error"></span>
                </label>
            </FormComponent>

    )
}

export default Register;

