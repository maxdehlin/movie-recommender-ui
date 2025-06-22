import { useState, useEffect } from 'react'
import api from '../utils/api'

const useMovieSearch = () => {
  const [availableMovies, setAvailableMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoadingMovies, setIsLoadingMovies] = useState(true)
  const [searchError, setSearchError] = useState('')

  // Load available movies on mount
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoadingMovies(true)
        const movieData = await api.fetchMovies()
        setAvailableMovies(movieData.movies || movieData)
      } catch (error) {
        console.error('Failed to load movies:', error)
        setSearchError('Failed to load movies. Please refresh the page.')
      } finally {
        setIsLoadingMovies(false)
      }
    }

    loadMovies()
  }, [])

  // Fuzzy search function
  const searchMovies = (query, limit = 5) => {
    if (!query.trim()) {
      setSearchResults([])
      setSearchError('')
      return []
    }

    const searchTerm = query.trim().toLowerCase()
    const matchingMovies = availableMovies.filter((movie) => {
      const movieTitle = movie.title.toLowerCase()
      return (
        // Exact substring match
        movieTitle.includes(searchTerm) ||
        // Remove punctuation and extra spaces for fuzzy matching
        movieTitle
          .replace(/[^\w\s]/g, '')
          .replace(/\s+/g, ' ')
          .includes(searchTerm.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ')) ||
        // Check if all search words exist in the title (any order)
        searchTerm
          .split(/\s+/)
          .every((word) => word.length > 0 && movieTitle.includes(word))
      )
    })

    const results = matchingMovies.slice(0, limit)
    setSearchResults(results)

    if (results.length === 0 && query.trim()) {
      setSearchError('No films found in our archives. Try a different title.')
    } else {
      setSearchError('')
    }

    return results
  }

  // Handle search input change
  const handleSearchChange = (query, limit = 5) => {
    setSearchQuery(query)
    return searchMovies(query, limit)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setSearchError('')
  }

  return {
    // State
    availableMovies,
    searchQuery,
    searchResults,
    isLoadingMovies,
    searchError,

    // Functions
    searchMovies,
    handleSearchChange,
    clearSearch,
    setSearchError,
  }
}

export default useMovieSearch
