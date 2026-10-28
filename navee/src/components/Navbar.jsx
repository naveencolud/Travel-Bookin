import { Compass, LogIn, LogOut, Menu, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { clearUser, getUser } from '../utils/localStorage'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(getUser)
  const closeMenu = () => setMenuOpen(false)

  function handleSignOut() {
    clearUser()
    setUser(null)
    closeMenu()
  }

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Navee My Trip home">
          <span className="brand-mark"><Compass size={21} strokeWidth={2.2} /></span>
          <span className="brand-name">navee <span>my trip</span></span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/destinations" onClick={closeMenu}>Destinations</NavLink>
          <NavLink to="/my-bookings" onClick={closeMenu}>My trips</NavLink>
          {user ? (
            <button className="nav-account" type="button" onClick={handleSignOut}><UserRound size={15} /> {user.name.split(' ')[0]} <LogOut size={14} /><span className="sr-only">Sign out</span></button>
          ) : (
            <Link className="nav-cta" to="/login" onClick={closeMenu}><LogIn size={15} /> Login / Sign up</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
