import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation'


function AddPlacePopup({ buttonText, onAddPlace, isOpen, onClose }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ 
      name: values.name,
      link: values.link });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm])

  return (
    <PopupWithForm
          name="add"
          title="Новое место"
          buttonText={buttonText}
          isOpen={isOpen && "popup_active"}
          onClose={onClose}
          onSubmit={handleSubmit}
          isDisabled={!isValid}
        >
          <div className="form__input-container">
            <input
              type="text"
              name="name"
              className={errors.name ? 'form__input form__input_type_error' : 'form__input'}
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              value={values.name || ''}
            />
            <span className={`
              form__input-error 
              ${!isValid ? 'form__input-error_visible' : ''}`}
            >{errors.name || ''}</span>
            <input
              type="url"
              name="link"
              className={errors.link ? 'form__input form__input_type_error' : 'form__input'}
              placeholder="Ссылка на картинку"
              required
              onChange={handleChange}
              value={values.link || ''}
            />
            <span className={`
              form__input-error 
              ${!isValid ? 'form__input-error_visible' : ''}`}>
                {errors.link || ''}
              </span>
          </div>
        </PopupWithForm>
  )
}

export default AddPlacePopup