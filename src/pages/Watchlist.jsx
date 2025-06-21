import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    <div className='min-h-screen pt-8 pb-16 px-8 w-screen'>
      <div className='max-w-7xl mx-auto space-y-12'>
        <section className='text-center space-y-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-white tracking-tight'>
            Your
            <span className='bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent'>
              {' '}
              Watchlist
            </span>
          </h1>
          <p className='text-xl text-white/70 font-light max-w-2xl mx-auto'>
            Movies you've saved to watch later
          </p>
          {savedMovies.length > 0 && (
            <div className='flex items-center justify-center space-x-4 text-white/60'>
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-pink-400 rounded-full'></div>
                <span className='text-sm font-medium'>
                  {savedMovies.length} saved
                </span>
              </div>
            </div>
          )}
        </section>

        {savedMovies.length === 0 ? (
          <div className='text-center py-20'>
            <div className='w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-pink-400/20'>
              <span className='text-6xl opacity-60'>❤️</span>
            </div>
            <div className='space-y-6'>
              <div>
                <h3 className='text-2xl font-semibold text-white mb-4'>
                  No movies saved yet
                </h3>
                <p className='text-white/60 text-lg max-w-md mx-auto leading-relaxed'>
                  Save movies from your recommendations to build your
                  personalized watchlist
                </p>
              </div>
              <Link
                to='/rate'
                className='inline-flex px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/25 border border-pink-400/30 overflow-hidden group bg-no-repeat'
              >
                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
                <span className='relative z-10 drop-shadow-sm'>
                  Get Recommendations
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {savedMovies.map((movie, index) => {
              const title = getMovieTitle(movie)
              const year = getMovieYear(movie)
              const genres = getMovieGenres(movie)
              const rating = getMovieRating(movie)
              const reason = getMovieReason(movie)

              return (
                <article
                  key={index}
                  className='group backdrop-blur-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-3xl border border-pink-400/20 p-8 hover:from-pink-500/15 hover:to-rose-500/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-pink-400/30 shadow-lg'
                >
                  <div className='flex items-start justify-between mb-6'>
                    <h3 className='text-xl font-bold text-white leading-tight flex-1 pr-4 line-clamp-2'>
                      {title}
                    </h3>
                    <button
                      onClick={() => removeFromWatchlist(title)}
                      className='w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center text-red-300 hover:text-white transition-all duration-300 hover:scale-110 backdrop-blur-md border border-red-400/30 hover:border-red-300/50 shadow-lg hover:shadow-red-500/25 group bg-no-repeat'
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
                    <div className='flex items-center space-x-2 mb-4 text-sm text-white/60'>
                      {year && <span>{year}</span>}
                      {year && genres && (
                        <div className='w-1 h-1 bg-white/30 rounded-full'></div>
                      )}
                      {genres && <span className='line-clamp-1'>{genres}</span>}
                    </div>
                  )}

                  {reason && (
                    <p className='text-white/70 text-sm mb-4 leading-relaxed line-clamp-3'>
                      {reason}
                    </p>
                  )}

                  <div className='flex items-center justify-between pt-4 border-t border-pink-400/20'>
                    <div className='flex items-center space-x-2'>
                      <div className='w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full'></div>
                      <span className='text-sm text-white/60 font-medium'>
                        Saved to watchlist
                      </span>
                    </div>
                    {rating ? (
                      <div className='flex items-center space-x-1'>
                        <span className='text-amber-400 text-sm'>★</span>
                        <span className='text-white/70 text-sm font-medium'>
                          {rating}
                        </span>
                      </div>
                    ) : (
                      <div className='text-pink-400 text-sm font-medium'>
                        ❤️ Saved
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Action Buttons */}
        {savedMovies.length > 0 && (
          <section className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8'>
            <Link
              to='/rate'
              className='relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25 border border-indigo-400/30 overflow-hidden group bg-no-repeat'
            >
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
              <span className='relative z-10 drop-shadow-sm'>
                Get More Recommendations
              </span>
            </Link>
            <button
              onClick={() => {
                setSavedMovies([])
                localStorage.removeItem('savedRecommendations')
              }}
              className='px-8 py-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 hover:from-slate-600/40 hover:to-slate-500/40 text-white rounded-2xl font-semibold border border-slate-400/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 tracking-wide shadow-lg hover:shadow-slate-500/20 backdrop-blur-sm bg-no-repeat'
            >
              Clear All
            </button>
          </section>
        )}
      </div>

      <style jsx>{`
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
