import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Booking from './pages/Booking'
import Destinations from './pages/Destinations'
import Home from './pages/Home'
import Login from './pages/Login'
import MyBookings from './pages/MyBookings'
import NotFound from './pages/NotFound'
import PackageDetails from './pages/PackageDetails'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/packages/:packageId" element={<PackageDetails />} />
            <Route path="/booking/:packageId" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
