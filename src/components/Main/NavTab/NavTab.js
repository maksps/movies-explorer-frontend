import React from "react";
import './NavTab.css'


function NavTab() {
    return (
        <nav className="navTab">
            <ul className="navTab__list">
                <li ><a className="navTab__link" href="#">О проекте</a></li>
                <li ><a className="navTab__link" href="#">Технологии</a></li>
                <li ><a className="navTab__link" href="#">О проекте</a></li>
            </ul>
        </nav>
    )
}

export default NavTab;