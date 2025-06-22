import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilmHeader from '../components/FilmHeader'
import FilmCard from '../components/FilmCard'
import FilmButton from '../components/FilmButton'

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
            <div className='flex items-center space-x-3 bg-charcoal-light/60 px-6 py-3 rounded-2xl border border-gray-600/30 backdrop-blur-xl'>
              <div className='w-3 h-3 bg-crimson rounded-full animate-pulse'></div>
              <span className='text-muted-gray font-medium tracking-wider uppercase text-sm'>
                {savedMovies.length} Films Archived
              </span>
            </div>
          </div>
        )}

        {savedMovies.length === 0 ? (
          <div className='text-center py-32'>
            <div className='relative inline-block mb-12'>
              <div className='w-48 h-48 mx-auto bg-gradient-to-br from-crimson/10 to-teal/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600/30 shadow-2xl'>
                <div className='absolute inset-8 rounded-full border-2 border-cream/20'></div>
                <div className='absolute inset-12 rounded-full border border-cream/10'></div>
                <span className='text-8xl opacity-40 relative z-10'>🎬</span>
              </div>
              <div className='absolute -top-4 -left-4 w-8 h-8 bg-crimson/20 rounded-full animate-float'></div>
              <div className='absolute -top-4 -right-4 w-6 h-6 bg-teal/20 rounded-full animate-float-delay'></div>
              <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-teal/15 rounded-full animate-float'></div>
              <div className='absolute -bottom-4 -right-4 w-4 h-4 bg-crimson/15 rounded-full animate-float-delay'></div>
            </div>

            <div className='space-y-8'>
              <div className='space-y-6'>
                <h3 className='text-3xl font-serif text-cream tracking-wide'>
                  Your Vault Awaits
                </h3>
                <p className='text-muted-gray text-xl font-light max-w-lg mx-auto leading-relaxed'>
                  Begin rating films to receive AI recommendations, then save
                  your favorites to build your personal cinema collection
                </p>
              </div>

              <Link to='/rate'>
                <FilmButton
                  size='xlarge'
                  variant='primary'
                  icon={
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  }
                >
                  Discover Films
                </FilmButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className='space-y-12'>
            <div className='text-center'>
              <h2 className='text-3xl font-serif text-cream mb-4 tracking-wide'>
                Archived Collection
              </h2>
              <p className='text-muted-gray text-lg font-light'>
                Your personally curated selection of cinematic excellence
              </p>
            </div>

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
                      <h3 className='text-xl font-serif text-cream leading-tight flex-1 pr-4 line-clamp-2 group-hover:text-crimson transition-colors duration-300 tracking-wide'>
                        {title}
                      </h3>
                      <button
                        onClick={() => removeFromWatchlist(title)}
                        className='w-12 h-12 bg-charcoal/60 hover:bg-crimson/80 rounded-full flex items-center justify-center text-muted-gray hover:text-cream transition-all duration-300 hover:scale-110 backdrop-blur-md border border-gray-600/50 hover:border-crimson/50 shadow-lg hover:shadow-crimson/25'
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
                      <div className='flex items-center space-x-3 mb-6 text-sm text-muted-gray'>
                        {year && <span className='font-medium'>{year}</span>}
                        {year && genres && (
                          <div className='w-1 h-1 bg-crimson/50 rounded-full'></div>
                        )}
                        {genres && (
                          <span className='line-clamp-1'>{genres}</span>
                        )}
                      </div>
                    )}

                    {reason && (
                      <div className='mb-6 p-4 bg-charcoal/40 rounded-2xl border border-gray-600/30'>
                        <p className='text-muted-gray text-sm leading-relaxed line-clamp-3 italic'>
                          "{reason}"
                        </p>
                      </div>
                    )}

                    <div className='flex items-center justify-between pt-6 border-t border-gray-600/30'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-3 h-3 bg-gradient-to-r from-crimson to-teal rounded-full'></div>
                        <span className='text-xs text-muted-gray font-medium tracking-wider uppercase'>
                          Vault Collection
                        </span>
                      </div>
                      {rating ? (
                        <div className='flex items-center space-x-2'>
                          <span className='text-crimson text-lg'>★</span>
                          <span className='text-cream font-semibold text-sm'>
                            {rating}
                          </span>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <span className='text-crimson text-lg'>❤️</span>
                          <span className='text-cream font-medium text-sm'>
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

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite 1.5s;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Watchlist
