import Header from './Header'

export default function Login({ buttonName }) {
  return (
    <>
      <Header buttonName={buttonName}></Header>
      <div className="login">
      <h2 className='login__title'>Вход</h2>
        <form className="login__form">
          <input className="login__form_input" placeholder='Email'></input>
          <input className="login__form_input" placeholder='Пароль'></input>
          <button className="login__form_submit" type="submit">Войти</button>
        </form>
      </div>
    </>
  )
}
