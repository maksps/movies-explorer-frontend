import React from 'react';
import './Portfolio.css';
import icon from '../../../images/portfolio-icon.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__nav">
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <h4 className="portfolio__item-title">Статичный сайт</h4>
            <a className="portfolio__link" href="https://github.com/maksps/how-to-learn" target="_blank" rel="noreferrer">
              <img className="portfolio__link-icon" src={icon} alt="ссылка-иконка" />
            </a>
          </li>
          <li className="portfolio__item">
            <h4 className="portfolio__item-title">Адаптивный сайт</h4>
            <a className="portfolio__link" href="https://maksps.github.io/russian-travel/" target="_blank" rel="noreferrer">
              <img className="portfolio__link-icon" src={icon} alt="ссылка-иконка" />
            </a>
          </li>
          <li className="portfolio__item">
            <h4 className="portfolio__item-title">Одностраничное приложение</h4>
            <a className="portfolio__link" href="https://maksps.github.io/russian-travel/" target="_blank" rel="noreferrer">
              <img className="portfolio__link-icon" src={icon} alt="ссылка-иконка" />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
