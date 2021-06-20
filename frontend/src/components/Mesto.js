import React, {useState, useEffect} from "react";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";

function Mesto(props) {

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [isReadyData, setIsReadyData] = useState(false);


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);


  useEffect(() => {
    props.onHandler(props.email, '', 'Выйти');
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(data => {
        const [userInfo, cards] = data;
        setCurrentUser(userInfo.data);
        setCards(cards.data);
        setIsReadyData(true);
      })
      .catch((error) => console.log("Ошибка загрузки данных с сервера", error));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((error) => console.log("Ошибка загрузки данных с сервера", error));
  }

  function handleCardDelete(cardID) {
    api.deleteCards(cardID)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== cardID));
        closeAllPopups();
      })
      .catch((error) => console.log("Ошибка загрузки данных с сервера", error));
  }

  function handleCardClick(card, evt) {
    if (evt.target === evt.currentTarget) {
      setSelectedCard(card);
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCardToDelete(card);
    setIsDeletePopup(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopup(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(response => {
        setCurrentUser(response.data);
        closeAllPopups()
      })
      .catch((error) => console.log("Ошибка загрузки данных с сервера", error));
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(response => {
        setCurrentUser(response.data);
        closeAllPopups()
      })
      .catch((error) => console.log("Ошибка загрузки данных с сервера", error));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then(response => {
        setCards([response.data, ...cards]);
        closeAllPopups()
      })
      .catch((error) => console.log("Ошибка загрузки данных с сервера", error));
  }

  if(!isReadyData) {
    return null;
  } else {

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}/>
        <Footer/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddCard={handleAddPlaceSubmit}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}/>

        <DeletePopup isOpen={isDeletePopup}
                     onClose={closeAllPopups}
                     onDeleteCard={handleCardDelete}
                     cardID={selectedCardToDelete}
        />

        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}/>

      </CurrentUserContext.Provider>
    );
  }
}

export default Mesto;
