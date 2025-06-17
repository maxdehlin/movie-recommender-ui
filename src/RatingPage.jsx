import React, { useState, useEffect } from 'react'

const BACKEND_URL = 'http://127.0.0.1:8000'

function RatingPage({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [ratings, setRatings] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Load saved ratings and recommendations from localStorage when component mounts
  useEffect(() => {
    const savedRatings = localStorage.getItem('ratings')
    if (savedRatings) {
      const parsedRatings = JSON.parse(savedRatings)
      setRatings(parsedRatings)
      
      // Also load the search results for the rated movies
      const ratedMovies = Object.keys(parsedRatings).map(title => ({
        id: title,
        title: title
      }))
      setSearchResults(ratedMovies)
    }

    // Load saved recommendations if they exist
    const savedRecommendations = localStorage.getItem('recommendations')
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations))
    }
  }, [])

  // Whenever ratings change, keep searchResults in sync
  useEffect(() => {
    const ratedMovies = Object.keys(ratings).map(title => ({
      id: title,
      title: title
    }))
    setSearchResults(ratedMovies)
  }, [ratings])

  // Save recommendations to localStorage whenever they change
  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem('recommendations', JSON.stringify(recommendations))
    }
  }, [recommendations])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError(null)
    setSuccess(null)

    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${BACKEND_URL}/verify_movie?movie=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (data.success) {
        setSearchResults(prev => {
          if (ratings[searchQuery]) {
            setError('You have already rated this movie')
            return prev
          }
          if (!prev.find(movie => movie.title === searchQuery)) {
            setSuccess(`Movie "${searchQuery}" found and added to your rating list!`)
            return [...prev, { id: searchQuery, title: searchQuery }]
          }
          setError('This movie is already in your rating list')
          return prev
        })
        setSearchQuery('')
      } else {
        setError('Movie not found. Please try another title.')
      }
    } catch (err) {
      setError('Failed to verify movie. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleRating = (movieId, rating) => {
    const newRatings = {
      ...ratings,
      [movieId]: rating
    }
    setRatings(newRatings)
    localStorage.setItem('ratings', JSON.stringify(newRatings))
  }

  const handleSubmit = async () => {
    if (Object.keys(ratings).length < 1) {
      setError('Please rate at least 10 movies')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('authToken')
      const seeds = Object.entries(ratings).map(([title, rating]) => ({
        title,
        rating
      }))
      console.log('seeds', seeds)

      const response = await fetch(`${BACKEND_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ seeds }),
      })
      const data = await response.json()
      
      if (data && data.detail && Array.isArray(data.detail)) {
        setRecommendations(data.detail)
        // Keep the ratings in localStorage even after getting recommendations
        localStorage.setItem('ratings', JSON.stringify(ratings))
      } else {
        setError('Invalid response format from server')
      }
    } catch (err) {
      setError('Failed to get recommendations. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setRecommendations([])
    // setRatings({})
    // setSearchResults([])
    // localStorage.removeItem('ratings')
  }

  const removeMovie = (movieId) => {
    setSearchResults(prev => prev.filter(movie => movie.id !== movieId))
    setRatings(prev => {
      const newRatings = { ...prev }
      delete newRatings[movieId]
      localStorage.setItem('ratings', JSON.stringify(newRatings))
      return newRatings
    })
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>Movie Recommender</h1>
        <button 
          className="logout-button"
          onClick={onLogout}
        >
          Sign Out
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      {!recommendations.length ? (
        <div className="rating-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="search-input"
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>

          <div className="movies-grid">
            {searchResults.map(movie => (
              <div key={movie.id} className="movie-card">
                <button 
                  className="remove-movie"
                  onClick={() => removeMovie(movie.id)}
                  title="Remove movie"
                >
                  ×
                </button>
                <h3>{movie.title}</h3>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className={`star ${ratings[movie.id] === star ? 'selected' : ''}`}
                      onClick={() => handleRating(movie.id, star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {searchResults.length > 0 && (
            <div className="rating-progress">
              {searchResults.length} movies rated ({Object.keys(ratings).length}/10 required)
            </div>
          )}

          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={isLoading || Object.keys(ratings).length < 1}
          >
            {isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
          </button>
        </div>
      ) : (
        <div className="recommendations-section">
          <h2>Recommended Movies</h2>
          <div className="recommendations-list">
            {recommendations.map((movie, index) => (
              <div key={index} className="recommendation-card">
                <h3>{movie}</h3>
              </div>
            ))}
          </div>
          <button 
            className="reset-button"
            onClick={handleReset}
          >
            Rate More Movies
          </button>
        </div>
      )}
    </div>
  )
}

export default RatingPage 