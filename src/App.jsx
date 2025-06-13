import { useState } from 'react'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [ratings, setRatings] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`http://127.0.0.1:8000/verify_movie?movie=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (data.success) {
        setSearchResults(prev => {
          // Check if movie is already rated
          if (ratings[searchQuery]) {
            setError('You have already rated this movie')
            return prev
          }
          // Add new movie to results if not already present
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
    setRatings(prev => ({
      ...prev,
      [movieId]: rating
    }))
  }

  const handleSubmit = async () => {
    if (Object.keys(ratings).length < 1) {
      setError('Please rate at least 10 movies')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const seeds = Object.entries(ratings).map(([title, rating]) => ({
        title,
        rating
      }))

      const response = await fetch('http://127.0.0.1:8000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seeds }),
      })
      const data = await response.json()
      
      if (data && data.detail && Array.isArray(data.detail)) {
        setRecommendations(data.detail)
      } else {
        setError('Invalid response format from server')
      }
    } catch (err) {
      setError('Failed to get recommendations. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const removeMovie = (movieId) => {
    setSearchResults(prev => prev.filter(movie => movie.id !== movieId))
    setRatings(prev => {
      const newRatings = { ...prev }
      delete newRatings[movieId]
      return newRatings
    })
  }

  return (
    <div className="app-container">
      <h1>Movie Recommender</h1>
      
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
            onClick={() => {
              setRecommendations([])
              setRatings({})
              setSearchResults([])
            }}
          >
            Rate More Movies
          </button>
        </div>
      )}
    </div>
  )
}

export default App
