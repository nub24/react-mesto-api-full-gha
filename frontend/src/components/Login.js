import { useFormAndValidation } from '../hooks/useFormAndValidation'

function Login({ onAuthorization }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorization(values.authPassword, values.authEmail);
    resetForm();
  }

  return (
    <div className='form__container'>
      <h2 className='popup__title form__title'>Вход</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__input-container">
            <input
              type="email"
              name="authEmail"
              className={
                errors.authEmail 
                ? `form__input form__input_theme_dark form__input_type_error` 
                : 'form__input form__input_theme_dark'}
              placeholder="Email"
              required
              value={values.authEmail || ''}
              onChange={handleChange}
            />
            <span className={`
              form__input-error 
              ${!isValid ? 'form__input-error_visible' : ''}`}>
                {errors.authEmail || ''}
              </span>
            <input
              type="password"
              name="authPassword"
              className={
                errors.authPassword 
                ? `form__input form__input_theme_dark form__input_type_error` 
                : 'form__input form__input_theme_dark'}
              placeholder="Пароль"
              required
              value={values.authPassword || ''}
              onChange={handleChange}
            />
            <span className={`
              form__input-error 
              ${!isValid ? 'form__input-error_visible' : ''}`}>
              {errors.authPassword || ''}
            </span>
          </div>
        
      <button className='form__button-save form__button-save_theme_dark' disabled={!isValid}>
        Войти
      </button>
    </form>
    </div>
    
  )
}

export default Login