import React from "react";
import './Profile.css';;

function Profile() {
    return (
        <div className="profile">
            {/* <div className="profile__container"> */}
                <h3 className="profile__title">Привет, Виталий!</h3>
                <form className="profile__form">
                    <label className="inputField">
                        <div className="inputField__container">
                            <span className="inputFild__title">Имя</span>
                            <input className="inputField__input" type="text" placeholder="Виталий" />
                        </div>
                        <span className="inputField__input-error"></span>
                    </label>

                    <label className="inputField inputField_bordered">
                        <div className="inputField__container">
                            <span className="inputFild__title">E-mail</span>
                            <input className="inputField__input" type="email" placeholder="pochta@yandex.ru" />
                        </div>
                        <span className="inputField__input-error"></span>
                    </label>
                </form>
                <nav className="profile__nav">
                    <button className="profile__button profile__button_type_edit" type="button">Редактировать</button>
                    <button className="profile__button profile__button_type_exit" type="button">Выйти из аккаунта</button>
                </nav>
            {/* </div> */}
        </div>
    )
}

export default Profile;