import Navbar from './Navbar.jsx'

export default function NotFound() {
  return (
    <div className='container'>
      <Navbar path='/' text='Movies' />
      <div style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <h3>Not Found</h3>
      </div>
    </div>
  )
}
