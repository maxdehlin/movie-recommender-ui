import { useState, useEffect } from 'react'
import './App.css'
import LoginPage from './LoginPage'
import RatingPage from './RatingPage'

// Backend URL configuration'
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for token in URL (after Google OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    if (token) {
      // Save token and remove it from URL
      localStorage.setItem('authToken', token)
      window.history.replaceState({}, document.title, window.location.pathname)
      setIsAuthenticated(true)
    } else {
      // Check if we have a stored token
      const storedToken = localStorage.getItem('authToken')
      if (storedToken) {
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken')
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      })
      // Clear all local storage
      localStorage.clear()
      // Force navigation to login page
      setIsAuthenticated(false)
      // Clear URL parameters if any
      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (err) {
      console.error('Logout failed:', err)
      // Even if the server request fails, we should still log the user out locally
      localStorage.clear()
      setIsAuthenticated(false)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <RatingPage onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
