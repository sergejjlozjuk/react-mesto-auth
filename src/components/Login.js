import React from 'react'
import { useHistory } from 'react-router-dom'
import { authorization } from './auth'
import Header from './Header'
import InfoTooltip from './InfoTooltip'
import canceled from '../images/canceled.svg'

export default function Login({
  buttonName,
  setLoggedIn,
  isOpen,
  onClose,
  setIsInfo,
}) {
  const history = useHistory()
  const [data, setData] = React.useState({
    email: '',
    passsword: '',
  })
  const [dataInfoPopup, setDataInfoPopup] = React.useState({
    text: '',
    image: '',
  })
  function handleChange(e) {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }
  function handleClick() {
    return history.push('/sign-up')
  }
  function handleSubmit(e) {
    e.preventDefault()
    authorization(data)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          setDataInfoPopup({
            text: 'Что-то пошло не так!Попробуйте ещё раз.',
            image: canceled,
          })
          setIsInfo(true)
        }
      })
      .then((res) => {
        localStorage.setItem('token', res.token)
        setLoggedIn(true)
        history.goForward('/')
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <Header buttonName={buttonName} handleClick={handleClick}></Header>
      <InfoTooltip
        info={dataInfoPopup}
        isOpen={isOpen}
        onClose={onClose}
      ></InfoTooltip>
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__form_input"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            className="login__form_input"
            placeholder="Пароль"
            name="password"
            onChange={handleChange}
          ></input>
          <button className="login__form_submit" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  )
}
