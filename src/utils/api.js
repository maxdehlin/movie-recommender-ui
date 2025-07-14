const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
// const IS_DEV = import.meta.env.DEV
const IS_DEV = false

const api = {
  async fetchMovies () {
    const endpoint = IS_DEV ? '/dev/random-movies?count=10' : '/dev/movies'
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url)
    console.log('url', url)
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }
    return response.json()
  },

  async getRecommendations (token, ratings) {
    const endpoint = IS_DEV ? '/dev/mock-recommend' : '/recommend'
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        seeds: Object.entries(ratings).map(([title, rating]) => ({
          title,
          rating
        }))
      })
    })
    console.log('BALLS2', ratings)

    if (!response.ok) {
      console.log('response', response)
      throw new Error('Failed to get recommendations')
    }
    return response.json()
  },

  async getUserRatings (token) {
    if (IS_DEV) {
      // Return mock data for development
      const savedRatings = localStorage.getItem('ratings')
      return savedRatings ? JSON.parse(savedRatings) : {}
    }

    const response = await fetch(`${API_BASE_URL}/user/ratings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user ratings')
    }
    return response.json()
  },

  async saveRating (token, movieId, rating) {
    console.log('balls', rating)
    if (IS_DEV) {
      const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}')
      savedRatings[movieId] = rating
      localStorage.setItem('ratings', JSON.stringify(savedRatings))
      return { success: true }
    }

    const response = await fetch(`${API_BASE_URL}/user/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        movie: movieId, // match FastAPI param name
        value: rating // match FastAPI param name
      })
    })

    if (!response.ok) {
      throw new Error('Failed to save rating')
    }
    return response.json()
  },

  async deleteRating (token, movieId) {
    if (IS_DEV) {
      // Remove from localStorage for development
      const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}')
      delete savedRatings[movieId]
      localStorage.setItem('ratings', JSON.stringify(savedRatings))
      return { success: true }
    }

    const response = await fetch(`${API_BASE_URL}/user/ratings/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Failed to delete rating')
    }
    return response.json()
  },

  async verifyMovie (token, movieTitle) {
    console.log('token', token)
    if (IS_DEV) {
      return { success: true, detail: 'Movie verified (dev mode)' }
    }

    const response = await fetch(
      `${API_BASE_URL}/verify_movie?movie=${encodeURIComponent(movieTitle)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to verify movie')
    }
    return response.json()
  },

  async devLogin () {
    if (!IS_DEV) {
      throw new Error('Dev login only available in development')
    }

    const response = await fetch(`${API_BASE_URL}/auth/dev-login`, {
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error('Dev login failed')
    }
    return response.json()
  }
}

export default api
