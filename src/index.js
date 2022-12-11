import React from 'react'
import ReactDOM from 'react-dom/client'
import './pages/index.css'
import App from './components/App'
import reportWebVitals from './pages/reportWebVitals'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path='/sing-in'>
          <Login buttonName={'Регистрация'} ></Login>
        </Route>
        <Route path='/sing-up'>
          <Register buttonName={'Войти'}></Register>
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
)

reportWebVitals()
