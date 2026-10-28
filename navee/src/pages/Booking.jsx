import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MapPin, Minus, Plus, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { destinations, packages } from '../data/travelData'
import { saveBooking } from '../utils/localStorage'
import NotFound from './NotFound'

const INSURANCE_PRICE = 25

function createTravellers(count) {
  return Array.from({ length: count }, (_, index) => ({
    name: '',
    age: '',
    gender: '',
    insurance: false,
    id: index,
  }))
}

function Booking() {
  const { packageId } = useParams()
  const navigate = useNavigate()
  const travelPackage = packages.find((item) => item.id === packageId)
  const [guests, setGuests] = useState(2)
  const [travellers, setTravellers] = useState(() => createTravellers(2))
  const [form, setForm] = useState({ name: '', email: '', startDate: '', notes: '' })
  const [error, setError] = useState('')
  const destination = destinations.find((item) => item.id === travelPackage?.destinationId)
  const insuredTravellers = travellers.filter((traveller) => traveller.insurance).length
  const insuranceTotal = insuredTravellers * INSURANCE_PRICE
  const total = useMemo(
    () => (travelPackage?.price || 0) * guests + insuranceTotal,
    [travelPackage, guests, insuranceTotal],
  )
  const today = new Date().toISOString().split('T')[0]

  if (!travelPackage || !destination) return <NotFound />

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
  }

  function updateGuestCount(nextCount) {
    const safeCount = Math.max(1, Math.min(12, nextCount))
    setGuests(safeCount)
    setTravellers((current) => [
      ...current.slice(0, safeCount),
      ...createTravellers(Math.max(0, safeCount - current.length)).map((traveller, index) => ({
        ...traveller,
        id: current.length + index,
      })),
    ])
    setError('')
  }

  function updateTraveller(index, field, value) {
    setTravellers((current) => current.map((traveller, travellerIndex) => (
      travellerIndex === index ? { ...traveller, [field]: value } : traveller
    )))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (form.startDate < today) {
      setError('Choose a start date from today onwards.')
      return
    }

    const incompleteTraveller = travellers.findIndex((traveller) => (
      traveller.name.trim().length < 2 || !traveller.age || Number(traveller.age) < 1 || Number(traveller.age) > 120 || !traveller.gender
    ))
    if (incompleteTraveller !== -1) {
      setError(`Please complete the name, age and gender for traveller ${incompleteTraveller + 1}.`)
      return
    }

    const booking = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      packageId: travelPackage.id,
      packageTitle: travelPackage.title,
      destination: destination.name,
      image: travelPackage.image,
      startDate: form.startDate,
      guests,
      travellers: travellers.map((traveller) => ({
        name: traveller.name.trim(),
        age: Number(traveller.age),
        gender: traveller.gender,
        insurance: traveller.insurance,
      })),
      insuredTravellers,
      insuranceTotal,
      total,
      name: form.name.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
      createdAt: new Date().toISOString(),
    }

    try {
      saveBooking(booking)
      navigate('/my-bookings', { state: { bookingConfirmed: true } })
    } catch (saveError) {
      setError(saveError.message)
    }
  }

  return (
    <div className="container booking-page">
      <Link className="back-link" to={`/packages/${travelPackage.id}`}><ArrowLeft size={16} /> Back to your trip</Link>
      <div className="booking-heading"><span className="eyebrow"><span className="eyebrow-line" /> BOOK YOUR HOLIDAY</span><h1>Make it yours.</h1><p>Your trip is one step closer. Add each traveller and choose travel protection.</p></div>
      <div className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <div className="form-section-heading"><span className="form-step">01</span><div><h2>Booking contact</h2><p>We’ll keep your trip details together here.</p></div></div>
            <div className="form-fields">
              <label className="form-field form-field-full">Contact name<input name="name" autoComplete="name" placeholder="e.g. Alex Morgan" value={form.name} onChange={updateField} required minLength={2} /></label>
              <label className="form-field form-field-full">Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={updateField} required /></label>
            </div>
          </section>
          <section className="form-section">
            <div className="form-section-heading"><span className="form-step">02</span><div><h2>Holiday details</h2><p>Choose your dates and tell us who’s travelling.</p></div></div>
            <div className="form-fields">
              <label className="form-field">Holiday start date<span className="input-with-icon"><CalendarDays size={17} /><input name="startDate" type="date" min={today} value={form.startDate} onChange={updateField} required /></span></label>
              <div className="form-field"><span className="field-label">Number of travellers</span><div className="guest-stepper"><button type="button" aria-label="Remove one traveller" onClick={() => updateGuestCount(guests - 1)}><Minus size={16} /></button><strong>{guests} <span>{guests === 1 ? 'traveller' : 'travellers'}</span></strong><button type="button" aria-label="Add one traveller" onClick={() => updateGuestCount(guests + 1)}><Plus size={16} /></button></div></div>
            </div>
            <div className="traveller-list">
              {travellers.map((traveller, index) => (
                <fieldset className="traveller-card" key={traveller.id}>
                  <legend><span className="traveller-number">{String(index + 1).padStart(2, '0')}</span> Traveller {index + 1}</legend>
                  <div className="form-fields">
                    <label className="form-field form-field-full">Full name (as on ID)<input autoComplete="off" value={traveller.name} onChange={(event) => updateTraveller(index, 'name', event.target.value)} placeholder="Traveller’s full name" minLength={2} required /></label>
                    <label className="form-field">Age<input type="number" min="1" max="120" value={traveller.age} onChange={(event) => updateTraveller(index, 'age', event.target.value)} placeholder="Age" required /></label>
                    <label className="form-field">Gender<select value={traveller.gender} onChange={(event) => updateTraveller(index, 'gender', event.target.value)} required><option value="">Select</option><option value="female">Female</option><option value="male">Male</option><option value="non-binary">Non-binary</option><option value="prefer-not-to-say">Prefer not to say</option></select></label>
                    <label className="insurance-choice form-field-full">
                      <input type="checkbox" checked={traveller.insurance} onChange={(event) => updateTraveller(index, 'insurance', event.target.checked)} />
                      <span className="insurance-check" aria-hidden="true"><CheckCircle2 size={17} /></span>
                      <span className="insurance-copy"><strong>Add travel insurance for Traveller {index + 1}</strong><small>Trip interruption, emergency assistance and baggage cover.</small></span>
                      <span className="insurance-price">+${INSURANCE_PRICE}</span>
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
            <div className="insurance-disclaimer"><ShieldCheck size={16} /><span>Insurance is optional and charged per covered traveller. This demo shows sample coverage only; no insurance policy is issued.</span></div>
            <label className="form-field booking-notes">Anything else we should know? <span className="optional-label">Optional</span><textarea name="notes" rows="3" placeholder="Special requests or accessibility needs..." value={form.notes} onChange={updateField} /></label>
          </section>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark form-submit" type="submit">Confirm holiday booking <ArrowRight size={17} /></button>
          <p className="form-footnote"><ShieldCheck size={15} /> This demo saves your booking in this browser. No payment details needed.</p>
        </form>
        <aside className="booking-summary"><span className="booking-card-label">YOUR HOLIDAY SUMMARY</span><div className="summary-image"><img src={travelPackage.image} alt={travelPackage.title} /><span><MapPin size={13} /> {destination.name}, {destination.country}</span></div><h2>{travelPackage.title}</h2><p className="summary-subtitle">{travelPackage.subtitle}</p><div className="summary-line"><span>Trip length</span><strong>{travelPackage.duration} days</strong></div><div className="summary-line"><span>Travellers</span><strong>{guests}</strong></div><div className="summary-line"><span>Package price</span><strong>${(travelPackage.price * guests).toLocaleString()}</strong></div><div className="summary-line"><span>Travel insurance ({insuredTravellers})</span><strong>{insuranceTotal ? `+$${insuranceTotal.toLocaleString()}` : 'Not selected'}</strong></div><div className="summary-total"><span>Total trip price</span><strong>${total.toLocaleString()}</strong></div><span className="summary-note"><CheckCircle2 size={15} /> Clear pricing, no surprises.</span></aside>
      </div>
    </div>
  )
}

export default Booking
