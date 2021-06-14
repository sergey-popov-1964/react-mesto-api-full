import React from "react";
import success from '../images/success.svg'
import successnot from '../images/successnot.svg'

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `popup popup_active` : `popup`}>
      <form action="#"
            className="form popup__form">
        {props.type ? (<img src={success} className='form__image' alt=''/>) : (
          <img src={successnot} className='form__image' alt=''/>)}
        <h2 className="form__message">{props.message}</h2>
        <button type="button"
                aria-label="close"
                className="form__close popup__close"
                name="form_close"
                onClick={props.onClose}></button>
      </form>
    </div>
  )
}

export default InfoTooltip;
