import { ArrowUpRight, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

function DestinationCard({ destination, compact = false }) {
  return (
    <Link
      className={`destination-card${compact ? ' destination-card-compact' : ''}`}
      to={`/destinations?search=${encodeURIComponent(destination.name)}`}
    >
      <img src={destination.image} alt={`${destination.name}, ${destination.country}`} loading="lazy" />
      <span className="destination-overlay" />
      <span className="destination-card-content">
        <span className="destination-meta"><MapPin size={13} /> {destination.country}</span>
        <span className="destination-name-row">
          <span className="destination-name">{destination.name}</span>
          <span className="destination-rating"><Star size={13} fill="currentColor" /> {destination.rating}</span>
        </span>
      </span>
      <span className="destination-arrow"><ArrowUpRight size={17} /></span>
    </Link>
  )
}

export default DestinationCard
