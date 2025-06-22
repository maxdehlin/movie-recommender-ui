import { useState, useMemo, useEffect } from 'react'
import useRatings from '../hooks/useRatings'
import useRecommendations from '../hooks/useRecommendations'
import useToast from '../hooks/useToast'
import StarRating from '../components/StarRating'
import SkeletonLoader from '../components/SkeletonLoader'

function Movies() {
  const { showToast } = useToast()

  const { ratings, addRating } = useRatings()
  const { recommendations, generateRecommendations, isLoadingRecommendations } =
    useRecommendations()

  // Watchlist state (from localStorage)
  const [watchlist, setWatchlist] = useState([])

  // Load watchlist from localStorage
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('savedRecommendations') || '[]'
    )
    setWatchlist(saved)
  }, [])

  // Create userRatedMovies from ratings (this would need movie data)
  const userRatedMovies = useMemo(() => {
    // For now, return empty array since we need movie data to show
    // In a real app, you'd fetch movie details for rated movie IDs
    return []
  }, [ratings])

  const toggleWatchlist = (movie) => {
    const movieTitle = movie.title || movie
    const isInWatchlist = watchlist.some((item) => {
      const itemTitle = typeof item === 'string' ? item : item.title || item
      return itemTitle === movieTitle
    })

    let updatedWatchlist
    if (isInWatchlist) {
      updatedWatchlist = watchlist.filter((item) => {
        const itemTitle = typeof item === 'string' ? item : item.title || item
        return itemTitle !== movieTitle
      })
    } else {
      updatedWatchlist = [...watchlist, movie]
    }

    setWatchlist(updatedWatchlist)
    localStorage.setItem(
      'savedRecommendations',
      JSON.stringify(updatedWatchlist)
    )
    return !isInWatchlist
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('rated')

  const sections = [
    {
      id: 'rated',
      name: 'Rated Movies',
      icon: '⭐',
      count: userRatedMovies?.length || 0,
    },
    {
      id: 'watchlist',
      name: 'Watchlist',
      icon: '❤️',
      count: watchlist?.length || 0,
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      icon: '✨',
      count: recommendations?.length || 0,
    },
  ]

  // Filter current section data based on search
  const filteredData = useMemo(() => {
    let data = []

    switch (activeSection) {
      case 'rated':
        data = userRatedMovies || []
        break
      case 'watchlist':
        data = watchlist || []
        break
      case 'recommendations':
        data = recommendations || []
        break
    }

    if (!searchQuery.trim()) return data

    return data.filter(
      (movie) =>
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres?.some((genre) =>
          genre.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
  }, [activeSection, searchQuery, userRatedMovies, watchlist, recommendations])

  const handleRating = (movie, rating) => {
    addRating(movie.id, rating, movie.title)
    showToast(`Rated "${movie.title}" ${rating} stars`, 'success')
  }

  const handleWatchlistToggle = (movie) => {
    const added = toggleWatchlist(movie)
    showToast(
      added
        ? `Added "${movie.title}" to watchlist`
        : `Removed "${movie.title}" from watchlist`,
      'success'
    )
  }

  const MovieListItem = ({ movie }) => {
    const userRating = ratings[movie.id]
    const isInWatchlist = watchlist?.some((w) => w.id === movie.id)

    return (
      <div className='bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-600/30 p-4 hover:bg-gray-800/60 transition-all duration-300'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4 flex-1'>
            {/* Poster */}
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className='w-12 h-18 object-cover rounded-lg border border-gray-600/30'
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            )}

            {/* Movie Info */}
            <div className='flex-1 min-w-0'>
              <h3 className='text-gray-50 font-medium text-lg truncate'>
                {movie.title}
              </h3>
              <p className='text-gray-400 text-sm'>
                {movie.release_date?.split('-')[0] || 'Unknown Year'}
              </p>
              {movie.genres && (
                <div className='flex flex-wrap gap-1 mt-1'>
                  {movie.genres.slice(0, 3).map((genre, index) => (
                    <span
                      key={index}
                      className='text-xs bg-teal-500/20 text-teal-500 px-2 py-1 rounded-md'
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center space-x-4'>
            {/* Watchlist Toggle */}
            {activeSection !== 'watchlist' && (
              <button
                onClick={() => handleWatchlistToggle(movie)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isInWatchlist
                    ? 'text-red-600 bg-red-600/20 border border-red-600/30'
                    : 'text-gray-400 hover:text-red-600 hover:bg-red-600/10'
                }`}
              >
                ❤️
              </button>
            )}

            {/* Star Rating */}
            <StarRating
              movie={movie}
              currentRating={userRating}
              onRate={handleRating}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-screen'>
      {/* Secondary Sidebar */}
      <aside
        className={`w-64 bg-gray-800/60 backdrop-blur-xl border-r border-gray-600/30 flex flex-col transition-all duration-300`}
        role='complementary'
        aria-label='Movie categories'
      >
        <nav
          className='flex-1 py-6'
          role='navigation'
          aria-label='Movie categories navigation'
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`relative w-full flex items-center ${'justify-between px-4'} py-3 font-medium text-sm transition-all duration-500 text-left group overflow-hidden touch-manipulation ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-teal-500/20 to-red-600/20 text-gray-50 border border-teal-500/30 shadow-lg shadow-teal-500/10'
                  : 'text-gray-400 hover:text-gray-50 hover:bg-gray-800/60 backdrop-blur-sm border border-transparent hover:border-gray-600/30'
              }`}
              title={section.name}
              aria-label={`View ${section.name} (${section.count} movies)`}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              <div className={`relative z-10 flex items-center ${'space-x-3'}`}>
                <span className='text-lg group-hover:animate-pulse'>
                  {section.icon}
                </span>
                <span>{section.name}</span>
              </div>

              <span className='relative z-10 text-xs bg-gray-600/30 px-2 py-1 rounded-full'>
                {section.count}
              </span>

              {/* Hover glow effect */}
              {/* <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div> */}
            </button>
          ))}
        </nav>

        {activeSection === 'recommendations' && (
          <div className='p-4 border-t border-gray-600/30'>
            <button
              onClick={() => generateRecommendations(ratings)}
              className='relative w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 hover:border-red-600/50 text-gray-50 rounded-lg text-sm font-medium transition-all duration-500 hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-red-600/20 group overflow-hidden touch-manipulation'
              title={'Generate New Recommendations'}
            >
              <span className='relative z-10'>{'Generate New'}</span>

              {/* Hover glow effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className='flex-1 flex flex-col' role='main'>
        {/* Header with Search */}
        <header className='p-6 border-b border-gray-600/30 bg-gray-800/30 backdrop-blur-sm'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h1 className='text-xl font-serif text-gray-50'>
                {sections.find((s) => s.id === activeSection)?.name}
              </h1>
              <p className='text-gray-400 text-sm' aria-live='polite'>
                {filteredData.length} movie
                {filteredData.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className='relative'>
            <input
              type='text'
              placeholder={`Search ${sections
                .find((s) => s.id === activeSection)
                ?.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full px-4 py-3 bg-gray-800/60 border border-gray-600/30 rounded-xl text-gray-50 placeholder-gray-400 focus:border-teal-500/50 focus:ring-1 focus:ring-teal/30 transition-all duration-300'
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              🔍
            </span>
          </div>
        </header>

        {/* Movie List */}
        <div className='flex-1 p-6 overflow-y-auto'>
          {/* Loading State */}
          {isLoadingRecommendations && activeSection === 'recommendations' && (
            <div className='space-y-4'>
              <SkeletonLoader variant='movie-card' count={5} />
            </div>
          )}

          {/* Regular Content */}
          {(!isLoadingRecommendations ||
            activeSection !== 'recommendations') && (
            <>
              {filteredData.length === 0 ? (
                <div className='text-center py-12'>
                  <div className='text-6xl mb-4'>🎬</div>
                  <h3 className='text-xl font-serif text-gray-50 mb-2'>
                    {searchQuery
                      ? 'No movies found'
                      : `No ${sections
                          .find((s) => s.id === activeSection)
                          ?.name.toLowerCase()} yet`}
                  </h3>
                  <p className='text-gray-400'>
                    {searchQuery
                      ? 'Try adjusting your search terms'
                      : activeSection === 'rated'
                      ? 'Start rating movies to build your collection'
                      : activeSection === 'watchlist'
                      ? 'Add movies to your watchlist to see them here'
                      : 'Rate some movies to get personalized recommendations'}
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {filteredData.map((movie) => (
                    <MovieListItem key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Movies
