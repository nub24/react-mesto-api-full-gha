import { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation'


function EditAvatarPopup({ buttonText, isOpen, onClose, onUpdateAvatar }) {
  
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handlesubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(values.avatar)
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])

  return (
    <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText={buttonText}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handlesubmit}
          isDisabled={!isValid}
        >
          <div className="form__input-container">
            <input
              type="url"
              name="avatar"
              className={errors.avatar ? 'form__input form__input_type_error' : 'form__input'}
              placeholder="Ссылка на картинку"
              required
              value={values.avatar || ''}
              onChange={handleChange}
            />
            <span className={`
              form__input-error avatar-error
              ${!isValid ? 'form__input-error_visible' : ''}`}
            >{errors.avatar || ''}</span>
          </div>
        </PopupWithForm>
  )
}

export default EditAvatarPopup