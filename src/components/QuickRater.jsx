import { useState } from 'react'
import useMovieSearch from '../hooks/useMovieSearch'
import StarRating from './StarRating'

function QuickRater({
  onRate,
  placeholder = 'Search for a film to rate...',
  maxResults = 5,
  size = 'default',
  showPoster = true,
  className = '',
}) {
  const { searchQuery, searchResults, searchError, handleSearchChange } =
    useMovieSearch()

  const [ratedMovies, setRatedMovies] = useState({})

  const handleRating = (movie, rating) => {
    onRate(movie, rating)
    // Track that this movie has been rated for visual feedback
    setRatedMovies((prev) => ({
      ...prev,
      [movie.id]: rating,
    }))
  }

  const sizeClasses = {
    compact: {
      input: 'px-4 py-2 text-sm',
      poster: 'w-10 h-15',
      title: 'text-sm',
      container: 'p-2',
      stars: 'text-sm',
    },
    default: {
      input: 'px-6 py-4 text-lg',
      poster: 'w-16 h-24',
      title: 'text-base',
      container: 'p-4',
      stars: 'text-2xl',
    },
    large: {
      input: 'px-6 py-4 text-lg',
      poster: 'w-20 h-30',
      title: 'text-lg',
      container: 'p-4',
      stars: 'text-2xl',
    },
  }

  const currentSize = sizeClasses[size] || sizeClasses.default

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className='relative'>
        <input
          type='text'
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value, maxResults)}
          className={`w-full bg-charcoal/60 border border-gray-600/30 rounded-2xl text-cream placeholder-muted-gray focus:outline-none focus:border-teal/50 focus:bg-charcoal/80 transition-all duration-300 ${currentSize.input}`}
        />
        <div className='absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2'>
          {searchQuery && (
            <button
              onClick={() => {
                handleSearchChange('', maxResults)
                setRatedMovies({})
              }}
              className='text-muted-gray hover:text-cream transition-colors duration-200 p-1 rounded-full hover:bg-charcoal-light/30'
              title='Clear search'
            >
              <svg
                className='w-4 h-4'
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
          )}
          <svg
            className='w-6 h-6 text-muted-gray'
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
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className='bg-charcoal/80 rounded-2xl border border-gray-600/30 overflow-hidden'>
          {searchResults.map((movie, index) => (
            <div
              key={movie.id}
              className={`${currentSize.container} ${
                index !== searchResults.length - 1
                  ? 'border-b border-gray-600/30'
                  : ''
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3 flex-1'>
                  {/* Movie Poster Thumbnail */}
                  {showPoster && movie.poster && (
                    <div
                      className={`bg-gradient-to-br from-charcoal-light to-charcoal rounded-lg overflow-hidden flex-shrink-0 ${currentSize.poster}`}
                    >
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextElementSibling.style.display = 'flex'
                        }}
                      />
                      <div
                        className='w-full h-full flex items-center justify-center text-lg opacity-30 bg-charcoal'
                        style={{
                          display: 'none',
                        }}
                      >
                        🎬
                      </div>
                    </div>
                  )}

                  <div className='flex-1 min-w-0'>
                    <h4
                      className={`text-cream font-medium truncate ${currentSize.title}`}
                    >
                      {movie.title}
                    </h4>
                    {movie.year && (
                      <p className='text-muted-gray text-xs'>{movie.year}</p>
                    )}
                  </div>
                </div>

                <div className='ml-4'>
                  <StarRating
                    movie={movie}
                    currentRating={ratedMovies[movie.id] || 0}
                    onRate={handleRating}
                    size={
                      size === 'compact'
                        ? 'small'
                        : size === 'large'
                        ? 'large'
                        : 'default'
                    }
                    className={currentSize.stars}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Display */}
      {searchError && (
        <div className='text-center p-4 bg-crimson/10 border border-crimson/30 rounded-2xl'>
          <p className='text-crimson text-sm'>{searchError}</p>
        </div>
      )}
    </div>
  )
}

export default QuickRater
