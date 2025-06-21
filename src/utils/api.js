const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const IS_DEV = import.meta.env.DEV

const api = {
  async fetchMovies() {
    const endpoint = IS_DEV ? '/dev/random-movies?count=10' : '/movies'
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }
    return response.json()
  },

  async getRecommendations(token, ratings) {
    const endpoint = IS_DEV ? '/dev/mock-recommend' : '/recommend'
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(IS_DEV ? {} : { seeds: ratings }),
    })

    if (!response.ok) {
      throw new Error('Failed to get recommendations')
    }
    return response.json()
  },

  async verifyMovie(token, movieTitle) {
    if (IS_DEV) {
      return { success: true, detail: 'Movie verified (dev mode)' }
    }

    const response = await fetch(
      `${API_BASE_URL}/verify_movie?movie=${encodeURIComponent(movieTitle)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to verify movie')
    }
    return response.json()
  },

  async devLogin() {
    if (!IS_DEV) {
      throw new Error('Dev login only available in development')
    }

    const response = await fetch(`${API_BASE_URL}/auth/dev-login`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Dev login failed')
    }
    return response.json()
  },
}

export default api
