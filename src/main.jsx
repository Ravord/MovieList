import './scss/main.scss'
import './scss/media.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import MovieList from './MovieList/MovieList.jsx'
import Add from './Add/Add.jsx'
import NotFound from './NotFound.jsx'

let clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
let domain = import.meta.env.VITE_AUTH0_DOMAIN

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider clientId={clientId} domain={domain} redirectUri={window.location.origin}>
        <Routes>
          <Route element={<MovieList />} path='/'></Route>
          <Route element={<Add />} path='/add'></Route>
          <Route element={<NotFound />} path='*'></Route>
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
