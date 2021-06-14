import React, {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = useRef(0);

  useEffect(() => {
    avatarRef.current.value = ('');
  }, [props.isOpen])

  function handleClosePopup() {
    props.onClose()
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: avatarRef.current.value});
  }

  return (
    <PopupWithForm isOpen={props.isOpen}
                   name="avatar"
                   title="Обновить аватар"
                   buttonText="Сохранить"
                   onClose={handleClosePopup}
                   onSubmit={handleSubmit}
                   isDisabled={false}
                   classDisabled={'form__submit'}>
      <label className="form__label">
        <input type="url"
               id="input-avatar"
               ref={avatarRef}
               className="form__input form__input_type_last form__input_type_first form__input_avatar_link"
               name="avatar_mesto"
               placeholder="Введите адрес"
               minLength="2"
               maxLength="300" required/>
        <span className="form__error input-avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
