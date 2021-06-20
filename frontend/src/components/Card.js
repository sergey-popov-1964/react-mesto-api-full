import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_show' : 'element__trash_hide'}`
  );
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__heart ${isLiked ? 'element__heart_like' : ''}`
  );

  function handleClick(evt) {
    onCardClick(card, evt);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card._id);
  }

  return (
    <li className="element">
      <div className="element__img"
           style={{backgroundImage: `url(${card.link})`}}
           onClick={handleClick}>
        <button type="button"
                className={cardDeleteButtonClassName}
                onClick={handleDelete}>
        </button>
      </div>
      <div className="element__info">
        <p className="element__text">{card.name}</p>
        <div className="element__likes">
          <button type="button"
                  className={cardLikeButtonClassName}
                  onClick={handleLike}>
          </button>
          <span
            className="element__counter-like">{card.likes.length > 0 ? card.likes.length : ""}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
