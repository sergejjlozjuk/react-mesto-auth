import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import '../pages/index.css'
import { api } from '../utils/Api'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import Main from './Main'
import { currentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmDeletePopup from './ConfirmDeletePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import { checkToken } from './auth'
function App() {
  const [isEditProfilePopupOpen, setIsEditProfile] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlace] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatar] = useState(false)
  const [isImagePopupOpen, setIsImage] = useState(false)
  const [isDeletePopupOpen, setIsDelete] = useState(false)
  const [isInfoPopupOpen, setIsInfo] = useState(false)
  const [currentUser, setCurrenUser] = useState(false)
  const [cards, setCards] = useState([])
  const [confirmedDeleteCard, setConfirmDeleteCard] = useState({})
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const history = useHistory()
  function handleConfirmDelete() {
    handleCardDelete(confirmedDeleteCard)
  }
  function handleEditPlaceClick() {
    setIsAddPlace(!isAddPlacePopupOpen)
  }
  function handleEditAvatarClick() {
    setIsEditAvatar(!isEditAvatarPopupOpen)
  }
  function handleEditProfileClick() {
    setIsEditProfile(!isEditProfilePopupOpen)
  }
  function handleTrashClick(card) {
    setConfirmDeleteCard(card)
    setIsDelete(!isDeletePopupOpen)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImage(true)
  }
  function closeAllPopups() {
    setIsAddPlace(false)
    setIsEditAvatar(false)
    setIsEditProfile(false)
    setIsImage(false)
    setIsDelete(false)
    setIsInfo(false)
  }
  function handleCloseClickOverlay(e) {
    const elem = e.target.classList
    if (elem.contains('popup__close') || elem.contains('popup_active')) {
      closeAllPopups()
    }
  }
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then(
        (res) =>
          setCurrenUser({
            ...currentUser,
            name: res.name,
            about: res.about,
          }),
        closeAllPopups(),
      )
      .catch((err) => console.log(err))
  }
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((userData) => {
        closeAllPopups()
        setCurrenUser(userData)
      })
      .catch((err) => console.log(err))
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)
    if (isLiked) {
      api
        .deleteCardLike(card)
        .then((res) => {
          setCards(
            cards.map((c) => {
              return c._id === card._id ? res : c
            }),
          )
        })
        .catch((err) => console.log(err))
    } else {
      api
        .setCardLike(card)
        .then((res) => {
          setCards(
            cards.map((c) => {
              return c._id === card._id ? res : c
            }),
          )
        })
        .catch((err) => console.log(err))
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then((res) => {
        setCards(
          cards.filter((c) => {
            return c._id !== card._id
          }),
        )
        closeAllPopups()
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  function handleAddPlaceSubmit(data) {
    api
      .setCard(data)
      .then((newCard) => {
        closeAllPopups()
        setCards([newCard, ...cards])
      })
      .catch((err) => console.log(err))
  }
  function handleAuthorization() {
    if (localStorage.token) {
      checkToken(localStorage.getItem('token'))
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return
        })
        .then((res) => {
          setEmail(res.data.email)
        })
        .catch((err) => console.log(err))
      setLoggedIn(true)
      history.push('/')
      return
    }
  }
  function signOut() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    history.push('/sign-in')
  }
  const isOpen =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isImagePopupOpen ||
    isDeletePopupOpen ||
    isInfoPopupOpen
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => setCards(res))
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => setCurrenUser(res))
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    handleAuthorization()
  })
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape)
    }
    return () => {
      document.removeEventListener('keydown', closeByEscape)
    }
  }, [isOpen])
  return (
    <currentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-in">
          <Login
            buttonName={'Регистрация'}
            setLoggedIn={setLoggedIn}
            isOpen={isInfoPopupOpen}
            setIsInfo={setIsInfo}
            onClose={handleCloseClickOverlay}
          ></Login>
        </Route>
        <Route path="/sign-up">
          <Register
            buttonName={'Войти'}
            isOpen={isInfoPopupOpen}
            setIsInfo={setIsInfo}
            onClose={handleCloseClickOverlay}
          ></Register>
        </Route>
        <ProtectedRoute
          email={email}
          signOut={signOut}
          loggedIn={loggedIn}
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleEditPlaceClick}
          onCardClick={handleCardClick}
          onTrashClick={handleTrashClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
      </Switch>
      <ConfirmDeletePopup
        isOpen={isDeletePopupOpen}
        onClose={handleCloseClickOverlay}
        onConfirmDelete={handleConfirmDelete}
      ></ConfirmDeletePopup>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseClickOverlay}
        onUpdateUser={handleUpdateUser}
      ></EditProfilePopup>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseClickOverlay}
        onAddPlace={handleAddPlaceSubmit}
      ></AddPlacePopup>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseClickOverlay}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={handleCloseClickOverlay}
      />
      <Footer />
    </currentUserContext.Provider>
  )
}

export default App
