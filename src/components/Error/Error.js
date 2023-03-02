import React from "react";
import './Error.css';


function Error({ errorCode, errorMessage }) {
    return (
        <div className="error">
            <div className="error__container">
                <h2 className="error__code">{errorCode}</h2>
                <h4 className="error__message">{errorMessage}</h4>
            </div>
            <a className="error__link" href="#">Назад</a>

        </div>
    )
}

export default Error;