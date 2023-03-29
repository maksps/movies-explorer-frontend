import React from 'react';
import { useHistory } from 'react-router-dom';
import './Error.css';

function Error({ errorCode, errorMessage }) {
  const history = useHistory();
  return (
    <div className="error">
      <div className="error__container">
        <h2 className="error__code">{errorCode}</h2>
        <h4 className="error__message">{errorMessage}</h4>
      </div>
      <button className="error__link" onClick={history.goBack}>Назад</button>

    </div>
  );
}

export default Error;
