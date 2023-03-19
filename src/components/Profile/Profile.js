import React, { useContext, useState } from "react";
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({onChangeProfile, onClickEscButton}) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
   

    function handleInputName(e) {
        setName(e.target.value);
    }

    function handleInputEmail(e) {
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onChangeProfile(
            {
                email: email,
                name: name
            }
        );
    }




    return (
        <div className="profile">
            {/* <div className="profile__container"> */}
            <h3 className="profile__title">Привет, {currentUser.name}!</h3>
            <form className="profile__form" onSubmit={handleSubmit}>
                <label className="inputField">
                    <div className="inputField__container">
                        <span className="inputFild__title">Имя</span>
                        <input className="inputField__input" value={name || ''} onChange={handleInputName} name="name" type="text" placeholder={currentUser.name} />
                    </div>
                    <span className="inputField__input-error"></span>
                </label>

                <label className="inputField inputField_bordered">
                    <div className="inputField__container">
                        <span className="inputFild__title">E-mail</span>
                        <input className="inputField__input" value={email || ''} onChange={handleInputEmail} name="email" type="email" placeholder={currentUser.email} />
                    </div>
                    <span className="inputField__input-error"></span>
                </label>
                <nav className="profile__nav">
                <button className="profile__button profile__button_type_edit" type="submit">Редактировать</button>
                <button className="profile__button profile__button_type_exit" type="button" onClick={onClickEscButton}>Выйти из аккаунта</button>
            </nav>
            </form>
        </div>
    )
}

export default Profile;