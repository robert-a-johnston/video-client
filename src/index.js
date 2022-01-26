import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './IOContext'

import App from './App'
import './style.css'

ReactDom.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>, 
  document.getElementById('root'),
)