import React from "react";
import './Error.css';


function Error({errorCode, errorMessage}) {
    return (
        <div className="error">
           <h2 className="error__code">{errorCode}</h2>
           <h4 className="error__message">{errorMessage}</h4>
           <a className="error__link" href="#">Назад</a>
        </div>
    )
}

export default Error;