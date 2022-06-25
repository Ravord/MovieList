import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

export default function Navbar({ path, text, refreshObj }) {
  let { isAuthenticated, isLoading, loginWithPopup, logout } = useAuth0()
  return (
    <div className='nav'>
      <Link className='nav-item' to={path}>{text}</Link>
      {refreshObj?.show ? <a className="nav-item" onClick={() => {
        refreshObj.refresh()
        alert('Refreshed')
      }} title='Refresh'><i className='icon-refresh'></i></a> : null}
      {
        !isAuthenticated ?
          <a className='nav-item' onClick={() => loginWithPopup()}>
            {!isLoading ? 'Login' : '...'}
          </a>
          :
          <a className='nav-item' onClick={() => logout()}>
            {!isLoading ? 'Logout' : '...'}
          </a>
      }
    </div>
  )
}
