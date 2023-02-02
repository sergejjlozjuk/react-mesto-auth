import React from 'react'
import ReactDOM from 'react-dom/client'
import './pages/index.css'
import App from './components/App'
import reportWebVitals from './pages/reportWebVitals'
import { BrowserRouter, HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
)

reportWebVitals()
