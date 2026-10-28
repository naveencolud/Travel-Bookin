import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import PackageCard from '../components/PackageCard'
import { destinations, packages } from '../data/travelData'

function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [region, setRegion] = useState('All places')
  const [sort, setSort] = useState('Featured')
  const regions = ['All places', ...new Set(destinations.map((destination) => destination.region))]

  const filteredDestinations = useMemo(() => {
    const term = search.trim().toLowerCase()
    const matches = destinations.filter((destination) => {
      const matchesSearch = !term || `${destination.name} ${destination.country} ${destination.region}`.toLowerCase().includes(term)
      return matchesSearch && (region === 'All places' || destination.region === region)
    })
    return sort === 'Price: low to high'
      ? [...matches].sort((a, b) => a.startingPrice - b.startingPrice)
      : sort === 'Top rated'
        ? [...matches].sort((a, b) => b.rating - a.rating)
        : matches
  }, [search, region, sort])

  const filteredPackages = useMemo(
    () => packages.filter((travelPackage) => filteredDestinations.some((destination) => destination.id === travelPackage.destinationId)),
    [filteredDestinations],
  )

  function updateSearch(value) {
    setSearch(value)
    if (value) setSearchParams({ search: value }, { replace: true })
    else setSearchParams({}, { replace: true })
  }

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="eyebrow eyebrow-light"><span className="eyebrow-line" /> THE WORLD IS WIDE OPEN</span>
          <h1>Find your somewhere.</h1>
          <p>Big-name cities, quiet corners and all the good bits in between.</p>
          <div className="banner-decoration">GO<br />FARTHER<span>↗</span></div>
        </div>
      </section>
      <section className="container listing-section">
        <div className="listing-toolbar">
          <label className="listing-search"><Search size={18} /><input value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Search a place or country" aria-label="Search destinations" />{search && <button type="button" onClick={() => updateSearch('')} aria-label="Clear search"><X size={16} /></button>}</label>
          <div className="filter-controls">
            <label className="filter-select"><SlidersHorizontal size={16} /><span className="sr-only">Filter by region</span><select value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="filter-select"><span className="sr-only">Sort destinations</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Top rated</option><option>Price: low to high</option></select></label>
          </div>
        </div>
        <div className="results-caption"><span>{filteredDestinations.length} lovely places to start</span><span>Make it your kind of trip <ArrowUpRight size={15} /></span></div>
        {filteredDestinations.length > 0 ? (
          <div className="destination-grid listing-grid">{filteredDestinations.map((destination) => <DestinationCard key={destination.id} destination={destination} />)}</div>
        ) : (
          <div className="empty-state"><span className="empty-icon"><Search size={22} /></span><h2>No places found just yet.</h2><p>Try a different search or open up the region filter.</p><button className="button button-dark" onClick={() => { updateSearch(''); setRegion('All places') }}>Clear filters</button></div>
        )}
      </section>
      {filteredPackages.length > 0 && (
        <section className="container section destination-packages">
          <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> READY WHEN YOU ARE</span><h2>Trips for this mood.</h2></div><Link className="text-link" to="/my-bookings">Your bookings <ArrowUpRight size={16} /></Link></div>
          <div className="package-grid">{filteredPackages.map((travelPackage) => <PackageCard key={travelPackage.id} travelPackage={travelPackage} />)}</div>
        </section>
      )}
    </>
  )
}

export default Destinations
