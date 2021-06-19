import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-cover" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="картинка - аватар пользователя" className="profile__avatar"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button"
                  aria-label="add"
                  className="profile__button-edit"
                  onClick={props.onEditProfile}>
          </button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button type="button"
                aria-label="edit"
                className="profile__button-add"
                onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((item) => (
            <Card card={item}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  key={item._id}/>
          ))}
        </ul>
      </section>
    </main>
  )

}

export default Main;
