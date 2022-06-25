import { useEffect, useRef } from 'react'

import getReleaseYear from '../getReleaseYear.js'

export default function SearchResults({ searchResults, setSearchResults, setTmdbidInput, tmdbidInputRef }) {
  let searchResultsRef = useRef()
  useEffect(() => searchResultsRef.current.scrollTo(0, 0), [searchResults])
  return (
    <div className='searchResults' ref={searchResultsRef}>
      <ul>
        {
          searchResults.map(({ id, overview, poster_path, release_date, title }) => {
            return <li key={id}>
              {
                poster_path ? <a href={`https://image.tmdb.org/t/p/original${poster_path}`}>
                  <img src={`https://image.tmdb.org/t/p/w154${poster_path}`} />
                </a> : <a>n/a</a>
              }
              <a className='id'>
                <span>ID:</span>
                <span>{id}</span>
                <i className='icon-plus-sign-alt' onClick={() => {
                  setSearchResults([])
                  setTmdbidInput(id)
                  tmdbidInputRef.current.focus()
                }} title='Add'></i>
              </a>
              <a className='name' href={`https://www.themoviedb.org/movie/${id}`} title={overview}>{release_date ? `${title} ${getReleaseYear(release_date, true)}` : title}</a>
            </li>
          })
        }
      </ul>
    </div>
  )
}
