import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found container">
      <span className="not-found-icon"><Compass size={26} /></span>
      <span className="eyebrow"><span className="eyebrow-line" /> A LITTLE OFF THE MAP</span>
      <h1>Well, this is<br />uncharted.</h1>
      <p>We couldn’t find that page. Let’s get you back to somewhere lovely.</p>
      <Link className="button button-dark" to="/"><ArrowLeft size={17} /> Back to the start</Link>
    </section>
  )
}

export default NotFound
