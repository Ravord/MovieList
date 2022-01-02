import tmdb from './tmdb.svg'

export default function Footer() {
  return (
    <div className='footer'>
      <div className='tmdb'>
        <a href='https://themoviedb.org/'>
          <img alt='tmdb' src={tmdb} />
        </a>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb</p>
      </div>
      <div className='movielist'>
        <h1>MovieList</h1>
        <hr />
        <b>by <a href='https://github.com/Ravord/'>m_skotarek</a></b>
      </div>
    </div>
  )
}
