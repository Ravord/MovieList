import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import DatePicker from 'react-datepicker'

export default function AddForm({ tmdbidInput, setTmdbidInput, tmdbidInputRef, dateInput, setDateInput, ratingInput, setRatingInput, searchInputRef }) {
  let { user } = useAuth0()
  async function add(e) {
    e.preventDefault()
    if (tmdbidInput) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add`, {
          date: dateInput,
          email: user.email,
          rating: ratingInput,
          tmdb_id: tmdbidInput
        })
        alert('Done')
      }
      catch (err) {
        alert(err.response.statusText)
      }
    }
    setTmdbidInput('')
    setDateInput(null)
    setRatingInput('n/a')
    searchInputRef.current.focus()
  }
  return (
    <form onSubmit={add}>
      <h2>TMDB ID<span style={{ color: 'red', margin: '0% 0.3rem', userSelect: 'none' }}>*</span></h2>
      <input className='input tmdbidInput' onChange={(e) => setTmdbidInput(e.target.value)} placeholder={`Movie's ID`} ref={tmdbidInputRef} type='text' value={tmdbidInput} />
      <h2>Date watched</h2>
      <DatePicker
        className='input dateInput'
        dateFormat='yyyy-MM-dd'
        onChange={(date) => setDateInput(date)}
        placeholderText='n/a'
        popperPlacement='bottom'
        selected={dateInput}
        type='date'
      />
      <h2>Rating</h2>
      <select className='input ratingInput' onChange={(e) => setRatingInput(e.target.value)} value={ratingInput}>
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
      <button className='btn' type='submit'>Add</button>
    </form>
  )
}
