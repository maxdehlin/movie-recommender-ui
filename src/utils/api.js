// API Configuration with better environment handling
const getAPIBaseURL = () => {
  // In Vite environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_URL || 'http://localhost:8000'
  }
  // Fallback for other environments
  return 'http://localhost:8000'
}

const getIsDev = () => {
  // In Vite environment
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.DEV
  }
  // Fallback - assume dev if running on localhost
  return (
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
  )
}

const API_BASE_URL = getAPIBaseURL()
const IS_DEV = getIsDev()

console.log('🎬 API Configuration:', { API_BASE_URL, IS_DEV })

const api = {
  async fetchMovies() {
    try {
      const endpoint = IS_DEV ? '/dev/random-movies?count=10' : '/movies'
      const url = `${API_BASE_URL}${endpoint}`
      console.log('📡 Fetching movies from:', url)

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return response.json()
    } catch (error) {
      console.error('❌ fetchMovies failed:', error)
      throw new Error(`Failed to fetch movies: ${error.message}`)
    }
  },

  async getRecommendations(token, ratings) {
    try {
      const endpoint = IS_DEV ? '/dev/mock-recommend' : '/recommend'
      const url = `${API_BASE_URL}${endpoint}`
      console.log('📡 Getting recommendations from:', url)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(IS_DEV ? {} : { seeds: ratings }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      return response.json()
    } catch (error) {
      console.error('❌ getRecommendations failed:', error)
      throw new Error(`Failed to get recommendations: ${error.message}`)
    }
  },

  async verifyMovie(token, movieTitle) {
    try {
      if (IS_DEV) {
        return { success: true, detail: 'Movie verified (dev mode)' }
      }

      const url = `${API_BASE_URL}/verify_movie?movie=${encodeURIComponent(
        movieTitle
      )}`
      console.log('📡 Verifying movie at:', url)

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      return response.json()
    } catch (error) {
      console.error('❌ verifyMovie failed:', error)
      throw new Error(`Failed to verify movie: ${error.message}`)
    }
  },

  async devLogin() {
    try {
      if (!IS_DEV) {
        throw new Error('Dev login only available in development')
      }

      const url = `${API_BASE_URL}/auth/dev-login`
      console.log('📡 Dev login at:', url)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('✅ Dev login successful:', data.user?.name)

      // Convert backend response format to frontend expected format
      return {
        success: true,
        token: data.access_token,
        user: data.user,
      }
    } catch (error) {
      console.error('❌ devLogin failed:', error)
      throw new Error(`Dev login failed: ${error.message}`)
    }
  },
}

export default api
