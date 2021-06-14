import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup(props) {

  function handleClosePopup() {
    props.onClose()
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.cardID)
  }

  return (
    <PopupWithForm isOpen={props.isOpen}
                   onSubmit={handleSubmit}
                   name="delete"
                   title="Вы уверены?"
                   buttonText='Да'
                   onClose={handleClosePopup}
                   isDisabled={false}
                   classDisabled={'form__submit'}>
    </PopupWithForm>
  )
}

export default DeletePopup;
