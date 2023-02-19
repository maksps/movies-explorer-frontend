import React from "react";
import './Main.css';
import Promo from './Promo/Promo.js';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Tech';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main() {
    return (
        <div className="main">
            <Promo/>
            <NavTab/>
            <AboutProject/>
            {/* <Techs/> */}
            {/* <AboutMe/> */}
            {/* <Portfolio/> */}
        </div>
    )
}

export default Main;