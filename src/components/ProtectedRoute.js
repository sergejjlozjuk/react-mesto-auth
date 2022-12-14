import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from './Header'

 const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
    <Header buttonName={'Выйти'} handleClick={props.signOut} email={props.email}></Header>
    {props.loggedIn ? <Component {...props}></Component>:<Redirect to={'/sign-in'}></Redirect>}
  </Route>
  )
}
export default ProtectedRoute