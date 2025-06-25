import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RatingPage from './pages/RatingPage'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import MovieDetails from './pages/MovieDetails'
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Backend URL configuration'
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for token in URL (after Google OAuth redirect)
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      if (token) {
        // Save token and remove it from URL
        localStorage.setItem('authToken', token)
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
        setIsAuthenticated(true)
      } else {
        // Check if we have a stored token
        const storedToken = localStorage.getItem('authToken')
        setIsAuthenticated(!!storedToken)
      }

      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken')
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      localStorage.clear()
      setIsAuthenticated(false)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center'>
        <div className='flex items-center space-x-4'>
          <div className='w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin'></div>
          <span className='text-white font-medium'>Loading MovieMind...</span>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path='/login'
          element={
            isAuthenticated ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route
              path='/rate'
              element={<RatingPage onLogout={handleLogout} />}
            />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>

        {/* Catch all route */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}

export default App
