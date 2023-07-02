import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card";

function Main ({ 
  onEditAvatar, 
  onEditProfile, 
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete
  }) {
  
    const currentUser = useContext(CurrentUserContext)
    const cardsElements = cards.map((card) => (
      <Card 
        key={card._id} 
        card={card} 
        onCardClick={onCardClick} 
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    ))

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Фото профиля."
            className="profile__photo"
          />
        </div>

        <div className="profile__content">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {cardsElements}
      </section>
    </main>
  );
}

export default Main;
