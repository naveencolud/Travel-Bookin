import { Camera, Compass, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark"><Compass size={20} /></span>
            <span className="brand-name">navee <span>my trip</span></span>
          </Link>
          <p>Go a little further. Come back with a story.</p>
        </div>
        <div className="footer-links">
          <Link to="/destinations">Explore destinations</Link>
          <Link to="/my-bookings">My trips</Link>
          <a href="mailto:support@naveemytrip.example">Get in touch</a>
        </div>
        <div className="footer-social" aria-label="Follow Navee My Trip">
          <a href="https://instagram.com" aria-label="Instagram"><Camera size={18} /></a>
          <a href="mailto:support@naveemytrip.example" aria-label="Email us"><Send size={17} /></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Navee My Trip</span>
        <span>Find a trip. Make it yours. Go.</span>
      </div>
    </footer>
  )
}

export default Footer
