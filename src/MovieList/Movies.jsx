import React, { useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'

import getReleaseYear from '../getReleaseYear.js'

export default function Movies({ movies, setIsLoadingMovies, setMovies, sortMovies, user }) {
  useEffect(async () => {
    setIsLoadingMovies(true)
    let { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, {
      email: user.email
    })
    sortMovies(data, 'date', 'desc')
    setIsLoadingMovies(false)
  }, [])
  async function changeDate(date, tmdb_id) {
    setMovies(movies.map((movie) => {
      if (movie.tmdb_id === tmdb_id) {
        return { ...movie, date: date }
      }
      return movie
    }))
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/update`, {
      date: date,
      tmdb_id: tmdb_id
    })
  }
  async function changeRating(rating, tmdb_id) {
    setMovies(movies.map((movie) => {
      if (movie.tmdb_id === tmdb_id) {
        return { ...movie, rating: rating }
      }
      return movie
    }))
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/update`, {
      rating: rating,
      tmdb_id: tmdb_id
    })
  }
  async function deleteMovie(tmdb_id) {
    let isUserSure = confirm(`Delete movie #${tmdb_id}?`)
    if (isUserSure) {
      setMovies(movies.filter((movie) => movie.tmdb_id !== tmdb_id))
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/remove`, {
        data: {
          tmdb_id: tmdb_id
        }
      })
    }
    return
  }
  return (
    movies.map(({ date, imdb_id, overview, poster_path, rating, release_date, title, tmdb_id }) => {
      return <React.Fragment key={tmdb_id}>
        <div className='table-item img'>
          {
            poster_path ? <a href={`https://image.tmdb.org/t/p/original${poster_path}`}>
              <img src={`https://image.tmdb.org/t/p/w154${poster_path}`} />
            </a> : <a>n/a</a>
          }
        </div>
        <div className='table-item id'>
          <a>
            <span>{tmdb_id}</span>
            <i className='icon-trash' onClick={() => deleteMovie(tmdb_id)}></i>
          </a>
        </div>
        <div className='table-item date'>
          <a>
            <DatePicker
              className='input dateInput'
              dateFormat='yyyy-MM-dd'
              onChange={(date) => changeDate(date, tmdb_id)}
              placeholderText={!date ? 'n/a' : null}
              popperPlacement='bottom'
              selected={date ? new Date(date) : null}
              type='date'
            />
          </a>
        </div>
        <div className='table-item name'><a href={imdb_id ? `https://www.imdb.com/title/${imdb_id}` : `https://www.themoviedb.org/movie/${tmdb_id}`} title={overview}>{release_date ? `${title} ${getReleaseYear(release_date, true)}` : title}</a></div>
        <div className='table-item rating'><a>
          <select className='input ratingInput' onChange={(e) => changeRating(e.target.value, tmdb_id)} value={rating}>
            <option value='n/a'>n/a</option>
            <option value='10'>10</option>
            <option value='9'>9</option>
            <option value='8'>8</option>
            <option value='7'>7</option>
            <option value='6'>6</option>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
        </a></div>
      </React.Fragment>
    })
  )
}
