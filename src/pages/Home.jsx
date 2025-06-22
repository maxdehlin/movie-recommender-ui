import React from 'react'
import QuickRater from '../components/QuickRater'
import useToast from '../hooks/useToast'
import useRatings from '../hooks/useRatings'
import useUserState from '../hooks/useUserState'

function Home() {
  const { showToast } = useToast()
  const { addRating, stats } = useRatings()
  const userState = useUserState(stats?.moviesRated || 0)

  const handleRating = (movie, rating) => {
    addRating(movie.id, rating, movie.title)
    showToast(`Rated "${movie.title}" ${rating} stars`, 'success')
  }

  return (
    <main
      className='min-h-screen p-4 sm:p-6 lg:p-8'
      role='main'
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className='max-w-4xl mx-auto space-y-6 sm:space-y-8'>
        {/* Header */}
        <header className='text-center space-y-3 sm:space-y-4 px-2'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-serif text-gray-50 leading-tight'>
            Discover Your Next Favorite Film
          </h1>
          <p className='text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto'>
            {userState?.isNewUser
              ? "Welcome to your cinema journey. Let's find your first great film!"
              : userState?.isProgressingUser
              ? `You're building an amazing taste profile. Rate more movies to unlock full recommendations!`
              : 'Search for movies and rate them to get personalized recommendations'}
          </p>
        </header>

        {/* Search & Quick Rating */}
        <div className='bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-600/30 p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0'>
          <div className='space-y-4 sm:space-y-6'>
            <div className='text-center space-y-2'>
              <h3 className='text-xl sm:text-2xl font-serif text-gray-50'>
                Search & Rate Movies
              </h3>
              <p className='text-sm sm:text-base text-gray-400'>
                Find films you've watched and rate them
              </p>
            </div>

            <QuickRater
              onRate={handleRating}
              placeholder="Search for a movie you've seen..."
              maxResults={6}
              size='large'
              showPoster={true}
            />
          </div>
        </div>

        {/* Welcome Message */}
        <div className='text-center text-gray-400 px-4 sm:px-0'>
          <p className='text-sm sm:text-base'>
            Rate movies to unlock personalized recommendations and explore your
            taste profile in the Movies section
          </p>
        </div>
      </div>
    </main>
  )
}

export default Home
