import React from "react";
import './Register.css';
import FormComponent from '../FormComponent/FormComponent.js';

function Register({onRegister }) {

    return (
            <FormComponent
                titleText={'Добро пожаловать!'}
                btnSubmitText={'Зарегистрироваться'}
                navText={'Уже зарегистрированы?'}
                navLink={'/signin'}
                navLinkText={'Войти'}
                onNameInputVisible={true}
                onSubmit={onRegister}
                >
                
            </FormComponent>

    )
}

export default Register;

