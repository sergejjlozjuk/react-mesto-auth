import React from 'react'
import logo from '../images/header_logo.svg'

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Россия" />
        <div className="header__container">
          <span className="header__email">{this.props.email}</span>
          <button className="header__button" onClick={this.props.handleClick}>
            {this.props.buttonName}
          </button>
        </div>
      </header>
    )
  }
}
