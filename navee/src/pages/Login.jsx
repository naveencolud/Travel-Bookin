import { ArrowRight, Compass, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { saveUser } from '../utils/localStorage'

function Login() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const user = {
      name: isSignUp ? form.name.trim() : form.email.split('@')[0],
      email: form.email.trim().toLowerCase(),
    }

    try {
      saveUser(user)
      navigate('/my-bookings', { state: { welcome: true } })
    } catch (saveError) {
      setError(saveError.message)
    }
  }

  return (
    <div className="login-page">
      <section className="login-art">
        <img src="/image/home1.jpg" alt="A scenic holiday destination" />
        <div className="login-art-shade" />
        <Link className="login-brand" to="/"><span className="brand-mark"><Compass size={21} /></span><span className="brand-name">navee <span>my trip</span></span></Link>
        <div className="login-art-copy"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" /> YOUR NEXT CHAPTER</span><h1>More trips.<br />More stories.</h1><p>Pick up where your next adventure begins.</p></div>
        <span className="login-art-caption">SEE THE WORLD YOUR WAY</span>
      </section>
      <section className="login-panel">
        <div className="login-card">
          <span className="eyebrow"><span className="eyebrow-line" /> {isSignUp ? 'A NEW ADVENTURE STARTS HERE' : 'WELCOME BACK, TRAVELLER'}</span>
          <h1>{isSignUp ? 'Create your account.' : 'Login to your account.'}</h1>
          <p className="login-intro">Save your trips, keep traveller details together and get ready to go.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            {isSignUp && <label className="form-field">Full name<input name="name" autoComplete="name" value={form.name} onChange={updateField} placeholder="Your name" minLength={2} required /></label>}
            <label className="form-field">Email address<input name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /></label>
            <label className="form-field">Password<input name="password" type="password" autoComplete={isSignUp ? 'new-password' : 'current-password'} value={form.password} onChange={updateField} placeholder="At least 6 characters" minLength={6} required /></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-dark login-submit" type="submit">{isSignUp ? 'Create account' : 'Login'} <ArrowRight size={17} /></button>
          </form>
          <p className="login-switch">{isSignUp ? 'Already travelling with us?' : 'New to Navee My Trip?'} <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError('') }}>{isSignUp ? 'Login' : 'Create an account'}</button></p>
          <div className="login-demo-note"><ShieldCheck size={16} /><span><strong>Demo sign-in</strong> Account details stay in this browser. No real authentication service is connected.</span></div>
        </div>
      </section>
    </div>
  )
}

export default Login
