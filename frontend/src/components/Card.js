import {useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked && 'card__button-like_active'}`
  )

  function handleclick() {
    onCardClick(card);
  }

  function handleLikeClick () {
    onCardLike(card)
  }
  
  function handleDeleteClick () {
    onCardDelete(card)
  }

  return (
    <article className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__photo"
        onClick={handleclick}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-block">
          <button 
            type="button" 
            className={cardLikeButtonClassName}
            onClick = {handleLikeClick}
            ></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && 
        <button 
          type="button" 
          className="card__button-delete"
          onClick={handleDeleteClick}
          />}
    </article>
  );
}

export default Card;
