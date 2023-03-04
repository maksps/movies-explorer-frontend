import React from "react";
import './HeaderMovie.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function HeaderMovie({ logo }) {
    return (
        <header className="headerMovie">
            <div className="headerMovie__container">
                <Link to="/" className="headerMovie_main-link">
                    <img className="headerMovie__logo"
                        src={logo}
                        alt="логотип" />
                </Link>
                <Navigation />
            </div>
        </header>
    )

}

export default HeaderMovie;