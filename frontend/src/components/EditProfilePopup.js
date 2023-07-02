import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation'

function EditProfilePopup({buttonText, isOpen, onClose, onUpdateUser}) {

  const currentUser=useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ 
      name: values.name, 
      about: values.about });
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, isOpen, resetForm])

  return (
    <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          buttonText={buttonText}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          isDisabled={!isValid}
        >
          <div className="form__input-container">
            <input
              type="text"
              name="name"
              className="form__input"
              placeholder="Введите имя"
              required
              minLength="2"
              maxLength="40"
              value={values.name || ''}
              onChange={handleChange}
            />
            <span className={`
              form__input-error 
              ${!isValid ? 'form__input-error_visible' : ''}`}
            >{errors.name || ''}</span>
            <input
              type="text"
              name="about"
              className="form__input"
              placeholder="Введите описание"
              required
              minLength="2"
              maxLength="200"
              value={values.about || ''}
              onChange={handleChange}
            />
            <span className={`
              form__input-error
              ${!isValid ? 'form__input-error_visible' : ''}`}
            >{errors.about || ''}</span>
          </div>
        </PopupWithForm>
  )
}

export default EditProfilePopup