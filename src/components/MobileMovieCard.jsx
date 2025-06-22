import { useState } from 'react'
import StarRating from './StarRating'
import cx from 'clsx'

function MobileMovieCard({
  movie,
  userRating,
  isInWatchlist,
  onRate,
  onWatchlistToggle,
  showWatchlistButton = true,
  className = '',
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={cx(
        'bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-600/30 transition-all duration-300',
        'hover:bg-gray-800/60 active:scale-[0.98] lg:hover:scale-[1.02]',
        className
      )}
    >
      {/* Mobile Layout - Compact */}
      <div className='p-4 sm:p-5'>
        <div className='flex items-start space-x-4'>
          {/* Movie Poster */}
          <div className='flex-shrink-0'>
            {movie.poster_path && !imageError ? (
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className='w-16 h-24 sm:w-20 sm:h-30 object-cover rounded-lg border border-gray-600/30'
                onError={() => setImageError(true)}
                loading='lazy'
              />
            ) : (
              <div className='w-16 h-24 sm:w-20 sm:h-30 bg-gray-700/50 rounded-lg border border-gray-600/30 flex items-center justify-center'>
                <span className='text-2xl opacity-30'>🎬</span>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className='flex-1 min-w-0'>
            <h3 className='text-gray-50 font-medium text-base sm:text-lg truncate mb-1'>
              {movie.title}
            </h3>

            <p className='text-gray-400 text-sm mb-2'>
              {movie.release_date?.split('-')[0] || 'Unknown Year'}
            </p>

            {/* Genres */}
            {movie.genres && (
              <div className='flex flex-wrap gap-1 mb-3'>
                {movie.genres.slice(0, 2).map((genre, index) => (
                  <span
                    key={index}
                    className='text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-md'
                  >
                    {genre}
                  </span>
                ))}
                {movie.genres.length > 2 && (
                  <span className='text-xs text-gray-500 px-2 py-1'>
                    +{movie.genres.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Actions Row */}
            <div className='flex items-center justify-between'>
              {/* Star Rating */}
              <div className='flex-1'>
                <StarRating
                  movie={movie}
                  currentRating={userRating}
                  onRate={onRate}
                  size='default'
                />
              </div>

              {/* Watchlist Button */}
              {showWatchlistButton && (
                <button
                  onClick={() => onWatchlistToggle(movie)}
                  className={cx(
                    'ml-3 p-3 rounded-xl transition-all duration-300 active:scale-90',
                    isInWatchlist
                      ? 'text-red-500 bg-red-500/20 border border-red-500/30'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10 border border-gray-600/30'
                  )}
                  aria-label={
                    isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
                  }
                >
                  <span className='text-lg'>{isInWatchlist ? '❤️' : '🤍'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMovieCard
