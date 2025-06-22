import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilmHeader from '../components/FilmHeader'
import FilmCard from '../components/FilmCard'
import FilmButton from '../components/FilmButton'
import EmptyState from '../components/EmptyState'

function Watchlist() {
  const [savedMovies, setSavedMovies] = useState([])

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('savedRecommendations') || '[]'
    )
    setSavedMovies(saved)
  }, [])

  const removeFromWatchlist = (movieKey) => {
    const updated = savedMovies.filter((m) => {
      const key = typeof m === 'string' ? m : m.title || m
      return key !== movieKey
    })
    setSavedMovies(updated)
    localStorage.setItem('savedRecommendations', JSON.stringify(updated))
  }

  const getMovieTitle = (movie) => {
    return typeof movie === 'string' ? movie : movie.title || movie
  }

  const getMovieYear = (movie) => {
    return typeof movie === 'object' && movie.year ? movie.year : null
  }

  const getMovieGenres = (movie) => {
    return typeof movie === 'object' && movie.genres
      ? Array.isArray(movie.genres)
        ? movie.genres.join(', ')
        : movie.genres
      : null
  }

  const getMovieRating = (movie) => {
    return typeof movie === 'object' && movie.rating ? movie.rating : null
  }

  const getMovieReason = (movie) => {
    return typeof movie === 'object' && movie.reason ? movie.reason : null
  }

  return (
    <div className='min-h-screen pt-12 pb-20 px-8'>
      <div className='max-w-7xl mx-auto space-y-16'>
        <FilmHeader
          title={['Your Personal', 'Film Vault']}
          subtitle='A curated collection of cinematic treasures, handpicked by AI and saved for your viewing pleasure'
          accentColor='crimson'
        />

        {savedMovies.length > 0 && (
          <div className='flex items-center justify-center space-x-6'>
            <div className='flex items-center space-x-3 bg-gray-900-light/60 px-6 py-3 rounded-2xl border border-gray-600/30 backdrop-blur-xl'>
              <div className='w-3 h-3 bg-red-600 rounded-full animate-pulse'></div>
              <span className='text-gray-400 font-medium tracking-wider uppercase text-sm'>
                {savedMovies.length} Films Archived
              </span>
            </div>
          </div>
        )}

        {savedMovies.length === 0 ? (
          <EmptyState
            icon='🎬'
            title='Your Vault Awaits'
            subtitle='Begin rating films to receive AI recommendations, then save your favorites to build your personal cinema collection'
            actionText='Discover Films'
            actionHref='/rate'
            size='large'
            variant='primary'
          />
        ) : (
          <div className='space-y-12'>
            <FilmHeader
              title='Archived Collection'
              subtitle='Your personally curated selection of cinematic excellence'
            />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {savedMovies.map((movie, index) => {
                const title = getMovieTitle(movie)
                const year = getMovieYear(movie)
                const genres = getMovieGenres(movie)
                const rating = getMovieRating(movie)
                const reason = getMovieReason(movie)

                return (
                  <FilmCard key={index} variant='primary'>
                    <div className='flex items-start justify-between mb-8'>
                      <h3 className='text-xl font-serif text-gray-50 leading-tight flex-1 pr-4 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 tracking-wide'>
                        {title}
                      </h3>
                      <button
                        onClick={() => removeFromWatchlist(title)}
                        className='w-12 h-12 bg-gray-900/60 hover:bg-red-600/80 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-50 transition-all duration-300 hover:scale-110 backdrop-blur-md border border-gray-600/50 hover:border-red-600/50 shadow-lg hover:shadow-red-600/25'
                      >
                        <svg
                          className='w-5 h-5 group-hover:scale-110 transition-transform'
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

                    {(year || genres) && (
                      <div className='flex items-center space-x-3 mb-6 text-sm text-gray-400'>
                        {year && <span className='font-medium'>{year}</span>}
                        {year && genres && (
                          <div className='w-1 h-1 bg-red-600/50 rounded-full'></div>
                        )}
                        {genres && (
                          <span className='line-clamp-1'>{genres}</span>
                        )}
                      </div>
                    )}

                    {reason && (
                      <div className='mb-6 p-4 bg-gray-900/40 rounded-2xl border border-gray-600/30'>
                        <p className='text-gray-400 text-sm leading-relaxed line-clamp-3 italic'>
                          "{reason}"
                        </p>
                      </div>
                    )}

                    <div className='flex items-center justify-between pt-6 border-t border-gray-600/30'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-3 h-3 bg-gradient-to-r from-red-600 to-teal-500 rounded-full'></div>
                        <span className='text-xs text-gray-400 font-medium tracking-wider uppercase'>
                          Vault Collection
                        </span>
                      </div>
                      {rating ? (
                        <div className='flex items-center space-x-2'>
                          <span className='text-red-600 text-lg'>★</span>
                          <span className='text-gray-50 font-semibold text-sm'>
                            {rating}
                          </span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <span className='text-red-600 text-lg'>❤️</span>
                          <span className='text-gray-50 font-medium text-sm'>
                            Saved
                          </span>
                        </div>
                      )}
                    </div>
                  </FilmCard>
                )
              })}
            </div>
          </div>
        )}

        {savedMovies.length > 0 && (
          <section className='flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 pt-12'>
            <Link to='/rate'>
              <FilmButton
                size='large'
                variant='secondary'
                icon={
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
                  </svg>
                }
              >
                Discover More Films
              </FilmButton>
            </Link>

            <FilmButton
              size='large'
              variant='ghost'
              onClick={() => {
                setSavedMovies([])
                localStorage.removeItem('savedRecommendations')
              }}
            >
              Clear Vault
            </FilmButton>
          </section>
        )}
      </div>
    </div>
  )
}

export default Watchlist
