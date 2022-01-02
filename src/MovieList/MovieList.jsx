import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { firstBy } from 'thenby'

import Navbar from '../Navbar.jsx'
import Movies from './Movies.jsx'
import Footer from '../Footer.jsx'

export default function MovieList() {
  let { isAuthenticated, isLoading, user } = useAuth0()
  let [movies, setMovies] = useState(() => [])
  let [sortingState, setSortingState] = useState(() => ({ tmdb_id: null, date: null, title: null, rating: null }))
  let refreshObj = {
    refresh: async () => {
      let { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, {
        email: user.email
      })
      let currentSorting
      for (let key in sortingState) {
        if (sortingState[key]) {
          currentSorting = { type: key, order: sortingState[key] }
        }
      }
      sortMovies(data, currentSorting.type, currentSorting.order)
    },
    show: true
  }
  function sortMovies(arr, property, order) {
    let sortedData
    switch (property) {
      case ('tmdb_id'):
        if (order === 'asc') {
          sortedData = arr.sort((a, b) => a.tmdb_id - b.tmdb_id)
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, tmdb_id: 'asc' }))
        }
        else if (order === 'desc') {
          sortedData = arr.sort((a, b) => b.tmdb_id - a.tmdb_id)
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, tmdb_id: 'desc' }))
        }
        setSortingState((prev) => ({ ...prev, date: null, title: null, rating: null }))
        break;
      case ('date'):
        if (order === 'asc') {
          sortedData = arr.sort(firstBy('date', 'asc').thenBy('createdAt', 'desc'))
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, date: 'asc' }))
        }
        else if (order === 'desc') {
          sortedData = arr.sort(firstBy('date', 'desc').thenBy('createdAt', 'asc'))
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, date: 'desc' }))
        }
        setSortingState((prev) => ({ ...prev, tmdb_id: null, title: null, rating: null }))
        break;
      case ('title'):
        if (order === 'asc') {
          sortedData = arr.sort(firstBy((a, b) => a.title.localeCompare(b.title)).thenBy('createdAt', 'desc'))
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, title: 'asc' }))
        }
        else if (order === 'desc') {
          sortedData = arr.sort(firstBy((a, b) => b.title.localeCompare(a.title)).thenBy('createdAt', 'asc'))
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, title: 'desc' }))
        }
        setSortingState((prev) => ({ ...prev, tmdb_id: null, date: null, rating: null }))
        break;
      case ('rating'):
        if (order === 'asc') {
          sortedData = arr.sort(firstBy((a, b) => {
            let aNum = parseInt(a.rating); let bNum = parseInt(b.rating)
            if (isNaN(aNum)) aNum = 0; if (isNaN(bNum)) bNum = 0
            return aNum - bNum
          }).thenBy('createdAt', 'desc'))
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, rating: 'asc' }))
        }
        else if (order === 'desc') {
          sortedData = arr.sort(firstBy((a, b) => {
            let aNum = parseInt(a.rating); let bNum = parseInt(b.rating)
            if (isNaN(aNum)) aNum = 0; if (isNaN(bNum)) bNum = 0
            return bNum - aNum
          }).thenBy('createdAt', 'asc'))
          setMovies(sortedData)
          setSortingState((prev) => ({ ...prev, rating: 'desc' }))
        }
        setSortingState((prev) => ({ ...prev, tmdb_id: null, date: null, title: null }))
    }
    return sortedData
  }
  function ratedLength(arr) {
    let rated = arr.filter((movie) => movie.rating !== 'n/a')
    return rated.length
  }
  function averageScore(arr) {
    let sum = arr.reduce((acc, elem) => {
      if (elem.rating === 'n/a') return acc
      return acc + parseInt(elem.rating)
    }, 0)
    let avg = sum / ratedLength(arr)
    if (isNaN(avg)) avg = 0
    return avg.toFixed(2)
  }
  return (
    <div className='container'>
      <Navbar path='/add' text='Add' refreshObj={isAuthenticated ? refreshObj : null} />
      {
        !isAuthenticated ?
          <div style={{ textAlign: 'center' }}>
            {!isLoading ? <><h3>Please log in</h3><h5>You are not authorized to view this page</h5></> : <h3>Loading...</h3>}
          </div>
          :
          <>
            <div className='table'>
              <div className='table-header not-allowed'>IMG</div>
              <div className='table-header' onClick={() => sortMovies([...movies], 'tmdb_id', !sortingState.tmdb_id || sortingState.tmdb_id === 'desc' ? 'asc' : 'desc')}>
                #<i className={sortingState.tmdb_id ? sortingState.tmdb_id === 'asc' ? 'icon-caret-up' : 'icon-caret-down' : null}></i>
              </div>
              <div className='table-header' onClick={() => sortMovies([...movies], 'date', !sortingState.date || sortingState.date === 'asc' ? 'desc' : 'asc')}>
                Date<i className={sortingState.date ? sortingState.date === 'asc' ? 'icon-caret-up' : 'icon-caret-down' : null}></i>
              </div>
              <div className='table-header' onClick={() => sortMovies([...movies], 'title', !sortingState.title || sortingState.title === 'desc' ? 'asc' : 'desc')}>
                Name<i className={sortingState.title ? sortingState.title === 'asc' ? 'icon-caret-up' : 'icon-caret-down' : null}></i>
              </div>
              <div className='table-header' onClick={() => sortMovies([...movies], 'rating', !sortingState.rating || sortingState.rating === 'asc' ? 'desc' : 'asc')}>
                Rating<i className={sortingState.rating ? sortingState.rating === 'asc' ? 'icon-caret-up' : 'icon-caret-down' : null}></i>
              </div>
              <Movies movies={movies} setMovies={setMovies} sortMovies={sortMovies} user={user} />
            </div>
            <div className="stats">
              {movies.length ? <p>Watched: <b>{movies.length}</b></p> : null}
              {ratedLength(movies) >= 2 ? <p>Mean Score: <b>{averageScore(movies)}</b></p> : null}
            </div>
          </>
      }
      {
        isAuthenticated && !isLoading && !movies.length ?
          <div style={{ textAlign: 'center' }}>
            <h3>No movies found</h3>
            <h5>Try adding a few</h5>
          </div> : null
      }
      {movies.length ? <Footer /> : null}
    </div>
  )
}
