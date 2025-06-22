import React, { useState, useEffect } from 'react'
import api from '../utils/api'
import FilmHeader from '../components/FilmHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

function RatingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [ratings, setRatings] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [availableMovies, setAvailableMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [savedRecommendations, setSavedRecommendations] = useState(new Set())
  const [isLoadingMovies, setIsLoadingMovies] = useState(true)

  // Load initial data
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setIsLoadingMovies(true)

      // Load movies from API
      const movieData = await api.fetchMovies()
      setAvailableMovies(movieData.movies || movieData)

      // Load saved data from localStorage
      const savedRatings = localStorage.getItem('ratings')
      if (savedRatings) {
        const parsedRatings = JSON.parse(savedRatings)
        setRatings(parsedRatings)

        // Load displayed movies from rated movies
        const ratedMovieIds = new Set(Object.keys(parsedRatings))
        const ratedMovies = (movieData.movies || movieData).filter((movie) =>
          ratedMovieIds.has(movie.id.toString())
        )
        setDisplayedMovies(ratedMovies)
      }

      const savedRecommendationsData = localStorage.getItem('recommendations')
      if (savedRecommendationsData) {
        setRecommendations(JSON.parse(savedRecommendationsData))
      }

      const savedList = localStorage.getItem('savedRecommendations')
      if (savedList) {
        setSavedRecommendations(new Set(JSON.parse(savedList)))
      }
    } catch (error) {
      console.error('Failed to load initial data:', error)
      setError('Failed to load movies. Please refresh the page.')
    } finally {
      setIsLoadingMovies(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError(null)
    setSuccess(null)

    try {
      const searchTerm = searchQuery.trim().toLowerCase()
      const matchingMovies = availableMovies.filter((movie) => {
        const movieTitle = movie.title.toLowerCase()

        // Multiple search strategies for better matching
        return (
          // Exact substring match
          movieTitle.includes(searchTerm) ||
          // Remove punctuation and extra spaces for fuzzy matching
          movieTitle
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .includes(
              searchTerm.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ')
            ) ||
          // Check if all search words exist in the title (any order)
          searchTerm
            .split(/\s+/)
            .every((word) => word.length > 0 && movieTitle.includes(word))
        )
      })

      if (matchingMovies.length === 0) {
        setError('No films found in our archives. Try a different title.')
        return
      }

      const newMovie = matchingMovies[0]

      // Check if already rated
      if (ratings[newMovie.id]) {
        setError('You have already rated this film')
        return
      }

      // Check if already in display list
      if (displayedMovies.find((movie) => movie.id === newMovie.id)) {
        setError('This film is already in your collection')
        return
      }

      // Add to displayed movies
      setDisplayedMovies((prev) => [...prev, newMovie])
      setSuccess(`"${newMovie.title}" added to your film collection!`)
      setSearchQuery('')
    } catch (error) {
      console.error('Search failed:', error)
      setError('Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleRating = (movieId, rating) => {
    const newRatings = {
      ...ratings,
      [movieId]: rating,
    }
    setRatings(newRatings)
    localStorage.setItem('ratings', JSON.stringify(newRatings))
  }

  const handleSubmit = async () => {
    if (Object.keys(ratings).length < 1) {
      setError('Rate at least one film to unlock AI recommendations')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('authToken')
      console.log(
        '🎬 Getting recommendations with token:',
        token ? 'Present' : 'Missing'
      )
      console.log('🎭 Ratings to send:', ratings)

      if (!token) {
        setError('Please log in to get recommendations')
        return
      }

      const data = await api.getRecommendations(token, ratings)
      console.log('🎯 Recommendations response:', data)

      if (data.success && data.detail) {
        setRecommendations(data.detail)
        localStorage.setItem('recommendations', JSON.stringify(data.detail))
        console.log('✅ Recommendations saved:', data.detail.length, 'movies')
      } else {
        console.error('❌ Invalid response format:', data)
        setError('Failed to generate recommendations. Please try again.')
      }
    } catch (error) {
      console.error('❌ Recommendation failed:', error)
      setError(`Failed to generate recommendations: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setRecommendations([])
    localStorage.removeItem('recommendations')
  }

  const handleNewRecommendations = () => {
    setRecommendations([])
    localStorage.removeItem('recommendations')
    handleSubmit()
  }

  const toggleSaveRecommendation = (movie) => {
    const movieKey = movie.title || movie
    const newSaved = new Set(savedRecommendations)
    if (newSaved.has(movieKey)) {
      newSaved.delete(movieKey)
    } else {
      newSaved.add(movieKey)
    }
    setSavedRecommendations(newSaved)
    localStorage.setItem('savedRecommendations', JSON.stringify([...newSaved]))
  }

  const removeMovie = (movieId) => {
    setDisplayedMovies((prev) => prev.filter((movie) => movie.id !== movieId))
    setRatings((prev) => {
      const newRatings = { ...prev }
      delete newRatings[movieId]
      localStorage.setItem('ratings', JSON.stringify(newRatings))
      return newRatings
    })
  }

  const ratedCount = Object.keys(ratings).length

  if (isLoadingMovies) {
    return (
      <LoadingSpinner
        fullScreen={true}
        title='Loading Cinema Archives...'
        subtitle='Curating your personalized film experience'
        color='teal'
      />
    )
  }

  return (
    <div className='min-h-screen pt-12 pb-20 px-8'>
      <div className='max-w-7xl mx-auto space-y-16'>
        {/* Alerts */}
        {error && (
          <div className='mb-8 p-6 bg-crimson/10 border border-crimson/30 rounded-2xl text-cream backdrop-blur-sm animate-fade-in shadow-xl'>
            <div className='flex items-center space-x-4'>
              <div className='w-6 h-6 rounded-full bg-crimson/20 flex items-center justify-center'>
                <div className='w-3 h-3 bg-crimson rounded-full animate-pulse'></div>
              </div>
              <span className='font-medium text-lg'>{error}</span>
            </div>
          </div>
        )}
        {success && (
          <div className='mb-8 p-6 bg-teal/10 border border-teal/30 rounded-2xl text-cream backdrop-blur-sm animate-fade-in shadow-xl'>
            <div className='flex items-center space-x-4'>
              <div className='w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center'>
                <div className='w-3 h-3 bg-teal rounded-full animate-pulse'></div>
              </div>
              <span className='font-medium text-lg'>{success}</span>
            </div>
          </div>
        )}

        {!recommendations.length ? (
          <div className='space-y-16'>
            <FilmHeader
              title={['Discover Your Next', 'Cinematic Journey']}
              subtitle='Let our AI curator guide you through a personalized collection of films tailored to your unique taste and cinematic preferences'
              accentColor='crimson'
            />

            {/* Enhanced Search Bar */}
            <div className='max-w-4xl mx-auto'>
              <form onSubmit={handleSearch} className='relative group'>
                {/* Film strip border effect */}
                <div className='absolute -inset-2 bg-gradient-to-r from-crimson/20 via-teal/20 to-crimson/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-700'></div>
                <div className='relative bg-charcoal-light/80 backdrop-blur-xl rounded-3xl border border-gray-600/50 p-4 shadow-2xl group-hover:border-teal/30 transition-all duration-500'>
                  <div className='flex items-center space-x-6'>
                    {/* Play icon */}
                    <div className='w-12 h-12 bg-gradient-to-br from-crimson to-crimson-dark rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        className='w-6 h-6 text-cream ml-1'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M8 5v14l11-7z' />
                      </svg>
                    </div>

                    <div className='flex-1 relative'>
                      <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search the cinema archives...'
                        className='w-full bg-transparent text-cream placeholder-muted-gray px-6 py-6 rounded-2xl focus:outline-none text-xl font-light tracking-wide focus:placeholder-opacity-50 transition-all duration-300'
                      />
                    </div>

                    <button
                      type='submit'
                      disabled={isSearching}
                      className='px-12 py-6 bg-gradient-to-r from-crimson to-crimson-dark hover:from-crimson-dark hover:to-crimson text-cream rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] shadow-xl hover:shadow-crimson/25 border border-crimson/50 hover:border-crimson/70 group-hover:shadow-2xl'
                    >
                      {isSearching ? (
                        <div className='flex items-center justify-center space-x-3'>
                          <div className='w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin'></div>
                          <span>Searching Archives</span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <span>Discover</span>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Empty State or Film Collection */}
            {displayedMovies.length === 0 ? (
              <EmptyState
                icon='🎬'
                title='Your Cinema Awaits'
                subtitle="Begin by searching for films you've watched and rating them. Our AI will craft personalized recommendations just for you."
                size='large'
                variant='primary'
              />
            ) : (
              <div className='space-y-16'>
                {/* Progress Ring */}
                <div className='flex justify-center'>
                  <div className='relative w-48 h-48'>
                    <svg
                      className='w-48 h-48 transform -rotate-90'
                      viewBox='0 0 100 100'
                    >
                      <circle
                        cx='50'
                        cy='50'
                        r='40'
                        fill='none'
                        stroke='rgba(75, 85, 99, 0.2)'
                        strokeWidth='3'
                      />
                      <circle
                        cx='50'
                        cy='50'
                        r='40'
                        fill='none'
                        stroke='url(#crimsonGradient)'
                        strokeWidth='3'
                        strokeDasharray={`${(ratedCount / 10) * 251.2}, 251.2`}
                        className='transition-all duration-1000 ease-out'
                        strokeLinecap='round'
                      />
                      <defs>
                        <linearGradient
                          id='crimsonGradient'
                          x1='0%'
                          y1='0%'
                          x2='100%'
                          y2='0%'
                        >
                          <stop offset='0%' stopColor='#dc2626' />
                          <stop offset='50%' stopColor='#b91c1c' />
                          <stop offset='100%' stopColor='#059669' />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='text-center'>
                        <div className='text-5xl font-serif text-crimson mb-2'>
                          {ratedCount}
                        </div>
                        <div className='text-sm text-muted-gray font-medium tracking-wider uppercase'>
                          Films Rated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Film Collection - Masonry Grid */}
                <div className='max-w-7xl mx-auto'>
                  <h2 className='text-3xl font-serif text-cream mb-8 text-center tracking-wide'>
                    Your Film Collection
                  </h2>
                  <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8'>
                    {displayedMovies.map((movie) => (
                      <div
                        key={movie.id}
                        className='group relative break-inside-avoid mb-8 bg-charcoal-light/60 backdrop-blur-xl rounded-2xl border border-gray-600/30 hover:border-crimson/40 transition-all duration-500 hover:shadow-2xl hover:shadow-crimson/10 overflow-hidden'
                        style={{
                          filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))',
                        }}
                      >
                        {/* Remove button */}
                        <button
                          onClick={() => removeMovie(movie.id)}
                          className='absolute top-4 right-4 z-20 w-10 h-10 bg-charcoal/80 hover:bg-crimson/80 rounded-full flex items-center justify-center text-muted-gray hover:text-cream transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-gray-600/50 hover:border-crimson/50 shadow-lg hover:shadow-crimson/25 hover:scale-110'
                        >
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </button>

                        {/* Movie Poster */}
                        <div className='aspect-[2/3] bg-gradient-to-br from-charcoal-light to-charcoal rounded-t-2xl overflow-hidden relative'>
                          {movie.poster ? (
                            <img
                              src={movie.poster}
                              alt={movie.title}
                              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextElementSibling.style.display =
                                  'flex'
                              }}
                            />
                          ) : null}
                          <div
                            className='w-full h-full flex items-center justify-center text-8xl opacity-30'
                            style={{
                              display: movie.poster ? 'none' : 'flex',
                            }}
                          >
                            🎬
                          </div>
                          {/* Gradient overlay */}
                          <div className='absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>

                        <div className='p-6 space-y-4'>
                          <div>
                            <h3 className='text-cream font-serif text-xl mb-2 line-clamp-2 leading-tight tracking-wide group-hover:text-crimson transition-colors duration-300'>
                              {movie.title}
                            </h3>

                            <div className='flex items-center space-x-3 text-sm text-muted-gray'>
                              <span className='font-medium'>{movie.year}</span>
                              <div className='w-1 h-1 bg-crimson/50 rounded-full'></div>
                              <span className='line-clamp-1'>
                                {movie.genres?.join(', ')}
                              </span>
                            </div>
                          </div>

                          {/* Star Rating */}
                          <div className='flex items-center space-x-1'>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleRating(movie.id, star)}
                                className={`relative p-1 rounded-lg transition-all duration-300 hover:scale-125 active:scale-110 group ${
                                  ratings[movie.id] >= star
                                    ? 'text-crimson'
                                    : 'text-gray-600 hover:text-crimson/70'
                                }`}
                              >
                                <svg
                                  className={`w-7 h-7 transition-all duration-300 ${
                                    ratings[movie.id] >= star
                                      ? 'drop-shadow-lg filter'
                                      : 'group-hover:drop-shadow-md'
                                  }`}
                                  fill='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                                </svg>
                                {ratings[movie.id] >= star && (
                                  <div className='absolute inset-0 bg-crimson/20 rounded-lg animate-pulse'></div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Recommendations Button */}
                <div className='text-center pt-12'>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || ratedCount < 1}
                    className='relative px-16 py-6 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-charcoal rounded-3xl font-bold text-xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[400px] shadow-2xl hover:shadow-teal/30 border border-teal/50 hover:border-teal/70 group overflow-hidden'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                    <span className='relative z-10 flex items-center justify-center space-x-3'>
                      {isLoading ? (
                        <>
                          <div className='w-6 h-6 border-3 border-charcoal/30 border-t-charcoal rounded-full animate-spin'></div>
                          <span>AI Curating Your Recommendations...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className='w-6 h-6'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
                          </svg>
                          <span>Unlock AI Recommendations</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* AI Recommendations Section */
          <div className='space-y-16'>
            <div className='text-center space-y-8'>
              <h2 className='text-6xl font-serif text-cream tracking-wide'>
                Your AI-Curated
                <span className='block text-teal italic'>Cinematic Picks</span>
              </h2>
              <p className='text-xl text-muted-gray font-light max-w-3xl mx-auto'>
                Based on your ratings, our AI has discovered these exceptional
                films that match your unique cinematic taste
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {recommendations.map((movie, index) => (
                <div
                  key={index}
                  className='group relative bg-charcoal-light/60 backdrop-blur-xl rounded-2xl border border-gray-600/30 hover:border-teal/40 transition-all duration-500 hover:shadow-2xl hover:shadow-teal/10 overflow-hidden p-8'
                  style={{
                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))',
                  }}
                >
                  {/* AI Badge */}
                  <div className='absolute top-6 left-6 px-3 py-1 bg-teal/20 border border-teal/30 rounded-full'>
                    <div className='flex items-center space-x-2'>
                      <div className='w-2 h-2 bg-teal rounded-full animate-pulse'></div>
                      <span className='text-xs text-teal font-medium tracking-wider uppercase'>
                        AI Pick
                      </span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className='absolute top-6 right-6'>
                    <button
                      onClick={() => toggleSaveRecommendation(movie)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border shadow-lg group ${
                        savedRecommendations.has(movie.title || movie)
                          ? 'bg-crimson/25 border-crimson/40 text-crimson scale-105 shadow-crimson/25'
                          : 'bg-charcoal/40 border-gray-600/40 text-muted-gray hover:bg-crimson/15 hover:text-crimson hover:scale-105 hover:border-crimson/30'
                      }`}
                    >
                      <svg
                        className={`w-7 h-7 transition-all duration-300 ${
                          savedRecommendations.has(movie.title || movie)
                            ? 'fill-current group-hover:scale-110'
                            : 'stroke-current fill-none group-hover:scale-110'
                        }`}
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={
                            savedRecommendations.has(movie.title || movie)
                              ? 0
                              : 2
                          }
                          d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
                        />
                      </svg>
                    </button>
                  </div>

                  <div className='pt-8 space-y-6'>
                    <h3 className='text-cream font-serif text-2xl pr-16 line-clamp-2 leading-tight tracking-wide group-hover:text-teal transition-colors duration-300'>
                      {movie.title || movie}
                    </h3>

                    {movie.year && (
                      <div className='flex items-center space-x-3 text-muted-gray'>
                        <span className='font-medium'>{movie.year}</span>
                        <div className='w-1 h-1 bg-teal/50 rounded-full'></div>
                        <span className='line-clamp-1'>
                          {movie.genres?.join(', ')}
                        </span>
                      </div>
                    )}

                    {movie.reason && (
                      <p className='text-muted-gray leading-relaxed line-clamp-3 italic'>
                        "{movie.reason}"
                      </p>
                    )}

                    <div className='flex items-center justify-between pt-6 border-t border-gray-600/30'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-3 h-3 bg-gradient-to-r from-teal to-crimson rounded-full'></div>
                        <span className='text-sm text-muted-gray font-medium tracking-wider uppercase'>
                          Recommendation #{index + 1}
                        </span>
                      </div>
                      {movie.rating && (
                        <div className='flex items-center space-x-2'>
                          <span className='text-crimson text-lg'>★</span>
                          <span className='text-cream font-semibold'>
                            {movie.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 pt-12'>
              <button
                onClick={handleNewRecommendations}
                disabled={isLoading}
                className='px-12 py-6 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-charcoal rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-teal/25 border border-teal/50 tracking-wide'
              >
                Generate New Picks
              </button>
              <button
                onClick={handleReset}
                className='px-12 py-6 bg-charcoal-light/60 hover:bg-charcoal-light/80 text-cream rounded-2xl font-semibold border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 tracking-wide shadow-lg backdrop-blur-xl'
              >
                Rate More Films
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RatingPage
