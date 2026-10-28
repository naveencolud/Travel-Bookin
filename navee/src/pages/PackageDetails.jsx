import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, MapPin, ShieldCheck, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { destinations, packages } from '../data/travelData'
import NotFound from './NotFound'

function PackageDetails() {
  const { packageId } = useParams()
  const travelPackage = packages.find((item) => item.id === packageId)

  if (!travelPackage) return <NotFound />

  const destination = destinations.find((item) => item.id === travelPackage.destinationId)

  return (
    <div className="container details-page">
      <Link className="back-link" to="/destinations"><ArrowLeft size={16} /> All destinations</Link>
      <div className="details-hero">
        <img src={travelPackage.image} alt={`${travelPackage.title} in ${destination.name}`} />
        <div className="details-hero-shade" />
        <div className="details-hero-copy">
          <span className="eyebrow eyebrow-light"><MapPin size={14} /> {destination.name}, {destination.country}</span>
          <h1>{travelPackage.title}</h1>
          <p>{travelPackage.subtitle}</p>
          <span className="details-rating"><Star size={15} fill="currentColor" /> {travelPackage.rating} <span>({travelPackage.reviews} traveller reviews)</span></span>
        </div>
        <span className="details-category">{travelPackage.category}</span>
      </div>
      <div className="details-layout">
        <div className="details-main">
          <div className="detail-facts"><span><CalendarDays size={19} /><strong>{travelPackage.duration} days</strong><small>Easy-going itinerary</small></span><span><Clock3 size={19} /><strong>Flexible dates</strong><small>Choose when you go</small></span><span><ShieldCheck size={19} /><strong>Thoughtfully planned</strong><small>The important bits included</small></span></div>
          <section className="details-section"><span className="eyebrow"><span className="eyebrow-line" /> THE FEELING OF IT</span><h2>A trip that feels like you.</h2><p>{travelPackage.description}</p></section>
          <section className="details-section highlights-section"><span className="eyebrow"><span className="eyebrow-line" /> THE LITTLE DETAILS</span><h2>Good things, included.</h2><ul className="highlight-list">{travelPackage.highlights.map((highlight) => <li key={highlight}><span><Check size={14} /></span>{highlight}</li>)}</ul></section>
        </div>
        <aside className="booking-card"><span className="booking-card-label">YOUR LITTLE ESCAPE</span><div className="booking-price"><strong>${travelPackage.price.toLocaleString()}</strong><span> / person</span></div><div className="booking-card-meta"><CalendarDays size={16} /> {travelPackage.duration} days <span>·</span> {travelPackage.category}</div><div className="booking-includes"><span><Check size={14} /> Carefully picked stays</span><span><Check size={14} /> Local experiences</span><span><Check size={14} /> No hidden fees</span></div><Link className="button button-dark booking-cta" to={`/booking/${travelPackage.id}`}>Make it yours <ArrowRight size={17} /></Link><p className="booking-card-note">Your dates, your pace. No payment needed here.</p></aside>
      </div>
      <section className="details-destination"><div><span className="eyebrow"><span className="eyebrow-line" /> A LITTLE MORE ABOUT {destination.name.toUpperCase()}</span><h2>{destination.description}</h2></div><Link className="text-link" to={`/destinations?search=${destination.name}`}>Explore {destination.name} <ArrowRight size={16} /></Link></section>
    </div>
  )
}

export default PackageDetails
