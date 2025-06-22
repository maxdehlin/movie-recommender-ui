import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilmHeader from '../components/FilmHeader'
import FilmCard from '../components/FilmCard'
import api from '../utils/api'

function Dashboard() {
  const [stats, setStats] = useState({
    moviesRated: 0,
    recommendationsReceived: 0,
    savedMovies: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [savedRecommendations, setSavedRecommendations] = useState(new Set())
  const [availableMovies, setAvailableMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [ratings, setRatings] = useState({})

  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    const loadInitialData = async () => {
      // Load user stats from localStorage
      const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}')
      const recommendationsData = JSON.parse(
        localStorage.getItem('recommendations') || '[]'
      )
      const savedMovies = JSON.parse(
        localStorage.getItem('savedRecommendations') || '[]'
      )

      setRatings(savedRatings)
      setStats({
        moviesRated: Object.keys(savedRatings).length,
        recommendationsReceived: recommendationsData.length,
        savedMovies: savedMovies.length,
      })

      // Load recommendations
      setRecommendations(recommendationsData.slice(0, 3)) // Show only first 3 for dashboard

      // Load saved recommendations
      setSavedRecommendations(new Set(savedMovies))

      // Load available movies for search
      try {
        const movieData = await api.fetchMovies()
        setAvailableMovies(movieData.movies || movieData)
      } catch (error) {
        console.error('Failed to load movies:', error)
      }

      // Create recent activity from ratings
      const activity = Object.entries(savedRatings)
        .slice(-5)
        .reverse()
        .map(([movie, rating]) => ({
          type: 'rating',
          movie,
          rating,
          time: 'Recently',
        }))

      setRecentActivity(activity)
    }

    loadInitialData()
  }, [])

  const handleSaveRecommendation = (movie) => {
    const movieKey = movie.title || movie
    const newSaved = new Set(savedRecommendations)

    if (newSaved.has(movieKey)) {
      newSaved.delete(movieKey)
    } else {
      newSaved.add(movieKey)
    }

    setSavedRecommendations(newSaved)
    localStorage.setItem('savedRecommendations', JSON.stringify([...newSaved]))
  }

  const handleDismissRecommendation = (movieToRemove) => {
    const updatedRecommendations = recommendations.filter(
      (movie) =>
        (movie.title || movie) !== (movieToRemove.title || movieToRemove)
    )
    setRecommendations(updatedRecommendations)

    // Also update the full recommendations list in localStorage
    const allRecommendations = JSON.parse(
      localStorage.getItem('recommendations') || '[]'
    )
    const filteredRecommendations = allRecommendations.filter(
      (movie) =>
        (movie.title || movie) !== (movieToRemove.title || movieToRemove)
    )
    localStorage.setItem(
      'recommendations',
      JSON.stringify(filteredRecommendations)
    )
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    setSearchError('')

    if (query.trim().length > 0) {
      const searchTerm = query.trim().toLowerCase()
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
      setSearchResults(matchingMovies.slice(0, 5)) // Show top 5 results
    } else {
      setSearchResults([])
    }
  }

  const handleQuickRating = (movie, rating) => {
    const newRatings = {
      ...ratings,
      [movie.id]: rating,
    }
    setRatings(newRatings)
    localStorage.setItem('ratings', JSON.stringify(newRatings))

    // Update stats
    setStats((prev) => ({
      ...prev,
      moviesRated: Object.keys(newRatings).length,
    }))

    // Add to recent activity
    const newActivity = {
      type: 'rating',
      movie: movie.title,
      rating,
      time: 'Just now',
    }
    setRecentActivity((prev) => [newActivity, ...prev.slice(0, 4)])

    // Clear search
    setSearchQuery('')
    setSearchResults([])
  }

  const quickActions = [
    {
      title: 'Rate Films',
      description: 'Build your taste profile',
      icon: '⭐',
      href: '/rate',
      color: 'teal',
      bgGradient: 'from-teal/10 to-teal-dark/10',
      borderColor: 'teal/30',
      hoverShadow: 'teal/20',
    },
    {
      title: 'Your Watchlist',
      description: 'Curated collection',
      icon: '❤️',
      href: '/watchlist',
      color: 'crimson',
      bgGradient: 'from-crimson/10 to-crimson-dark/10',
      borderColor: 'crimson/30',
      hoverShadow: 'crimson/20',
    },
  ]

  console.log('recommendations', recommendations)
  return (
    <div className='min-h-screen pt-4 pb-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-12 sm:space-y-16'>
        {/* Welcome Section - Cinematic Style */}
        <section className='text-center space-y-12'>
          <div className='relative inline-block'>
            {/* Film reel decorations */}
            <div className='absolute -left-16 top-4 w-10 h-10 rounded-full border-4 border-teal/20 animate-spin-slow hidden lg:block'>
              <div className='absolute inset-2 rounded-full border-2 border-teal/30'></div>
            </div>
            <div className='absolute -right-16 bottom-4 w-8 h-8 rounded-full border-3 border-crimson/20 animate-spin-slow hidden lg:block'>
              <div className='absolute inset-2 rounded-full border border-crimson/30'></div>
            </div>

            <FilmHeader
              title={['Welcome to Your', 'Cinema Archive']}
              subtitle='Your personal vault of cinematic discoveries, where every film tells a story and AI crafts the perfect next chapter'
              accentColor='teal'
            />
          </div>
        </section>

        {/* Progressive Stats & Onboarding */}
        {stats.moviesRated === 0 ? (
          /* New User Onboarding */
          <section className='space-y-8'>
            <div className='bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 p-8 sm:p-12 shadow-2xl'>
              <div className='text-center space-y-8'>
                <div className='relative inline-block'>
                  <div className='w-24 h-24 bg-gradient-to-br from-teal/20 to-crimson/20 rounded-full flex items-center justify-center mx-auto border-3 border-gray-600/30 shadow-xl'>
                    <span className='text-5xl'>🎬</span>
                  </div>
                  <div className='absolute -top-2 -right-2 w-6 h-6 bg-teal/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-crimson/30 rounded-full animate-pulse'></div>
                </div>

                <div className='space-y-4'>
                  <h2 className='text-2xl sm:text-3xl font-serif text-cream tracking-wide'>
                    Start Your Cinematic Journey
                  </h2>
                  <p className='text-muted-gray text-lg max-w-2xl mx-auto leading-relaxed'>
                    Rate a few films you've watched to unlock personalized AI
                    recommendations tailored to your unique taste
                  </p>
                </div>

                {/* Progress Steps */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                  <div className='flex flex-col items-center space-y-3 p-6 bg-charcoal/40 rounded-2xl border border-gray-600/30'>
                    <div className='w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center border-2 border-teal/30'>
                      <span className='text-xl'>⭐</span>
                    </div>
                    <div className='text-center'>
                      <h3 className='font-semibold text-cream text-sm'>
                        Rate Films
                      </h3>
                      <p className='text-xs text-muted-gray'>
                        Start with 5 ratings
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-col items-center space-y-3 p-6 bg-charcoal/40 rounded-2xl border border-gray-600/30 opacity-60'>
                    <div className='w-12 h-12 bg-crimson/20 rounded-full flex items-center justify-center border-2 border-crimson/30'>
                      <span className='text-xl'>✨</span>
                    </div>
                    <div className='text-center'>
                      <h3 className='font-semibold text-cream text-sm'>
                        Get Recommendations
                      </h3>
                      <p className='text-xs text-muted-gray'>
                        AI analyzes your taste
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-col items-center space-y-3 p-6 bg-charcoal/40 rounded-2xl border border-gray-600/30 opacity-40'>
                    <div className='w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center border-2 border-teal/30'>
                      <span className='text-xl'>❤️</span>
                    </div>
                    <div className='text-center'>
                      <h3 className='font-semibold text-cream text-sm'>
                        Build Collection
                      </h3>
                      <p className='text-xs text-muted-gray'>
                        Save your discoveries
                      </p>
                    </div>
                  </div>
                </div>

                {/* Inline Rating Widget */}
                <div className='max-w-2xl mx-auto space-y-6'>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Search for a film to rate...'
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className='w-full px-6 py-4 bg-charcoal/60 border border-gray-600/30 rounded-2xl text-cream placeholder-muted-gray focus:outline-none focus:border-teal/50 focus:bg-charcoal/80 transition-all duration-300 text-lg'
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

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className='bg-charcoal/80 rounded-2xl border border-gray-600/30 overflow-hidden'>
                      {searchResults.map((movie, index) => (
                        <div
                          key={movie.id}
                          className={`p-4 ${
                            index !== searchResults.length - 1
                              ? 'border-b border-gray-600/30'
                              : ''
                          }`}
                        >
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-4 flex-1'>
                              {/* Movie Poster Thumbnail */}
                              {movie.poster && (
                                <div className='w-16 h-24 bg-gradient-to-br from-charcoal-light to-charcoal rounded-lg overflow-hidden flex-shrink-0'>
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
                                    className='w-full h-full flex items-center justify-center text-2xl opacity-30 bg-charcoal'
                                    style={{
                                      display: 'none',
                                    }}
                                  >
                                    🎬
                                  </div>
                                </div>
                              )}

                              <div className='flex-1 min-w-0'>
                                <h4 className='text-cream font-medium truncate'>
                                  {movie.title}
                                </h4>
                                {movie.year && (
                                  <p className='text-muted-gray text-sm'>
                                    {movie.year}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className='flex items-center space-x-2 ml-4'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleQuickRating(movie, star)}
                                  className='text-2xl text-gray-500 hover:text-teal transition-colors duration-200 hover:scale-110 transform'
                                >
                                  ⭐
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchError && (
                    <div className='text-center p-4 bg-crimson/10 border border-crimson/30 rounded-2xl'>
                      <p className='text-crimson'>{searchError}</p>
                    </div>
                  )}

                  <div className='text-center'>
                    <p className='text-muted-gray text-sm mb-4'>
                      Or browse our full collection
                    </p>
                    <Link
                      to='/rate'
                      className='inline-flex items-center space-x-2 px-6 py-3 bg-charcoal/60 hover:bg-charcoal text-muted-gray hover:text-cream border border-gray-600/30 hover:border-gray-500/50 rounded-xl transition-all duration-300 hover:scale-105 font-medium'
                    >
                      <span>Browse All Films</span>
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
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : stats.moviesRated < 5 ? (
          /* Progression State - Needs More Ratings */
          <section className='space-y-8'>
            <div className='bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 p-8 shadow-2xl'>
              <div className='text-center space-y-6'>
                <div className='flex items-center justify-center space-x-4'>
                  <div className='w-16 h-16 bg-gradient-to-br from-teal/20 to-teal-dark/20 rounded-full flex items-center justify-center border-2 border-teal/30'>
                    <span className='text-2xl'>⭐</span>
                  </div>
                  <div className='flex-1 max-w-xs'>
                    <div className='flex justify-between text-sm text-muted-gray mb-2'>
                      <span>Progress to AI Recommendations</span>
                      <span>{stats.moviesRated}/5</span>
                    </div>
                    <div className='w-full bg-charcoal rounded-full h-3 border border-gray-600/30'>
                      <div
                        className='bg-gradient-to-r from-teal to-teal-dark h-3 rounded-full transition-all duration-700 shadow-lg shadow-teal/20'
                        style={{ width: `${(stats.moviesRated / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <h2 className='text-xl font-serif text-cream'>
                    Great Start! Rate {5 - stats.moviesRated} More Films
                  </h2>
                  <p className='text-muted-gray'>
                    You're on your way to unlocking personalized AI
                    recommendations
                  </p>
                </div>

                {/* Quick Rating Widget for Progressing Users */}
                <div className='space-y-4'>
                  <div className='relative'>
                    <input
                      type='text'
                      placeholder='Quick rate another film...'
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className='w-full px-6 py-3 bg-charcoal/60 border border-gray-600/30 rounded-xl text-cream placeholder-muted-gray focus:outline-none focus:border-teal/50 focus:bg-charcoal/80 transition-all duration-300'
                    />
                  </div>

                  {searchResults.length > 0 && (
                    <div className='bg-charcoal/80 rounded-xl border border-gray-600/30 overflow-hidden'>
                      {searchResults.slice(0, 3).map((movie, index) => (
                        <div
                          key={movie.id}
                          className={`p-3 ${
                            index !== Math.min(searchResults.length, 3) - 1
                              ? 'border-b border-gray-600/30'
                              : ''
                          }`}
                        >
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3 flex-1'>
                              {/* Compact Movie Poster */}
                              {movie.poster && (
                                <div className='w-12 h-18 bg-gradient-to-br from-charcoal-light to-charcoal rounded-md overflow-hidden flex-shrink-0'>
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
                                <h4 className='text-cream font-medium text-sm truncate'>
                                  {movie.title}
                                </h4>
                              </div>
                            </div>

                            <div className='flex items-center space-x-1 ml-4'>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleQuickRating(movie, star)}
                                  className='text-lg text-gray-500 hover:text-teal transition-colors duration-200 hover:scale-110 transform'
                                >
                                  ⭐
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    to='/rate'
                    className='inline-flex items-center space-x-2 px-6 py-3 bg-teal/20 hover:bg-teal/30 text-teal border border-teal/30 hover:border-teal/50 rounded-xl transition-all duration-300 hover:scale-105 font-medium'
                  >
                    <span>Browse More Films</span>
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
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* Established User - Show Stats */
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
            <div
              className='group bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-teal/40 p-6 sm:p-8 lg:p-10 text-center space-y-4 sm:space-y-6 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-700 shadow-2xl hover:shadow-teal/20 opacity-0 animate-fade-in-up touch-manipulation active:scale-[0.98]'
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              <div className='relative'>
                <div className='w-20 h-20 bg-gradient-to-br from-teal/20 to-teal-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-teal/30 group-hover:border-teal/50 transition-all duration-500 group-hover:scale-110'>
                  <span className='text-4xl group-hover:animate-pulse-glow'>
                    ⭐
                  </span>
                </div>
                <div className='absolute -top-2 -right-2 w-3 h-3 bg-teal/40 rounded-full animate-pulse-glow'></div>
                <div
                  className='absolute -bottom-2 -left-2 w-2 h-2 bg-crimson/40 rounded-full animate-pulse-glow'
                  style={{ animationDelay: '1s' }}
                ></div>
              </div>
              <div className='transform group-hover:scale-105 transition-transform duration-500'>
                <div className='text-4xl font-serif text-teal mb-2 tracking-wide group-hover:text-teal-light transition-colors duration-300'>
                  {stats.moviesRated}
                </div>
                <div className='text-muted-gray font-medium text-lg tracking-wider uppercase group-hover:text-muted-gray-light transition-colors duration-300'>
                  Films Rated
                </div>
              </div>
            </div>

            <div
              className='group bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-crimson/40 p-6 sm:p-8 lg:p-10 text-center space-y-4 sm:space-y-6 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-700 shadow-2xl hover:shadow-crimson/20 opacity-0 animate-fade-in-up touch-manipulation active:scale-[0.98]'
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              <div className='relative'>
                <div className='w-20 h-20 bg-gradient-to-br from-crimson/20 to-crimson-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-crimson/30 group-hover:border-crimson/50 transition-all duration-500 group-hover:scale-110'>
                  <span className='text-4xl group-hover:animate-pulse-glow'>
                    🎯
                  </span>
                </div>
                <div className='absolute -top-2 -left-2 w-3 h-3 bg-crimson/40 rounded-full animate-pulse-glow'></div>
                <div
                  className='absolute -bottom-2 -right-2 w-2 h-2 bg-teal/40 rounded-full animate-pulse-glow'
                  style={{ animationDelay: '1.5s' }}
                ></div>
              </div>
              <div className='transform group-hover:scale-105 transition-transform duration-500'>
                <div className='text-4xl font-serif text-crimson mb-2 tracking-wide group-hover:text-crimson-light transition-colors duration-300'>
                  {stats.recommendationsReceived}
                </div>
                <div className='text-muted-gray font-medium text-lg tracking-wider uppercase group-hover:text-muted-gray-light transition-colors duration-300'>
                  AI Recommendations
                </div>
              </div>
            </div>

            <div
              className='group bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-teal/40 p-6 sm:p-8 lg:p-10 text-center space-y-4 sm:space-y-6 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-700 shadow-2xl hover:shadow-teal/20 opacity-0 animate-fade-in-up touch-manipulation active:scale-[0.98]'
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <div className='relative'>
                <div className='w-20 h-20 bg-gradient-to-br from-teal/20 to-crimson/20 rounded-full flex items-center justify-center mx-auto border-2 border-teal/30 group-hover:border-teal/50 transition-all duration-500 group-hover:scale-110'>
                  <span className='text-4xl group-hover:animate-pulse-glow'>
                    ❤️
                  </span>
                </div>
                <div className='absolute -top-2 -right-2 w-2 h-2 bg-teal/40 rounded-full animate-pulse-glow'></div>
                <div
                  className='absolute -bottom-2 -left-2 w-3 h-3 bg-crimson/40 rounded-full animate-pulse-glow'
                  style={{ animationDelay: '2s' }}
                ></div>
              </div>
              <div className='transform group-hover:scale-105 transition-transform duration-500'>
                <div className='text-4xl font-serif text-teal mb-2 tracking-wide group-hover:text-teal-light transition-colors duration-300'>
                  {stats.savedMovies}
                </div>
                <div className='text-muted-gray font-medium text-lg tracking-wider uppercase group-hover:text-muted-gray-light transition-colors duration-300'>
                  Saved Films
                </div>
              </div>
            </div>
          </section>
        )}

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && stats.moviesRated > 0 && (
          <section className='space-y-12'>
            <FilmHeader
              title={['Curated for You', 'by AI']}
              subtitle='Personalized film recommendations crafted from your unique cinematic taste'
              accentColor='crimson'
            />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {recommendations.map((movie, index) => {
                const title = movie.title || movie
                const year = movie.year || null
                const genres = movie.genres || null
                const reason = movie.reason || null
                const isString = typeof movie === 'string'
                const isSaved = savedRecommendations.has(title)

                return (
                  <FilmCard
                    key={index}
                    variant='primary'
                    animationDelay={index * 150}
                  >
                    <div className='space-y-6'>
                      {/* Movie Poster */}
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
                            {movie.genres || 'Film'}
                          </span>
                        </div>
                        {/* Gradient overlay */}
                        <div className='absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                      </div>

                      {/* Movie Title */}
                      <div className='space-y-2'>
                        <h3 className='text-xl font-serif text-cream leading-tight tracking-wide group-hover:text-crimson transition-colors duration-300'>
                          {title}
                        </h3>
                        {(year || genres) && (
                          <div className='flex items-center space-x-2 text-sm text-muted-gray'>
                            {year && (
                              <span className='font-medium'>{year}</span>
                            )}
                            {year && genres && (
                              <div className='w-1 h-1 bg-crimson/50 rounded-full'></div>
                            )}
                            {genres && (
                              <span className='line-clamp-1'>{genres}</span>
                            )}
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
                      <div className='flex items-center justify-between pt-4 border-t border-gray-600/30'>
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={() => handleSaveRecommendation(movie)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 ${
                              isSaved
                                ? 'bg-crimson/20 text-crimson border border-crimson/30 hover:bg-crimson/30'
                                : 'bg-charcoal/60 text-muted-gray border border-gray-600/30 hover:bg-charcoal hover:text-cream hover:border-gray-500/50'
                            }`}
                          >
                            <span className='text-base'>
                              {isSaved ? '❤️' : '🤍'}
                            </span>
                            <span>{isSaved ? 'Saved' : 'Save'}</span>
                          </button>

                          <button
                            onClick={() => handleDismissRecommendation(movie)}
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
                    </div>
                  </FilmCard>
                )
              })}
            </div>

            {/* View More Recommendations */}
            <div className='text-center'>
              <Link
                to='/rate'
                className='inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-crimson/20 to-crimson-dark/20 hover:from-crimson/30 hover:to-crimson-dark/30 text-cream border border-crimson/30 hover:border-crimson/50 rounded-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm font-medium tracking-wide shadow-lg hover:shadow-crimson/20 group'
              >
                <span>Get More Recommendations</span>
                <svg
                  className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Link>
            </div>
          </section>
        )}

        {/* Smart Actions - Contextual based on user state */}
        <section className='space-y-12'>
          {stats.moviesRated === 0 ? null : stats.moviesRated < 5 ? ( // Hide for new users (they have onboarding CTA above)
            // Show minimal actions for progressing users
            <>
              <FilmHeader
                title='Next Steps'
                subtitle='Continue building your taste profile'
              />
              <div className='max-w-2xl mx-auto'>
                <Link
                  to='/rate'
                  className='group relative bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-teal/40 p-8 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl hover:shadow-teal/20 overflow-hidden flex items-center justify-between'
                >
                  <div className='flex items-center space-x-6'>
                    <div className='w-16 h-16 bg-gradient-to-br from-teal/20 to-teal-dark/20 rounded-full flex items-center justify-center border-2 border-teal/30 group-hover:border-teal/50 transition-all duration-500 group-hover:scale-110'>
                      <span className='text-3xl group-hover:animate-pulse-glow'>
                        ⭐
                      </span>
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-serif text-cream group-hover:text-teal transition-colors duration-500 tracking-wide'>
                        Continue Rating Films
                      </h3>
                      <p className='text-muted-gray group-hover:text-cream/80 transition-colors duration-500 font-light'>
                        Expand your taste profile to unlock AI recommendations
                      </p>
                    </div>
                  </div>
                  <svg
                    className='w-6 h-6 text-muted-gray group-hover:text-teal group-hover:translate-x-1 transition-all duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            // Full actions for established users
            <>
              <FilmHeader
                title='Your Cinema Hall'
                subtitle='Continue your cinematic journey'
              />
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto'>
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className={`group relative bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-${action.color}/40 p-6 sm:p-8 lg:p-10 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 shadow-2xl hover:shadow-${action.hoverShadow} overflow-hidden opacity-0 animate-fade-in-up touch-manipulation active:scale-[0.98]`}
                    style={{
                      animationDelay: `${500 + index * 150}ms`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    {/* Film strip perforations */}
                    <div className='absolute left-3 top-1/2 transform -translate-y-1/2 space-y-2'>
                      <div className='w-2 h-2 bg-current opacity-10 rounded-full'></div>
                      <div className='w-2 h-2 bg-current opacity-10 rounded-full'></div>
                      <div className='w-2 h-2 bg-current opacity-10 rounded-full'></div>
                    </div>
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 space-y-2'>
                      <div className='w-2 h-2 bg-current opacity-10 rounded-full'></div>
                      <div className='w-2 h-2 bg-current opacity-10 rounded-full'></div>
                      <div className='w-2 h-2 bg-current opacity-10 rounded-full'></div>
                    </div>

                    <div className='relative z-10 text-center space-y-8 transform group-hover:scale-[1.01] transition-transform duration-500'>
                      <div
                        className={`w-24 h-24 bg-gradient-to-br from-${action.color}/20 to-${action.color}-dark/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-700 border-2 border-${action.color}/30 group-hover:border-${action.color}/50 shadow-lg group-hover:shadow-${action.color}/20`}
                      >
                        <span className='text-5xl group-hover:animate-pulse-glow transform transition-transform duration-500 group-hover:scale-110'>
                          {action.icon}
                        </span>
                      </div>
                      <div className='space-y-4 transform group-hover:scale-105 transition-transform duration-500'>
                        <h3 className='text-2xl font-serif text-cream group-hover:text-teal transition-colors duration-500 tracking-wide'>
                          {action.title}
                        </h3>
                        <p className='text-muted-gray group-hover:text-cream/80 transition-colors duration-500 font-light text-lg leading-relaxed'>
                          {action.description}
                        </p>
                      </div>
                      <div className='flex items-center justify-center space-x-3 text-muted-gray group-hover:text-teal transition-colors duration-500 transform group-hover:scale-105 group-hover:translate-x-1'>
                        <span className='text-sm font-medium tracking-wider uppercase'>
                          Enter
                        </span>
                        <svg
                          className='w-5 h-5 group-hover:translate-x-2 transition-transform duration-500'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Enhanced hover shimmer effect */}
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-out'></div>
                    {/* Subtle inner glow on hover */}
                    <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Recent Activity - Film Archive */}
        {recentActivity.length > 0 && (
          <section className='space-y-12'>
            <FilmHeader
              title='Recent Screenings'
              subtitle='Your latest film ratings and discoveries'
            />

            <div className='bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 p-10 shadow-2xl'>
              <div className='space-y-6'>
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-6 rounded-2xl bg-charcoal/40 border border-gray-600/30 hover:border-teal/30 transition-all duration-300 group'
                  >
                    <div className='flex items-center space-x-6'>
                      <div className='w-16 h-16 bg-gradient-to-br from-teal/20 to-crimson/20 rounded-full flex items-center justify-center border-2 border-teal/30 group-hover:border-teal/50 transition-all duration-300'>
                        <span className='text-2xl group-hover:animate-pulse'>
                          ⭐
                        </span>
                      </div>
                      <div className='space-y-2'>
                        <h4 className='font-serif text-cream text-xl tracking-wide group-hover:text-teal transition-colors duration-300'>
                          {activity.movie}
                        </h4>
                        <p className='text-muted-gray text-sm tracking-wide'>
                          Rated {activity.rating}/5 stars in your collection
                        </p>
                      </div>
                    </div>
                    <div className='text-muted-gray text-sm font-medium tracking-wider uppercase'>
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      `}</style>
    </div>
  )
}

export default Dashboard
