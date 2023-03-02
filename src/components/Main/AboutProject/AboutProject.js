import React from "react";
import './AboutProject.css'


function AboutProject() {
    return (
        <section className="aboutProject" id="aboutProject">
            <h3 className="aboutProject__title">О проекте</h3>

            <div className="aboutProject__columns">
                <div className="column">
                    <h4 className="column__title">Дипломный проект включал 5 этапов</h4>
                    <p className="column_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="column">
                    <h4 className="column__title">На выполнение диплома ушло 5 недель</h4>
                    <p className="column_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="aboutProject__diagram">
                <div className="diagram-element diagram-element_clolor_green">
                    <p className="diagram-element__time diagram-element__time_clolor_green">
                        1 неделя
                    </p>
                    <p className="diagram-element__text">Back-end</p>
                </div>
                <div className="diagram-element diagram-element_clolor_white">
                    <p className="diagram-element__time diagram-element__time_clolor_white">
                        4 недели
                    </p>
                    <p className="diagram-element__text">Back-end</p>
                </div>
            </div>

        </section>
    )
}

export default AboutProject;