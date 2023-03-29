import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__row">
          <p className="footer__copyright">&copy; 2023 </p>
          <ul className="footer__nav">
            <li><a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
            <li><a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
