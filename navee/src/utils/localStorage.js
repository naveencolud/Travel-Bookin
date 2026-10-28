const BOOKINGS_KEY = 'wanderly-bookings'
const USER_KEY = 'navee-my-trip-user'

export function getUser() {
  try {
    const savedUser = localStorage.getItem(USER_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  } catch (error) {
    console.error('Unable to read the signed-in user from local storage.', error)
    return null
  }
}

export function saveUser(user) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch (error) {
    console.error('Unable to save the signed-in user to local storage.', error)
    throw new Error('You could not be signed in on this browser. Please try again.', { cause: error })
  }
}

export function clearUser() {
  try {
    localStorage.removeItem(USER_KEY)
  } catch (error) {
    console.error('Unable to sign out from local storage.', error)
    throw new Error('You could not be signed out on this browser. Please try again.', { cause: error })
  }
}

export function getBookings() {
  try {
    const savedBookings = localStorage.getItem(BOOKINGS_KEY)
    if (!savedBookings) return []

    const bookings = JSON.parse(savedBookings)
    if (!Array.isArray(bookings)) {
      throw new Error('Saved booking data is not a list.')
    }
    return bookings
  } catch (error) {
    console.error('Unable to read saved bookings from local storage.', error)
    throw new Error('Saved bookings could not be loaded from this browser.', { cause: error })
  }
}

export function saveBooking(booking) {
  const bookings = getBookings()
  const updatedBookings = [booking, ...bookings]

  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings))
    return updatedBookings
  } catch (error) {
    console.error('Unable to save booking to local storage.', error)
    throw new Error('Your booking could not be saved in this browser. Please try again.', { cause: error })
  }
}

export function deleteBooking(bookingId) {
  const updatedBookings = getBookings().filter((booking) => booking.id !== bookingId)

  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings))
    return updatedBookings
  } catch (error) {
    console.error('Unable to update saved bookings in local storage.', error)
    throw new Error('This booking could not be removed. Please try again.', { cause: error })
  }
}
