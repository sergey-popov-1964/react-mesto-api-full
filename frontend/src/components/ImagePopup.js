import React from "react";

function ImagePopup(props) {

  if (!props.card) return null;

  return (
    <div className={!props.card ? `popup-${props.name} popup` : `popup-${props.name} popup popup_active`}>
      <div className="zoom-img popup__form">
        <img src={props.card.link}
             className="zoom-img__img"
             alt={props.card.name}/>
        <p className="zoom-img__text">{props.card.name}</p>
        <button type="button"
                className="zoom-img__close popup__close"
                onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;


