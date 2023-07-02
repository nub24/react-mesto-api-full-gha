import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation'


function Registration({ onRegistration }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values.regPassword, values.regEmail);
    resetForm();
  }

  return (
    <div className='form__container'>
      <h2 className='popup__title form__title'>Регистрация</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__input-container">
            <input
              type="email"
              name="regEmail"
              className={
                errors.regEmail 
                ? `form__input form__input_theme_dark form__input_type_error` 
                : 'form__input form__input_theme_dark'}
              placeholder="Email"
              required
              value={values.regEmail || ''}
              onChange={handleChange}
            />
            <span className={`
              form__input-error 
              ${!isValid ? 'form__input-error_visible' : ''}`}>
              {errors.regEmail || ''}
            </span>
            <input
              type="password"
              name="regPassword"
              className={
                errors.regPassword 
                ? `form__input form__input_theme_dark form__input_type_error` 
                : 'form__input form__input_theme_dark'}
              placeholder="Пароль"
              required
              value={values.regPassword || ''}
              onChange={handleChange}
            />
            <span className={`
              form__input-error 
              ${!isValid ? 'form__input-error_visible' : ''}`}>
              {errors.regEmail || ''}
            {errors.regPassword || ''}
            </span>
          </div>
        
      <button className='form__button-save form__button-save_theme_dark' disabled={!isValid}>
        Зарегистрироваться
      </button>
    </form>
    <p className="form__alternate-text">
      Уже зарегистрированы? <Link className='form__link' to='/sign-in'>Войти</Link></p>
    </div>
    
  )
}

export default Registration