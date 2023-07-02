import usePopupClose from '../hooks/usePopupClose';

function ImagePopup({ name, card, onClose }) {
  const isOpen = Object.keys(card).length
  usePopupClose(isOpen, onClose);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && 'popup_active'}`}>
      <div className="popup__container-view" >
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <img
          className="popup__photo"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
