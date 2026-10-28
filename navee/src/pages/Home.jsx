import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import PackageCard from '../components/PackageCard'
import { destinations, packages } from '../data/travelData'

function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()
    navigate(`/destinations${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`)
  }

  return (
    <>
      <section className="hero">
        <img className="hero-image" src="/image/home1.jpg" alt="A beautiful travel destination at golden hour" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light"><Sparkles size={14} /> YOUR NEXT STORY STARTS HERE</span>
            <h1>Somewhere new<br />is calling<span className="hero-dot">.</span></h1>
            <p>Thoughtful trips, made for the way you want to see the world.</p>
            <a className="hero-scroll" href="#discover"><span><ArrowDown size={16} /></span> Scroll to explore</a>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon"><Compass size={20} /></span>
            <span><strong>More than a getaway</strong><small>Find a place that stays with you.</small></span>
          </div>
          <div className="hero-index"><span>01</span> <i /> 03</div>
        </div>
        <form className="search-bar container" onSubmit={handleSearch}>
          <label className="search-field">
            <Search size={19} />
            <span className="search-input-wrap"><span>Where to?</span><input aria-label="Search destinations" placeholder="Try Paris, Rome, India..." value={search} onChange={(event) => setSearch(event.target.value)} /></span>
          </label>
          <span className="search-divider" />
          <div className="search-prompt"><span className="search-prompt-label">YOUR NEXT ADVENTURE</span><strong>It’s closer than you think.</strong></div>
          <button className="button button-dark search-submit" type="submit">Explore trips <ArrowRight size={17} /></button>
        </form>
      </section>

      <section className="container section discover-section" id="discover">
        <div className="section-heading">
          <div><span className="eyebrow"><span className="eyebrow-line" /> A WORLD OF POSSIBILITIES</span><h2>Places to fall<br className="mobile-break" /> a little in love with.</h2></div>
          <Link className="text-link" to="/destinations">All destinations <ArrowUpRight size={16} /></Link>
        </div>
        <div className="destination-grid">
          {destinations.slice(0, 4).map((destination) => <DestinationCard key={destination.id} destination={destination} />)}
        </div>
      </section>

      <section className="experience-band">
        <div className="container experience-inner">
          <div className="experience-copy">
            <span className="eyebrow eyebrow-light">A BETTER WAY TO GET AWAY</span>
            <h2>Less planning.<br />More <em>being there.</em></h2>
            <p>Hand-picked stays and local experiences, brought together into trips you’ll remember long after you unpack.</p>
            <Link className="button button-light" to="/destinations">Find your kind of trip <ArrowRight size={17} /></Link>
          </div>
          <div className="experience-photo">
            <img src="/image/Wall.jpg" alt="Colourful street architecture waiting to be explored" loading="lazy" />
            <span className="photo-caption"><span className="photo-caption-dot" /> GOOD DAYS, JUST AROUND THE CORNER</span>
          </div>
          <div className="experience-stamp"><span>TAKE<br />THE<br />SCENIC<br />ROUTE</span><ArrowUpRight size={18} /></div>
        </div>
      </section>

      <section className="container section package-section">
        <div className="section-heading">
          <div><span className="eyebrow"><span className="eyebrow-line" /> HOLIDAYS, ALREADY SORTED</span><h2>Holiday packages.</h2></div>
          <Link className="text-link" to="/destinations">See all trips <ArrowUpRight size={16} /></Link>
        </div>
        <div className="package-grid">
          {packages.slice(0, 3).map((travelPackage) => <PackageCard key={travelPackage.id} travelPackage={travelPackage} />)}
        </div>
      </section>

      <section className="container promise-row">
        <div className="promise-item"><span className="promise-icon"><Compass size={19} /></span><span><strong>Picked with purpose</strong><small>Places we’d send our own people.</small></span></div>
        <div className="promise-item"><span className="promise-icon"><ShieldCheck size={19} /></span><span><strong>Easy, all the way</strong><small>Clear details. No guesswork.</small></span></div>
        <div className="promise-item"><span className="promise-icon"><Sparkles size={19} /></span><span><strong>Room to make it yours</strong><small>Every trip starts with you.</small></span></div>
      </section>
    </>
  )
}

export default Home
