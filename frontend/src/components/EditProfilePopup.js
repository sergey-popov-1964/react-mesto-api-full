import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [isValid, setIsValid] = useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
    }
    if (currentUser.about !== undefined) {
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  useEffect(() => {
    const nameValidity = name.length > 2;
    const descriptionValidity = description.length > 5;
    setIsValid(nameValidity && descriptionValidity);
  }, [name, description])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleClosePopup() {
    props.onClose()
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm isOpen={props.isOpen}
                   onSubmit={handleSubmit}
                   name="edit"
                   title="Редактировать профиль"
                   buttonText='Сохранить'
                   isDisabled={!isValid}
                   classDisabled={isValid ? 'form__submit' : 'form__submit form__submit_inactive'}
                   onClose={handleClosePopup}>
      <label className="form__label">
        <input type="text"
               value={name}
               onChange={handleChangeName}
               id="input-name"
               className="form__input form__input_type_first form__input_edit_name"
               name="edit_name_avatar"
               placeholder="Имя"
               minLength="2"
               maxLength="40" required/>
        <span className="form__error input-name-error"></span>
      </label>
      <label className="form__label">
        <input type="text"
               value={description}
               onChange={handleChangeDescription}
               id="input-job"
               className="form__input form__input_type_last form__input_edit_job"
               name="edit_job"
               placeholder="Вид деятельности"
               minLength="2"
               maxLength="200" required/>
        <span className="form__error input-job-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
