import React, { useContext, useState, useEffect, useCallback } from "react";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onChangeProfile, onClickEscButton, infoMessage, setInfoMessage }) {

    const currentUser = useContext(CurrentUserContext);
    const [formState, setFormState] = useState({ name: currentUser.name, email: currentUser.email, nameValid: true, emailValid: true })
    const [validationMessage, setValidationMessage] = useState({ name: '', email: '' });
    const [onButtonDisable, setButtonnDisable] = useState(false);
    useEffect(() => {
        if (formState.nameValid && formState.emailValid) {
            setButtonnDisable(false)
        } else {
            setButtonnDisable(true)
        }
    }, [formState]);

    console.log(infoMessage);

    const handleInput = useCallback((e) => {
        const { name, value, validationMessage, validity } = e.target;
        setFormState({ ...formState, [name]: value, [`${name}Valid`]: validity.valid });
        setValidationMessage({ [name]: validationMessage });
        setInfoMessage('')
    }, [formState])

    function handleSubmit(e) {
        e.preventDefault();
        onChangeProfile(
            {
                name: formState.name,
                email: formState.email
            }
        );
    }


    

    return (
        <div className="profile">
            <h3 className="profile__title">Привет, {currentUser.name}!</h3>
            <form className="profile__form" onSubmit={handleSubmit}>
                <label className="inputField">
                    <div className="inputField__container">
                        <span className="inputFild__title">Имя</span>
                        <input className="inputField__input" value={formState.name || currentUser.name} onChange={handleInput} name="name" type="text" minLength="2" maxLength="40" required pattern="^[а-яА-ЯёЁa-zA-Z0-9 ]+$" autoComplete="off" />
                    </div>
                    <span className="inputField__input-error">{validationMessage.name}</span>
                </label>

                <label className="inputField inputField_bordered">
                    <div className="inputField__container">
                        <span className="inputFild__title">E-mail</span>
                        <input className="inputField__input" value={formState.email || currentUser.email} onChange={handleInput} name="email" type="email" />
                    </div>
                    <span className="inputField__input-error">{validationMessage.email ? validationMessage.email : infoMessage}</span>
                </label>
                <nav className="profile__nav">
                    <button className={onButtonDisable ? 'profile__button profile__button_type_edit-inactive' : 'profile__button profile__button_type_edit'} type="submit" disabled={onButtonDisable} >Редактировать</button>
                    <button className="profile__button profile__button_type_exit" type="button" onClick={onClickEscButton}>Выйти из аккаунта</button>
                </nav>
            </form>
        </div>
    )
}

export default Profile;
