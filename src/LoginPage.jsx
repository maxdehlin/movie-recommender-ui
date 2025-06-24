import React from 'react'

// const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://movie-recommender-fragrant-shape-7289.fly.dev'






function LoginPage({ onLogin }) {
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google/login`
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Movie Recommender</h1>
        <p>Sign in to get personalized movie recommendations</p>
        <button 
          className="google-login-button"
          onClick={handleGoogleLogin}
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="google-icon"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default LoginPage 