import { ArrowUpRight, CalendarDays, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

function PackageCard({ travelPackage }) {
  return (
    <article className="package-card">
      <Link className="package-image-link" to={`/packages/${travelPackage.id}`} aria-label={`View ${travelPackage.title}`}>
        <img src={travelPackage.image} alt={travelPackage.title} loading="lazy" />
        <span className="package-category">{travelPackage.category}</span>
        <span className="package-image-arrow"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="package-card-body">
        <div className="package-rating"><Star size={14} fill="currentColor" /> {travelPackage.rating} <span>({travelPackage.reviews} reviews)</span></div>
        <Link className="package-title" to={`/packages/${travelPackage.id}`}>{travelPackage.title}</Link>
        <p className="package-subtitle">{travelPackage.subtitle}</p>
        <div className="package-card-bottom">
          <span className="package-duration"><CalendarDays size={15} /> {travelPackage.duration} days</span>
          <span className="package-price"><strong>${travelPackage.price.toLocaleString()}</strong> <small>/ person</small></span>
        </div>
      </div>
    </article>
  )
}

export default PackageCard
