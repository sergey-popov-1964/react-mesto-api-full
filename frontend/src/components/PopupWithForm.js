import React from "react";

function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? `popup-${props.name} popup popup_active` : `popup-${props.name} popup`}>
      <form action="#"
            onSubmit={props.onSubmit}
            className="form popup__form"
            name={`form__${props.name}`} noValidate>
        <h2 className="form__title">{props.title}</h2>
        {props.children}
        <button type="submit"
                aria-label="submit"
                className={props.classDisabled}
                disabled={props.isDisabled}
                name="form_submit">
          {props.buttonText}
        </button>
        <button type="button"
                aria-label="close"
                className="form__close popup__close"
                name="form_close"
                onClick={props.onClose}></button>
      </form>
    </div>
  )
}

export default PopupWithForm;
