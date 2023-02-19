import React from "react";
import './footer.css'
import './__copyright/footer__copyright.css';
import './__link/footer__link.css';
import './__nav/footer__nav.css';
import './__text/footer__text.css';
import './__container/footer__container.css';
import './__row/footer__row.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__row">
                    <p className="footer__copyright">&copy; 2023 </p>
                    <ul className="footer__nav">
                        <li ><a className="footer__link" href="#" >Яндекс.Практикум</a></li>
                        <li ><a className="footer__link" href="#" >Github</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;