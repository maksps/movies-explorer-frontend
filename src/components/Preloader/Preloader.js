import React from 'react'
import './Preloader.css'

const Preloader = ({isVisible}) => {
    return (
        <div className={isVisible ? 'preloader preloader-visible': 'preloader'}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader