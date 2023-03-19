import React  from "react";
import {  useNavigate } from 'react-router-dom';
import './Error.css';



function Error({ errorCode, errorMessage }) {
    const navigate = useNavigate();
    return (
        <div className="error">
            <div className="error__container">
                <h2 className="error__code">{errorCode}</h2>
                <h4 className="error__message">{errorMessage}</h4>
            </div>
            {/* <Link className="error__link" to="/">Назад</Link> */}
            <button className="error__link" onClick={() => navigate(-1)}>Назад</button>

        </div>
    )
}

export default Error;