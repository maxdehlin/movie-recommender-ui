import { useState } from 'react'
import FilmHeader from '../components/FilmHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import RecommendationCard from '../components/RecommendationCard'
import MovieCollection from '../components/MovieCollection'
import useRatings from '../hooks/useRatings'
import useRecommendations from '../hooks/useRecommendations'
import useMovieSearch from '../hooks/useMovieSearch'
import useToast from '../hooks/useToast'

function RatingPage() {
  const { showToast } = useToast()

  // Custom hooks
  const { ratings, stats, addRating, removeRating } = useRatings()

  const {
    recommendations,
    isLoadingRecommendations,
    recommendationError,
    generateRecommendations,
    toggleSaveRecommendation,
    isSaved,
    clearRecommendations,
  } = useRecommendations()

  const {
    availableMovies,
    searchQuery,
    searchResults,
    isLoadingMovies,
    searchError,
    handleSearchChange,
    clearSearch,
  } = useMovieSearch()

  // Local state
  const [displayedMovies, setDisplayedMovies] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  // Handle search and add movie
  const handleAddMovie = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      const searchTerm = searchQuery.trim().toLowerCase()
      const matchingMovies = availableMovies.filter((movie) => {
        const movieTitle = movie.title.toLowerCase()
        return (
          movieTitle.includes(searchTerm) ||
          movieTitle
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .includes(
              searchTerm.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ')
            ) ||
          searchTerm
            .split(/\s+/)
            .every((word) => word.length > 0 && movieTitle.includes(word))
        )
      })

      if (matchingMovies.length === 0) {
        showToast(
          'No films found in our archives. Try a different title.',
          'error'
        )
        return
      }

      const newMovie = matchingMovies[0]

      // Check if already rated
      if (ratings[newMovie.id]) {
        showToast('You have already rated this film', 'error')
        return
      }

      // Check if already in display list
      if (displayedMovies.find((movie) => movie.id === newMovie.id)) {
        showToast('This film is already in your collection', 'error')
        return
      }

      // Add to displayed movies
      setDisplayedMovies((prev) => [...prev, newMovie])
      showToast(`"${newMovie.title}" added to your film collection!`, 'success')
      clearSearch()
    } catch (error) {
      console.error('Search failed:', error)
      showToast('Search failed. Please try again.', 'error')
    }
  }

  // Handle rating a movie
  const handleRating = (movieId, rating) => {
    const movie =
      displayedMovies.find((m) => m.id === movieId) ||
      availableMovies.find((m) => m.id === movieId)
    addRating(movieId, rating, movie?.title)
    showToast(`Rated "${movie?.title}" ${rating} stars`, 'success')
  }

  // Handle generating recommendations
  const handleGenerateRecommendations = async () => {
    if (Object.keys(ratings).length < 1) {
      showToast('Rate at least one film to unlock AI recommendations', 'error')
      return
    }

    setIsGenerating(true)
    const success = await generateRecommendations(ratings)
    setIsGenerating(false)

    if (success) {
      showToast('New recommendations generated!', 'success')
    }
  }

  // Handle saving recommendations
  const handleSaveRecommendation = (movie) => {
    const wasSaved = toggleSaveRecommendation(movie)
    const movieTitle = movie.title || movie
    showToast(
      wasSaved
        ? `Saved "${movieTitle}" to watchlist`
        : `Removed "${movieTitle}" from watchlist`,
      'success'
    )
  }

  // Handle removing movie from collection
  const handleRemoveMovie = (movieId) => {
    const movie = displayedMovies.find((m) => m.id === movieId)
    setDisplayedMovies((prev) => prev.filter((movie) => movie.id !== movieId))
    removeRating(movieId)
    showToast(`Removed "${movie?.title}" from collection`, 'info')
  }

  // Handle resetting recommendations
  const handleReset = () => {
    clearRecommendations()
    showToast('Recommendations cleared', 'info')
  }

  // Handle generating new recommendations
  const handleNewRecommendations = () => {
    clearRecommendations()
    handleGenerateRecommendations()
  }

  // Custom movie renderer for collection
  const renderCollectionMovie = (movie) => (
    <div
      key={movie.id}
      className='group relative break-inside-avoid mb-8 bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-600/30 hover:border-red-600/40 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/10 overflow-hidden'
      style={{
        filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))',
      }}
    >
      {/* Remove button */}
      <button
        onClick={() => handleRemoveMovie(movie.id)}
        className='absolute top-4 right-4 z-20 w-10 h-10 bg-gray-900/80 hover:bg-red-600/80 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-50 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-gray-600/50 hover:border-red-600/50 shadow-lg hover:shadow-red-600/25 hover:scale-110'
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
      <div className='aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-2xl overflow-hidden relative'>
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className='w-full h-full flex items-center justify-center text-8xl opacity-30'
          style={{ display: movie.poster ? 'none' : 'flex' }}
        >
          🎬
        </div>
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>

      <div className='p-6 space-y-4'>
        <div>
          <h3 className='text-gray-50 font-serif text-xl mb-2 line-clamp-2 leading-tight tracking-wide group-hover:text-red-600 transition-colors duration-300'>
            {movie.title}
          </h3>
          <div className='flex items-center space-x-3 text-sm text-gray-400'>
            <span className='font-medium'>{movie.year}</span>
            <div className='w-1 h-1 bg-red-600/50 rounded-full'></div>
            <span className='line-clamp-1'>{movie.genres?.join(', ')}</span>
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
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-red-600/70'
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
                <div className='absolute inset-0 bg-red-600/20 rounded-lg animate-pulse'></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

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
        {!recommendations.length ? (
          <div className='space-y-16'>
            <FilmHeader
              title={['Discover Your Next', 'Cinematic Journey']}
              subtitle='Let our AI curator guide you through a personalized collection of films tailored to your unique taste and cinematic preferences'
              accentColor='crimson'
            />

            {/* Enhanced Search Bar */}
            <div className='max-w-4xl mx-auto'>
              <form onSubmit={handleAddMovie} className='relative group'>
                {/* Film strip border effect */}
                <div className='absolute -inset-2 bg-gradient-to-r from-red-600/20 via-teal-500/20 to-red-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-700'></div>
                <div className='relative bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-600/50 p-4 shadow-2xl group-hover:border-teal-500/30 transition-all duration-500'>
                  <div className='flex items-center space-x-6'>
                    {/* Play icon */}
                    <div className='w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      <svg
                        className='w-6 h-6 text-gray-50 ml-1'
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
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder='Search the cinema archives...'
                        className='w-full bg-transparent text-gray-50 placeholder-gray-400 px-6 py-6 rounded-2xl focus:outline-none text-xl font-light tracking-wide focus:placeholder-opacity-50 transition-all duration-300'
                      />
                    </div>

                    <button
                      type='submit'
                      className='px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-600 text-gray-50 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 min-w-[160px] shadow-xl hover:shadow-red-600/25 border border-red-600/50 hover:border-red-600/70 group-hover:shadow-2xl'
                    >
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
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className='max-w-4xl mx-auto'>
                <div className='bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-600/30 overflow-hidden shadow-2xl'>
                  <div className='p-4 border-b border-gray-600/30'>
                    <h3 className='text-gray-50 font-medium text-lg'>
                      Search Results
                    </h3>
                    <p className='text-gray-400 text-sm'>
                      Click the stars to rate and add to your collection
                    </p>
                  </div>
                  {searchResults.slice(0, 5).map((movie, index) => (
                    <div
                      key={movie.id}
                      className={`p-4 ${
                        index !== Math.min(searchResults.length, 5) - 1
                          ? 'border-b border-gray-600/30'
                          : ''
                      } hover:bg-gray-900/40 transition-colors duration-200`}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-4 flex-1'>
                          {/* Movie Poster Thumbnail */}
                          {movie.poster && (
                            <div className='w-16 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden flex-shrink-0'>
                              <img
                                src={movie.poster}
                                alt={movie.title}
                                className='w-full h-full object-cover'
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.nextElementSibling.style.display =
                                    'flex'
                                }}
                              />
                              <div
                                className='w-full h-full flex items-center justify-center text-2xl opacity-30 bg-gray-900'
                                style={{ display: 'none' }}
                              >
                                🎬
                              </div>
                            </div>
                          )}

                          <div className='flex-1 min-w-0'>
                            <h4 className='text-gray-50 font-medium text-lg truncate'>
                              {movie.title}
                            </h4>
                            {movie.year && (
                              <p className='text-gray-400 text-sm'>
                                {movie.year}
                              </p>
                            )}
                            {movie.genres && (
                              <p className='text-gray-400 text-xs line-clamp-1'>
                                {movie.genres.join(', ')}
                              </p>
                            )}
                            {/* Show if already rated or in collection */}
                            {ratings[movie.id] && (
                              <div className='flex items-center space-x-1 mt-1'>
                                <span className='text-xs text-teal-500'>
                                  Already rated:
                                </span>
                                <span className='text-xs text-teal-500 font-medium'>
                                  {ratings[movie.id]} stars
                                </span>
                              </div>
                            )}
                            {displayedMovies.find((m) => m.id === movie.id) &&
                              !ratings[movie.id] && (
                                <span className='text-xs text-amber-400'>
                                  In collection - needs rating
                                </span>
                              )}
                          </div>
                        </div>

                        <div className='flex items-center space-x-2 ml-4'>
                          {ratings[movie.id] ? (
                            // Show current rating if already rated
                            <div className='flex items-center space-x-1'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={`text-2xl ${
                                    ratings[movie.id] >= star
                                      ? 'text-red-600'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  ⭐
                                </span>
                              ))}
                            </div>
                          ) : (
                            // Show rating buttons if not rated
                            <>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => {
                                    // Add to collection if not already there
                                    if (
                                      !displayedMovies.find(
                                        (m) => m.id === movie.id
                                      )
                                    ) {
                                      setDisplayedMovies((prev) => [
                                        ...prev,
                                        movie,
                                      ])
                                    }
                                    // Rate the movie
                                    handleRating(movie.id, star)
                                    // Clear search after rating
                                    clearSearch()
                                  }}
                                  className='text-2xl text-gray-500 hover:text-red-600 transition-colors duration-200 hover:scale-110 transform'
                                >
                                  ⭐
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Display */}
            {searchError && (
              <div className='text-center p-4 bg-red-600/10 border border-red-600/30 rounded-2xl max-w-md mx-auto'>
                <p className='text-red-600 text-sm'>{searchError}</p>
              </div>
            )}

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
                        strokeDasharray={`${
                          (stats.moviesRated / 10) * 251.2
                        }, 251.2`}
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
                        <div className='text-5xl font-serif text-red-600 mb-2'>
                          {stats.moviesRated}
                        </div>
                        <div className='text-sm text-gray-400 font-medium tracking-wider uppercase'>
                          Films Rated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Film Collection */}
                <div className='max-w-7xl mx-auto'>
                  <h2 className='text-3xl font-serif text-gray-50 mb-8 text-center tracking-wide'>
                    Your Film Collection
                  </h2>
                  <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8'>
                    {displayedMovies.map((movie) =>
                      renderCollectionMovie(movie)
                    )}
                  </div>
                </div>

                {/* Generate Recommendations Button */}
                <div className='text-center pt-12'>
                  <button
                    onClick={handleGenerateRecommendations}
                    disabled={isGenerating || stats.moviesRated < 1}
                    className='relative px-16 py-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-500 text-gray-900 rounded-3xl font-bold text-xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[400px] shadow-2xl hover:shadow-teal-500/30 border border-teal-500/50 hover:border-teal-500/70 group overflow-hidden'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                    <span className='relative z-10 flex items-center justify-center space-x-3'>
                      {isGenerating || isLoadingRecommendations ? (
                        <>
                          <div className='w-6 h-6 border-3 border-gray-900/30 border-t-charcoal rounded-full animate-spin'></div>
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
            <FilmHeader
              title={['Your AI-Curated', 'Cinematic Picks']}
              subtitle='Based on your ratings, our AI has discovered these exceptional films that match your unique cinematic taste'
              accentColor='teal'
            />

            {/* Recommendations Grid */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {recommendations.map((movie, index) => (
                <RecommendationCard
                  key={index}
                  movie={movie}
                  isSaved={isSaved(movie)}
                  onSave={handleSaveRecommendation}
                  onDismiss={() => {}} // No dismiss on rating page
                  variant='secondary'
                  showActions={true}
                  animationDelay={index * 100}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 pt-12'>
              <button
                onClick={handleNewRecommendations}
                disabled={isGenerating || isLoadingRecommendations}
                className='px-12 py-6 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-500 text-gray-900 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-teal-500/25 border border-teal-500/50 tracking-wide'
              >
                {isGenerating || isLoadingRecommendations ? (
                  <div className='flex items-center space-x-2'>
                    <div className='w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin'></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  'Generate New Picks'
                )}
              </button>
              <button
                onClick={handleReset}
                className='px-12 py-6 bg-gray-800/60 hover:bg-gray-800/80 text-gray-50 rounded-2xl font-semibold border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 hover:scale-105 tracking-wide shadow-lg backdrop-blur-xl'
              >
                Rate More Films
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {recommendationError && (
          <div className='text-center p-4 bg-red-600/10 border border-red-600/30 rounded-2xl max-w-md mx-auto'>
            <p className='text-red-600 text-sm'>{recommendationError}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RatingPage
