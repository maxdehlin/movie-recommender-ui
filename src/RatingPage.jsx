import React, { useState, useEffect } from 'react'

const BACKEND_URL = 'http://127.0.0.1:8000'

function RatingPage({ onLogout }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [ratings, setRatings] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [savedRecommendations, setSavedRecommendations] = useState(new Set())

  useEffect(() => {
    const savedRatings = localStorage.getItem('ratings')
    if (savedRatings) {
      const parsedRatings = JSON.parse(savedRatings)
      setRatings(parsedRatings)

      const ratedMovies = Object.keys(parsedRatings).map((title) => ({
        id: title,
        title: title,
      }))
      setSearchResults(ratedMovies)
    }

    const savedRecommendationsData = localStorage.getItem('recommendations')
    if (savedRecommendationsData) {
      setRecommendations(JSON.parse(savedRecommendationsData))
    }

    const savedList = localStorage.getItem('savedRecommendations')
    if (savedList) {
      setSavedRecommendations(new Set(JSON.parse(savedList)))
    }
  }, [])

  useEffect(() => {
    const ratedMovies = Object.keys(ratings).map((title) => ({
      id: title,
      title: title,
    }))
    setSearchResults(ratedMovies)
  }, [ratings])

  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem('recommendations', JSON.stringify(recommendations))
    }
  }, [recommendations])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError(null)
    setSuccess(null)

    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(
        `${BACKEND_URL}/verify_movie?movie=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()

      if (data.success) {
        setSearchResults((prev) => {
          if (ratings[searchQuery]) {
            setError('You have already rated this movie')
            return prev
          }
          if (!prev.find((movie) => movie.title === searchQuery)) {
            setSuccess(
              `Movie "${searchQuery}" found and added to your rating list!`
            )
            return [...prev, { id: searchQuery, title: searchQuery }]
          }
          setError('This movie is already in your rating list')
          return prev
        })
        setSearchQuery('')
      } else {
        setError('Movie not found. Please try another title.')
      }
    } catch {
      setError('Failed to verify movie. Please try again.')
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
      setError('Please rate at least 1 movie to get recommendations')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('authToken')
      const seeds = Object.entries(ratings).map(([title, rating]) => ({
        title,
        rating,
      }))

      const response = await fetch(`${BACKEND_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seeds }),
      })
      const data = await response.json()

      if (data && data.detail && Array.isArray(data.detail)) {
        setRecommendations(data.detail)
        localStorage.setItem('ratings', JSON.stringify(ratings))
      } else {
        setError('Invalid response format from server')
      }
    } catch {
      setError('Failed to get recommendations. Please try again.')
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
    const newSaved = new Set(savedRecommendations)
    if (newSaved.has(movie)) {
      newSaved.delete(movie)
    } else {
      newSaved.add(movie)
    }
    setSavedRecommendations(newSaved)
    localStorage.setItem('savedRecommendations', JSON.stringify([...newSaved]))
  }

  const removeMovie = (movieId) => {
    setSearchResults((prev) => prev.filter((movie) => movie.id !== movieId))
    setRatings((prev) => {
      const newRatings = { ...prev }
      delete newRatings[movieId]
      localStorage.setItem('ratings', JSON.stringify(newRatings))
      return newRatings
    })
  }

  const ratedCount = Object.keys(ratings).length
  const progressPercentage = Math.min((ratedCount / 10) * 100, 100)

  return (
    <div className='min-h-screen w-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative'>
      {/* Subtle background pattern */}
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Header */}
      <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg'>
        <div className='max-w-7xl mx-auto px-8 py-5 flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
              <span className='text-white font-bold text-xl'>🎬</span>
            </div>
            <div>
              <h1 className='text-2xl font-bold text-white tracking-tight'>
                MovieMind
              </h1>
              <p className='text-xs text-white/60 font-medium'>
                AI-Powered Recommendations
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className='px-6 py-2.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-white border border-red-500/30 hover:border-red-400/50 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium text-sm tracking-wide shadow-lg hover:shadow-red-500/20'
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className='pt-28 pb-16 px-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Alerts */}
          {error && (
            <div className='mb-8 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl text-red-200 animate-fade-in shadow-lg'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-red-400 rounded-full'></div>
                <span className='font-medium'>{error}</span>
              </div>
            </div>
          )}
          {success && (
            <div className='mb-8 p-4 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl text-emerald-200 animate-fade-in shadow-lg'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-emerald-400 rounded-full'></div>
                <span className='font-medium'>{success}</span>
              </div>
            </div>
          )}

          {!recommendations.length ? (
            <div className='space-y-12'>
              {/* Hero Section */}
              <section className='text-center space-y-6 max-w-4xl mx-auto'>
                <h2 className='text-5xl font-bold text-white tracking-tight leading-tight'>
                  Discover Your Next
                  <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block'>
                    Favorite Movie
                  </span>
                </h2>
                <p className='text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto'>
                  Rate movies you've watched and our AI will recommend
                  personalized picks just for you
                </p>
              </section>

              {/* Search Section */}
              <section className='max-w-3xl mx-auto'>
                <form onSubmit={handleSearch} className='relative group'>
                  <div className='absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500'></div>
                  <div className='relative backdrop-blur-2xl bg-white/8 rounded-3xl border border-white/15 p-3 shadow-2xl'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-1 relative'>
                        <input
                          type='text'
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder='Search for a movie to rate...'
                          className='w-full bg-transparent text-white placeholder-white/50 px-8 py-5 rounded-2xl focus:outline-none text-lg font-light tracking-wide focus:placeholder-white/30 transition-colors duration-300'
                        />
                      </div>
                      <button
                        type='submit'
                        disabled={isSearching}
                        className='px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] shadow-xl hover:shadow-indigo-500/25 border border-indigo-400/20'
                      >
                        {isSearching ? (
                          <div className='flex items-center justify-center space-x-2'>
                            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                            <span>Searching</span>
                          </div>
                        ) : (
                          'Search'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </section>

              {/* Empty State or Rating Grid */}
              {searchResults.length === 0 ? (
                <section className='text-center py-24 space-y-8'>
                  <div className='w-40 h-40 mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10'>
                    <span className='text-7xl opacity-60'>🎭</span>
                  </div>
                  <div className='space-y-4'>
                    <h3 className='text-3xl font-bold text-white tracking-tight'>
                      Ready to Begin?
                    </h3>
                    <p className='text-white/60 text-lg font-light max-w-md mx-auto leading-relaxed'>
                      Search for movies you've watched and rate them to get
                      personalized recommendations
                    </p>
                  </div>
                </section>
              ) : (
                <div className='space-y-10'>
                  {/* Progress Indicator */}
                  <section className='flex justify-center'>
                    <div className='relative w-36 h-36'>
                      <svg
                        className='w-36 h-36 transform -rotate-90'
                        viewBox='0 0 36 36'
                      >
                        <path
                          d='M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831'
                          fill='none'
                          stroke='rgba(255,255,255,0.08)'
                          strokeWidth='1.5'
                        />
                        <path
                          d='M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831'
                          fill='none'
                          stroke='url(#progressGradient)'
                          strokeWidth='1.5'
                          strokeDasharray={`${progressPercentage}, 100`}
                          className='transition-all duration-700 ease-out'
                          strokeLinecap='round'
                        />
                        <defs>
                          <linearGradient
                            id='progressGradient'
                            x1='0%'
                            y1='0%'
                            x2='100%'
                            y2='0%'
                          >
                            <stop offset='0%' stopColor='#6366f1' />
                            <stop offset='50%' stopColor='#8b5cf6' />
                            <stop offset='100%' stopColor='#ec4899' />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='text-center'>
                          <div className='text-3xl font-bold text-white mb-1'>
                            {ratedCount}
                          </div>
                          <div className='text-sm text-white/50 font-medium tracking-wide'>
                            movies rated
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Movie Grid */}
                  <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {searchResults.map((movie) => (
                      <article
                        key={movie.id}
                        className='group relative backdrop-blur-2xl bg-white/6 rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/20'
                      >
                        <button
                          onClick={() => removeMovie(movie.id)}
                          className='absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-red-500/20 to-rose-500/20 hover:from-red-500/40 hover:to-rose-500/40 rounded-full flex items-center justify-center text-red-300 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-red-400/30 hover:border-red-300/50 shadow-lg hover:shadow-red-500/25 hover:scale-110'
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

                        <h3 className='text-white font-semibold text-lg mb-6 pr-10 line-clamp-2 leading-snug tracking-tight'>
                          {movie.title}
                        </h3>

                        <div className='flex items-center space-x-1'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRating(movie.id, star)}
                              className={`relative p-1 rounded-lg transition-all duration-300 hover:scale-125 active:scale-110 group ${
                                ratings[movie.id] >= star
                                  ? 'text-amber-400'
                                  : 'text-white/30 hover:text-amber-300'
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
                                <div className='absolute inset-0 bg-amber-400/20 rounded-lg animate-pulse'></div>
                              )}
                            </button>
                          ))}
                        </div>
                      </article>
                    ))}
                  </section>

                  {/* Submit Button */}
                  <section className='text-center pt-8'>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || ratedCount < 1}
                      className='px-16 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-3xl font-bold text-lg transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[300px] shadow-2xl hover:shadow-purple-500/30 border border-indigo-400/20 tracking-wide'
                    >
                      {isLoading ? (
                        <div className='flex items-center justify-center space-x-3'>
                          <div className='w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin'></div>
                          <span>Generating Recommendations...</span>
                        </div>
                      ) : (
                        'Get My Recommendations'
                      )}
                    </button>
                  </section>
                </div>
              )}
            </div>
          ) : (
            /* Recommendations Section */
            <div className='space-y-12'>
              <section className='text-center space-y-6'>
                <h2 className='text-5xl font-bold text-white tracking-tight'>
                  Movies
                  <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                    {' '}
                    You'll Love
                  </span>
                </h2>
                <p className='text-xl text-white/70 font-light max-w-2xl mx-auto'>
                  Based on your ratings, here are our top personalized picks for
                  you
                </p>
              </section>

              <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {recommendations.map((movie, index) => (
                  <article
                    key={index}
                    className='group relative backdrop-blur-2xl bg-gradient-to-br from-white/8 to-white/4 rounded-3xl border border-white/15 p-8 hover:from-white/12 hover:to-white/8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/25'
                  >
                    <div className='absolute top-5 right-5'>
                      <button
                        onClick={() => toggleSaveRecommendation(movie)}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border shadow-lg group ${
                          savedRecommendations.has(movie)
                            ? 'bg-gradient-to-r from-pink-500/25 to-rose-500/25 border-pink-400/40 text-pink-300 scale-105 shadow-pink-500/25'
                            : 'bg-gradient-to-r from-white/8 to-white/5 border-white/20 text-white/60 hover:from-white/15 hover:to-white/10 hover:text-white hover:scale-105 hover:border-white/30'
                        }`}
                      >
                        <svg
                          className={`w-6 h-6 transition-all duration-300 ${
                            savedRecommendations.has(movie)
                              ? 'fill-current group-hover:scale-110'
                              : 'stroke-current fill-none group-hover:scale-110'
                          }`}
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={
                              savedRecommendations.has(movie) ? 0 : 2
                            }
                            d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
                          />
                        </svg>
                      </button>
                    </div>

                    <h3 className='text-white font-bold text-xl mb-4 pr-16 line-clamp-3 leading-tight tracking-tight'>
                      {movie}
                    </h3>

                    <div className='flex items-center justify-between pt-4 border-t border-white/10'>
                      <div className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full'></div>
                        <span className='text-sm text-white/60 font-medium'>
                          Recommendation #{index + 1}
                        </span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <span className='text-amber-400 text-lg'>★★★★★</span>
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <section className='flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 pt-8'>
                <button
                  onClick={handleNewRecommendations}
                  disabled={isLoading}
                  className='px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-indigo-500/25 border border-indigo-400/20 tracking-wide'
                >
                  Get New Recommendations
                </button>
                <button
                  onClick={handleReset}
                  className='px-10 py-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 hover:from-slate-600/40 hover:to-slate-500/40 text-white rounded-2xl font-semibold border border-slate-400/30 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 tracking-wide shadow-lg hover:shadow-slate-500/20 backdrop-blur-sm'
                >
                  Rate More Movies
                </button>
              </section>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
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

export default RatingPage
