import { useState, useEffect } from 'react'

function Watchlist() {
  const [savedMovies, setSavedMovies] = useState([])

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('savedRecommendations') || '[]'
    )
    setSavedMovies(saved)
  }, [])

  const removeFromWatchlist = (movie) => {
    const updated = savedMovies.filter((m) => m !== movie)
    setSavedMovies(updated)
    localStorage.setItem('savedRecommendations', JSON.stringify(updated))
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
        </section>

        {savedMovies.length === 0 ? (
          <div className='text-center py-20'>
            <div className='w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-pink-400/20'>
              <span className='text-6xl opacity-60'>❤️</span>
            </div>
            <h3 className='text-2xl font-semibold text-white mb-4'>
              No movies saved yet
            </h3>
            <p className='text-white/60 text-lg'>
              Save movies from your recommendations to build your watchlist
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {savedMovies.map((movie, index) => (
              <div
                key={index}
                className='backdrop-blur-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-3xl border border-pink-400/20 p-8 hover:scale-105 transition-all duration-300 shadow-lg'
              >
                <div className='flex items-start justify-between mb-6'>
                  <h3 className='text-xl font-bold text-white leading-tight flex-1 pr-4'>
                    {movie}
                  </h3>
                  <button
                    onClick={() => removeFromWatchlist(movie)}
                    className='w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center text-red-300 hover:text-white transition-all duration-300 bg-no-repeat'
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
                </div>
                <div className='flex items-center justify-between text-sm text-white/60'>
                  <span>Added to watchlist</span>
                  <span className='text-pink-400'>❤️ Saved</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist
