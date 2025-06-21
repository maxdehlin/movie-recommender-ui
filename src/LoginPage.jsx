import React from 'react'

const BACKEND_URL = 'http://127.0.0.1:8000'
const isDevelopment = import.meta.env.DEV

function LoginPage({ onLogin }) {
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google/login`
  }

  const handleDevLogin = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/dev-login`, {
        method: 'POST',
      })
      const data = await response.json()

      localStorage.setItem('authToken', data.access_token)
      onLogin()
    } catch (error) {
      console.error('Development login failed:', error)
    }
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1>Movie Recommender</h1>
        <p>Sign in to get personalized movie recommendations</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className='google-login-button' onClick={handleGoogleLogin}>
            <img
              src='https://www.google.com/favicon.ico'
              alt='Google'
              className='google-icon'
            />
            Sign in with Google
          </button>

          {isDevelopment && (
            <button
              className='dev-login-button'
              onClick={handleDevLogin}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Quick Dev Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
