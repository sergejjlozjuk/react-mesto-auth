import React from 'react'
import logo from '../images/header_logo.svg'

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Россия" />
      </header>
    )
  }
}
