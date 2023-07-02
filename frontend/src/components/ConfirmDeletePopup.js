import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onSubmit, buttonText }) {

  return (
    <PopupWithForm
      name="delete" 
      title="Вы уверены?"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={onSubmit}
      buttonText={buttonText}
      isValid={true}
      />
    
  )
}

export default ConfirmDeletePopup