import React from 'react';
import './Tech.css';

function Tech() {
  return (
    <section className="tech" id="tech">
      <h3 className="tech__title">Технологии</h3>
      <div className="tech__container">
        <h4 className="tech__subtitle">7 технологий</h4>
        <p className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <div className="table">
        <div className="table__cell">
          <span className="table__cell-text">HTML</span>
        </div>
        <div className="table__cell">
          <span className="table__cell-text">CSS</span>
        </div>
        <div className="table__cell">
          <span className="table__cell-text">JS</span>
        </div>
        <div className="table__cell">
          <span className="table__cell-text">React</span>
        </div>
        <div className="table__cell">
          <span className="table__cell-text">Git</span>
        </div>
        <div className="table__cell">
          <span className="table__cell-text">Express.js</span>
        </div>
        <div className="table__cell">
          <span className="table__cell-text">mongoDB</span>
        </div>
      </div>

    </section>
  );
}

export default Tech;
