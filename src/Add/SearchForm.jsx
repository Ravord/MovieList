import axios from 'axios'

import SearchResults from './SearchResults.jsx'

export default function SearchForm({ searchInput, setSearchInput, searchInputRef, searchResults, setSearchResults, setTmdbidInput, tmdbidInputRef }) {
  async function search(e) {
    e.preventDefault()
    if (searchInput) {
      let { data: movies } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search?query=${searchInput}`)
      setSearchResults(movies)
      setSearchInput('')
    }
    else {
      setSearchResults([])
    }
    searchInputRef.current.focus()
  }
  return (
    <>
      <form onSubmit={search}>
        <input autoFocus className='input searchInput' onChange={(e) => setSearchInput(e.target.value)} placeholder='Search for a movie...' ref={searchInputRef} type='text' value={searchInput} />
        <button className='btn' type='submit'>Search</button>
      </form>
      {
        searchResults.length ? <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} setTmdbidInput={setTmdbidInput} tmdbidInputRef={tmdbidInputRef} /> : null
      }
    </>
  )
}
