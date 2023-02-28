import React from "react";
import './AboutMe.css'
import img from '../../../images/aboutmepic.png'


function AboutMe() {
    return (
        <section className="aboutMe">
            <h3 className="aboutMe__title">Студент</h3>
            <div className="aboutMe__container">
                <div className="aboutMe__info">
                    <h4 className="aboutMe__subtitle">Виталий</h4>
                    <p className="aboutMe__text aboutMe__text_bold">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutMe__text">Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <span className="aboutMe__github">Github</span>
                </div>
                <img className="aboutMe__img" src={img} alt="фотография" />
            </div>
        </section>
    )
}

export default AboutMe;