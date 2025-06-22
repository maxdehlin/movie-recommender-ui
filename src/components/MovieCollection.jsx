function MovieCollection({
  movies = [],
  title,
  emptyMessage = 'No movies found',
  emptyIcon = '🎬',
  searchPlaceholder = 'Search movies...',
  showSearch = false,
  onMovieClick = null,
  renderMovie = null,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}) {
  if (!movies || movies.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-6xl mb-4 opacity-30'>{emptyIcon}</div>
        <p className='text-muted-gray text-lg'>{emptyMessage}</p>
      </div>
    )
  }

  const defaultRenderMovie = (movie, index) => (
    <div
      key={movie.id || index}
      className={`
        bg-gradient-to-br from-charcoal/40 to-charcoal-light/40 
        rounded-2xl p-6 border border-gray-600/30 
        hover:border-gray-500/50 hover:shadow-xl 
        transition-all duration-300 hover:scale-105
        ${onMovieClick ? 'cursor-pointer' : ''}
      `}
      onClick={() => onMovieClick && onMovieClick(movie)}
    >
      <div className='space-y-4'>
        {/* Movie poster thumbnail */}
        {movie.poster && (
          <div className='aspect-[2/3] bg-gradient-to-br from-charcoal-light to-charcoal rounded-xl overflow-hidden'>
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
              className='w-full h-full flex items-center justify-center text-4xl opacity-30 bg-charcoal'
              style={{ display: 'none' }}
            >
              🎬
            </div>
          </div>
        )}

        {/* Movie details */}
        <div className='space-y-2'>
          <h3 className='text-lg font-serif text-cream leading-tight'>
            {movie.title || movie}
          </h3>
          {movie.year && (
            <p className='text-sm text-muted-gray'>{movie.year}</p>
          )}
          {movie.rating && (
            <div className='flex items-center space-x-1'>
              <span className='text-teal'>⭐</span>
              <span className='text-sm text-muted-gray'>{movie.rating}/5</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className='space-y-6'>
      {/* Header */}
      {title && (
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-serif text-cream'>{title}</h2>
          <span className='text-sm text-muted-gray'>
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
          </span>
        </div>
      )}

      {/* Search */}
      {showSearch && (
        <div className='relative'>
          <input
            type='text'
            placeholder={searchPlaceholder}
            className='w-full px-6 py-4 bg-charcoal/60 border border-gray-600/30 rounded-2xl text-cream placeholder-muted-gray focus:outline-none focus:border-teal/50 focus:bg-charcoal/80 transition-all duration-300'
          />
          <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
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
      )}

      {/* Movie Grid */}
      <div className={`grid ${gridCols} gap-6`}>
        {movies.map((movie, index) =>
          renderMovie
            ? renderMovie(movie, index)
            : defaultRenderMovie(movie, index)
        )}
      </div>
    </div>
  )
}

export default MovieCollection
