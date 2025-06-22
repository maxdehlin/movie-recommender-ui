import FilmCard from './FilmCard'

function RecommendationCard({
  movie,
  isSaved,
  onSave,
  onDismiss,
  variant = 'primary',
  showPoster = true,
  showActions = true,
  animationDelay = 0,
}) {
  const title = movie.title || movie
  const year = movie.year || null
  const genres = movie.genres || null
  const reason = movie.reason || null
  const isString = typeof movie === 'string'

  return (
    <FilmCard variant={variant} animationDelay={animationDelay}>
      <div className='space-y-6'>
        {/* Movie Poster */}
        {showPoster && (
          <div className='aspect-[2/3] bg-gradient-to-br from-charcoal-light to-charcoal rounded-2xl overflow-hidden relative -mx-2 -mt-2'>
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={title}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div
              className={`absolute inset-0 w-full h-full flex items-center justify-center text-6xl opacity-30 bg-charcoal flex-col space-y-2 ${
                movie.poster ? 'hidden' : 'flex'
              }`}
              style={{
                display: movie.poster ? 'none' : 'flex',
              }}
            >
              <span>🎬</span>
              <span className='text-xs text-muted-gray font-medium tracking-wider uppercase'>
                {genres || 'Film'}
              </span>
            </div>
            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          </div>
        )}

        {/* Movie Title */}
        <div className='space-y-2'>
          <h3 className='text-xl font-serif text-cream leading-tight tracking-wide group-hover:text-crimson transition-colors duration-300'>
            {title}
          </h3>
          {(year || genres) && (
            <div className='flex items-center space-x-2 text-sm text-muted-gray'>
              {year && <span className='font-medium'>{year}</span>}
              {year && genres && (
                <div className='w-1 h-1 bg-crimson/50 rounded-full'></div>
              )}
              {genres && <span className='line-clamp-1'>{genres}</span>}
            </div>
          )}
        </div>

        {/* AI Reasoning */}
        {reason && !isString && (
          <div className='p-4 bg-charcoal/40 rounded-2xl border border-gray-600/30'>
            <div className='flex items-start space-x-3'>
              <div className='w-6 h-6 bg-gradient-to-br from-crimson/20 to-crimson-dark/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-crimson/30'>
                <span className='text-xs'>✨</span>
              </div>
              <p className='text-muted-gray text-sm leading-relaxed line-clamp-3 italic'>
                "{reason}"
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className='flex items-center justify-between pt-4 border-t border-gray-600/30'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => onSave(movie)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 ${
                  isSaved
                    ? 'bg-crimson/20 text-crimson border border-crimson/30 hover:bg-crimson/30'
                    : 'bg-charcoal/60 text-muted-gray border border-gray-600/30 hover:bg-charcoal hover:text-cream hover:border-gray-500/50'
                }`}
              >
                <span className='text-base'>{isSaved ? '❤️' : '🤍'}</span>
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => onDismiss(movie)}
                className='w-10 h-10 bg-charcoal/60 hover:bg-charcoal-light/80 rounded-xl flex items-center justify-center text-muted-gray hover:text-cream transition-all duration-300 hover:scale-105 border border-gray-600/30 hover:border-gray-500/50'
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
            </div>

            <div className='flex items-center space-x-2'>
              <span className='text-crimson text-sm'>✨</span>
              <span className='text-xs text-muted-gray font-medium tracking-wider uppercase'>
                AI Pick
              </span>
            </div>
          </div>
        )}
      </div>
    </FilmCard>
  )
}

export default RecommendationCard
