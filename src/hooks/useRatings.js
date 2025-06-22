import { useState, useEffect, useCallback } from 'react'

const useRatings = () => {
  const [ratings, setRatings] = useState({})
  const [recentActivity, setRecentActivity] = useState([])

  // Load ratings from localStorage on mount
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}')
    setRatings(savedRatings)

    // Create recent activity from ratings
    const activity = Object.entries(savedRatings)
      .slice(-5)
      .reverse()
      .map(([movieId, rating]) => ({
        type: 'rating',
        movieId,
        rating,
        time: 'Recently',
      }))

    setRecentActivity(activity)
  }, [])

  // Add or update a rating
  const addRating = useCallback(
    (movieId, rating, movieTitle = null) => {
      const newRatings = {
        ...ratings,
        [movieId]: rating,
      }

      setRatings(newRatings)
      localStorage.setItem('ratings', JSON.stringify(newRatings))

      // Add to recent activity if movie title is provided
      if (movieTitle) {
        const newActivity = {
          type: 'rating',
          movieId,
          movie: movieTitle,
          rating,
          time: 'Just now',
        }
        setRecentActivity((prev) => [newActivity, ...prev.slice(0, 4)])
      }

      return newRatings
    },
    [ratings]
  )

  // Remove a rating
  const removeRating = useCallback(
    (movieId) => {
      const newRatings = { ...ratings }
      delete newRatings[movieId]

      setRatings(newRatings)
      localStorage.setItem('ratings', JSON.stringify(newRatings))

      return newRatings
    },
    [ratings]
  )

  // Clear all ratings
  const clearRatings = useCallback(() => {
    setRatings({})
    setRecentActivity([])
    localStorage.removeItem('ratings')
  }, [])

  // Get rating for a specific movie
  const getRating = useCallback(
    (movieId) => {
      return ratings[movieId] || 0
    },
    [ratings]
  )

  // Check if a movie is rated
  const isRated = useCallback(
    (movieId) => {
      return movieId in ratings
    },
    [ratings]
  )

  // Get statistics
  const stats = {
    moviesRated: Object.keys(ratings).length,
    averageRating:
      Object.keys(ratings).length > 0
        ? Object.values(ratings).reduce((sum, rating) => sum + rating, 0) /
          Object.keys(ratings).length
        : 0,
    highestRating: Math.max(...Object.values(ratings), 0),
    lowestRating:
      Object.keys(ratings).length > 0 ? Math.min(...Object.values(ratings)) : 0,
  }

  return {
    // State
    ratings,
    recentActivity,
    stats,

    // Functions
    addRating,
    removeRating,
    clearRatings,
    getRating,
    isRated,

    // Utilities
    ratedMovieIds: Object.keys(ratings),
    hasRatings: Object.keys(ratings).length > 0,
  }
}

export default useRatings
