//props.name (edit, add, delete, avatar)
import usePopupClose from '../hooks/usePopupClose';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, children, isDisabled }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen}`}>
      <div className="popup__container" >
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          className={`form form-${name}`}
          name={`form-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className="form__button-save" disabled={isDisabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
