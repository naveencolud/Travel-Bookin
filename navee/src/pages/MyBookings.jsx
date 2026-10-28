import { ArrowRight, CalendarDays, CheckCircle2, MapPin, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { deleteBooking, getBookings } from '../utils/localStorage'

function MyBookings() {
  const location = useLocation()
  const [initialState] = useState(() => {
    try {
      return { bookings: getBookings(), error: '' }
    } catch (loadError) {
      return { bookings: [], error: loadError.message }
    }
  })
  const [bookings, setBookings] = useState(initialState.bookings)
  const [error, setError] = useState(initialState.error)
  const [showConfirmation, setShowConfirmation] = useState(Boolean(location.state?.bookingConfirmed))

  function removeBooking(bookingId) {
    try {
      setBookings(deleteBooking(bookingId))
      setError('')
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <div className="container my-bookings-page">
      <div className="bookings-heading"><span className="eyebrow"><span className="eyebrow-line" /> YOUR LITTLE GETAWAYS</span><h1>Trips with your name on them.</h1><p>Everything you’ve saved for the journey ahead, all in one place.</p></div>
      {location.state?.welcome && <div className="confirmation-banner" role="status"><CheckCircle2 size={20} /><span><strong>Welcome to Navee My Trip!</strong> You’re signed in on this browser.</span></div>}
      {showConfirmation && <div className="confirmation-banner" role="status"><CheckCircle2 size={20} /><span><strong>It’s happening!</strong> Your trip is saved. You can find it right here whenever you need it.</span><button type="button" aria-label="Dismiss confirmation" onClick={() => setShowConfirmation(false)}>×</button></div>}
      {error && <p className="form-error" role="alert">{error}</p>}
      {bookings.length ? <div className="saved-bookings">{bookings.map((booking) => (
        <article className="saved-booking-card" key={booking.id}>
          <img className="saved-booking-image" src={booking.image} alt={booking.packageTitle} />
          <div className="saved-booking-info"><span className="saved-booking-status"><CheckCircle2 size={14} /> SAVED IN THIS BROWSER</span><h2>{booking.packageTitle}</h2><span className="saved-booking-location"><MapPin size={14} /> {booking.destination}</span><div className="saved-booking-meta"><span><CalendarDays size={15} /> {booking.startDate ? new Date(`${booking.startDate}T00:00:00`).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date to be decided'}</span><span>{booking.guests} {booking.guests === 1 ? 'traveller' : 'travellers'}</span></div><p className="saved-booking-email">{booking.name} · {booking.email}</p>{booking.travellers?.length > 0 && <p className="saved-traveller-details">Travellers: {booking.travellers.map((traveller) => traveller.name).join(', ')}{booking.insuredTravellers > 0 ? ` · ${booking.insuredTravellers} insured` : ' · No insurance selected'}</p>}</div>
          <div className="saved-booking-end"><div><span>Total trip price</span><strong>${Number(booking.total).toLocaleString()}</strong></div><button className="remove-booking" type="button" onClick={() => removeBooking(booking.id)}><Trash2 size={15} /> Remove</button></div>
        </article>
      ))}</div> : <div className="empty-state bookings-empty"><span className="empty-icon"><CalendarDays size={22} /></span><h2>Your next story is still unwritten.</h2><p>Find a place you love and your saved trips will show up here.</p><Link className="button button-dark" to="/destinations">Explore destinations <ArrowRight size={17} /></Link></div>}
      <div className="local-storage-note"><CheckCircle2 size={15} /> Your bookings are stored only in this browser. They aren’t sent to a server.</div>
    </div>
  )
}

export default MyBookings
