import { useRef, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import Navbar from '../Navbar.jsx'
import SearchForm from './SearchForm.jsx'
import AddForm from './AddForm.jsx'
import Footer from '../Footer.jsx'

export default function Add() {
  let { isAuthenticated, isLoading } = useAuth0()
  let [searchInput, setSearchInput] = useState(() => '')
  let searchInputRef = useRef()
  let [searchResults, setSearchResults] = useState(() => [])

  let [tmdbidInput, setTmdbidInput] = useState(() => '')
  let tmdbidInputRef = useRef()
  let [dateInput, setDateInput] = useState(() => null)
  let [ratingInput, setRatingInput] = useState(() => 'n/a')
  return (
    <div className='container'>
      <Navbar path='/' text='Movies' />
      {
        !isAuthenticated ?
          <div style={{ textAlign: 'center' }}>
            {!isLoading ? <><h3>Please log in</h3><h5>You are not authorized to view this page</h5></> : <h3>Loading...</h3>}
          </div>
          :
          <>
            <div className='config'>
              <SearchForm searchInput={searchInput} setSearchInput={setSearchInput} searchInputRef={searchInputRef} searchResults={searchResults} setSearchResults={setSearchResults} setTmdbidInput={setTmdbidInput} tmdbidInputRef={tmdbidInputRef} />
              <hr />
              <AddForm tmdbidInput={tmdbidInput} setTmdbidInput={setTmdbidInput} tmdbidInputRef={tmdbidInputRef} dateInput={dateInput} setDateInput={setDateInput} ratingInput={ratingInput} setRatingInput={setRatingInput} searchInputRef={searchInputRef} />
            </div>
            <Footer />
          </>
      }
    </div>
  )
}
