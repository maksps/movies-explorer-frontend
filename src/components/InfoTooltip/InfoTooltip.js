import React from 'react';
import './InfoTooltip.css';
import errImage from '../../images/logo-error.svg';

function InfoTooltip({ isOpen, onClose, text }) {
  return (
    <div className={isOpen ? 'infoTooltip infoTooltip_infoTooltip infoTooltip_opened' : 'infoTooltip infoTooltip_infoTooltip'}>
      <div className="infoTooltip__container infoTooltip__container_infoTooltip">
        <img className="infoTooltip__logo" src={errImage} alt="логотип" />
        <h3 className="infoTooltip__text-info">{text}</h3>

        <button className="infoTooltip__btn-exit" onClick={onClose} type="button" aria-label="выход" />
      </div>
    </div>
  );
}

export default InfoTooltip;
