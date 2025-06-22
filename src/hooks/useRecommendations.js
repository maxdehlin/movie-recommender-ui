import { useState, useEffect, useCallback } from 'react'
import api from '../utils/api'

const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([])
  const [savedRecommendations, setSavedRecommendations] = useState(new Set())
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false)
  const [recommendationError, setRecommendationError] = useState('')

  // Load recommendations and saved list from localStorage on mount
  useEffect(() => {
    const savedRecommendationsData = JSON.parse(
      localStorage.getItem('recommendations') || '[]'
    )
    setRecommendations(savedRecommendationsData)

    const savedList = JSON.parse(
      localStorage.getItem('savedRecommendations') || '[]'
    )
    setSavedRecommendations(new Set(savedList))
  }, [])

  // Generate new recommendations
  const generateRecommendations = useCallback(async (ratings) => {
    if (Object.keys(ratings).length < 1) {
      setRecommendationError(
        'Rate at least one film to unlock AI recommendations'
      )
      return false
    }

    setIsLoadingRecommendations(true)
    setRecommendationError('')

    try {
      const token = localStorage.getItem('authToken')

      if (!token) {
        setRecommendationError('Please log in to get recommendations')
        return false
      }

      const data = await api.getRecommendations(token, ratings)

      if (data.success && data.detail) {
        setRecommendations(data.detail)
        localStorage.setItem('recommendations', JSON.stringify(data.detail))
        return true
      } else {
        setRecommendationError(
          'Failed to generate recommendations. Please try again.'
        )
        return false
      }
    } catch (error) {
      console.error('❌ Recommendation failed:', error)
      setRecommendationError(
        `Failed to generate recommendations: ${error.message}`
      )
      return false
    } finally {
      setIsLoadingRecommendations(false)
    }
  }, [])

  // Save/unsave a recommendation
  const toggleSaveRecommendation = useCallback(
    (movie) => {
      const movieKey = movie.title || movie
      const newSaved = new Set(savedRecommendations)

      if (newSaved.has(movieKey)) {
        newSaved.delete(movieKey)
      } else {
        newSaved.add(movieKey)
      }

      setSavedRecommendations(newSaved)
      localStorage.setItem(
        'savedRecommendations',
        JSON.stringify([...newSaved])
      )

      return newSaved.has(movieKey)
    },
    [savedRecommendations]
  )

  // Check if a recommendation is saved
  const isSaved = useCallback(
    (movie) => {
      const movieKey = movie.title || movie
      return savedRecommendations.has(movieKey)
    },
    [savedRecommendations]
  )

  // Remove a recommendation from the list
  const dismissRecommendation = useCallback(
    (movieToRemove) => {
      const updatedRecommendations = recommendations.filter(
        (movie) =>
          (movie.title || movie) !== (movieToRemove.title || movieToRemove)
      )
      setRecommendations(updatedRecommendations)
      localStorage.setItem(
        'recommendations',
        JSON.stringify(updatedRecommendations)
      )
    },
    [recommendations]
  )

  // Clear all recommendations
  const clearRecommendations = useCallback(() => {
    setRecommendations([])
    localStorage.removeItem('recommendations')
  }, [])

  // Clear saved recommendations
  const clearSavedRecommendations = useCallback(() => {
    setSavedRecommendations(new Set())
    localStorage.removeItem('savedRecommendations')
  }, [])

  // Get statistics
  const stats = {
    recommendationsReceived: recommendations.length,
    savedMovies: savedRecommendations.size,
    savedRecommendationsList: [...savedRecommendations],
  }

  return {
    // State
    recommendations,
    savedRecommendations,
    isLoadingRecommendations,
    recommendationError,
    stats,

    // Functions
    generateRecommendations,
    toggleSaveRecommendation,
    isSaved,
    dismissRecommendation,
    clearRecommendations,
    clearSavedRecommendations,
    setRecommendationError,

    // Utilities
    hasRecommendations: recommendations.length > 0,
    hasSavedMovies: savedRecommendations.size > 0,
  }
}

export default useRecommendations
