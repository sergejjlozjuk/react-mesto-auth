import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { regisration } from './auth'
import Header from './Header'
import InfoTooltip from './InfoTooltip'
import canceled from '../images/canceled.svg'
import confirmed from '../images/confirmed.svg'

export default function Register({ buttonName, isOpen, onClose, setIsInfo }) {
  const history = useHistory()
  const [data, setData] = React.useState({
    email: '',
    password: '',
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
    history.push('/sign-in')
  }
  function handleSubmit(e) {
    e.preventDefault()
    regisration(data)
      .then((res) => {
        console.log(res.ok)
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
        if (res) {
          setDataInfoPopup({
            text: 'Вы успешно зарегистрировались!',
            image: confirmed,
          })
          setIsInfo(true)
          history.push('/sign-in')
        }
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
        <h2 className="login__title">Регистрация</h2>
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
            Зарегистрироваться
          </button>
        </form>
        <Link className="login__link" to={'/sign-in'}>
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  )
}
