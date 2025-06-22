import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilmCard from '../components/FilmCard'
import QuickRater from '../components/QuickRater'
import RecommendationCard from '../components/RecommendationCard'
import useToast from '../hooks/useToast'
import useRatings from '../hooks/useRatings'
import useRecommendations from '../hooks/useRecommendations'
import useUserState from '../hooks/useUserState'

const FEED_SECTIONS = [
  { id: 'for-you', name: 'For You', icon: '✨' },
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'recent', name: 'Recent Activity', icon: '⏰' },
  { id: 'collections', name: 'Collections', icon: '📚' },
]

const MOOD_COLLECTIONS = [
  {
    id: 'feel-good',
    name: 'Feel Good',
    icon: '😊',
    description: 'Uplifting films to brighten your day',
  },
  {
    id: 'thriller-night',
    name: 'Thriller Night',
    icon: '🔪',
    description: 'Edge-of-your-seat suspense',
  },
  {
    id: 'classics',
    name: 'Timeless Classics',
    icon: '🎭',
    description: 'Cinema history essentials',
  },
  {
    id: 'hidden-gems',
    name: 'Hidden Gems',
    icon: '💎',
    description: 'Underrated masterpieces',
  },
]

function Home() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  // Custom hooks
  const { ratings, stats, addRating, recentActivity } = useRatings()
  const {
    recommendations,
    isLoadingRecommendations,
    recommendationError,
    generateRecommendations,
    toggleSaveRecommendation,
    isSaved,
    dismissRecommendation,
  } = useRecommendations()
  const userState = useUserState(stats.moviesRated)

  // Local state
  const [activeSection, setActiveSection] = useState('for-you')
  const [isGenerating, setIsGenerating] = useState(false)

  // Handle rating submission
  const handleRating = (movie, rating) => {
    addRating(movie.id, rating, movie.title)
    showToast(`Rated "${movie.title}" ${rating} stars`, 'success')
  }

  // Handle recommendation generation
  const handleGenerateRecommendations = async () => {
    setIsGenerating(true)
    const success = await generateRecommendations(ratings)
    setIsGenerating(false)
    if (success) {
      showToast('New recommendations generated!', 'success')
    }
  }

  // Handle saving recommendations
  const handleSaveRecommendation = (movie) => {
    const wasSaved = toggleSaveRecommendation(movie)
    const movieTitle = movie.title || movie
    showToast(
      wasSaved
        ? `Saved "${movieTitle}" to watchlist`
        : `Removed "${movieTitle}" from watchlist`,
      'success'
    )
  }

  // Handle dismissing recommendations
  const handleDismissRecommendation = (movie) => {
    dismissRecommendation(movie)
    const movieTitle = movie.title || movie
    showToast(`Dismissed "${movieTitle}"`, 'info')
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className='min-h-screen pt-4 pb-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Header */}
        <section className='space-y-6'>
          <div className='space-y-2'>
            <h1 className='text-3xl md:text-4xl font-serif text-cream leading-tight'>
              {getGreeting()}! 👋
            </h1>
            <p className='text-muted-gray text-lg'>
              {userState.isNewUser
                ? "Welcome to your cinema journey. Let's find your first great film!"
                : userState.isProgressingUser
                ? `You're building an amazing taste profile. ${
                    5 - stats.moviesRated
                  } more ratings to unlock full recommendations!`
                : 'Ready to discover your next cinematic obsession?'}
            </p>
          </div>

          {/* Quick Rating for New/Progressing Users */}
          {!userState.isEstablishedUser && (
            <div className='bg-charcoal-light/60 backdrop-blur-xl rounded-2xl border border-gray-600/30 p-6'>
              <div className='flex items-center space-x-4 mb-4'>
                <div className='w-10 h-10 bg-teal/20 rounded-full flex items-center justify-center'>
                  <span className='text-xl'>⭐</span>
                </div>
                <div>
                  <h3 className='text-lg font-serif text-cream'>Quick Rate</h3>
                  <p className='text-muted-gray text-sm'>
                    Rate films you've watched
                  </p>
                </div>
              </div>
              <QuickRater
                onRate={handleRating}
                placeholder="Search for a film you've seen..."
                maxResults={3}
                size='compact'
                showPoster={true}
              />
            </div>
          )}
        </section>

        {/* Feed Navigation */}
        <section className='space-y-6'>
          <div className='flex space-x-1 bg-charcoal-light/60 backdrop-blur-xl rounded-xl p-1 border border-gray-600/30'>
            {FEED_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-teal/20 text-cream border border-teal/30'
                    : 'text-muted-gray hover:text-cream hover:bg-charcoal/40'
                }`}
              >
                <span className='flex items-center justify-center space-x-2'>
                  <span>{section.icon}</span>
                  <span className='hidden sm:inline'>{section.name}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Feed Content */}
          <div className='space-y-8'>
            {/* For You Section */}
            {activeSection === 'for-you' && (
              <div className='space-y-8'>
                {/* Personalized Recommendations */}
                {recommendations.length > 0 && (
                  <div className='space-y-6'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-serif text-cream flex items-center space-x-2'>
                          <span>Picked for You</span>
                          <span className='text-crimson'>✨</span>
                        </h2>
                        <p className='text-muted-gray text-sm'>
                          {userState.isEstablishedUser
                            ? 'AI-curated based on your taste profile'
                            : 'Basic recommendations - rate more for better suggestions'}
                        </p>
                      </div>
                      <button
                        onClick={handleGenerateRecommendations}
                        disabled={isGenerating || isLoadingRecommendations}
                        className='px-4 py-2 bg-crimson/20 hover:bg-crimson/30 border border-crimson/30 hover:border-crimson/50 text-cream rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50'
                      >
                        {isGenerating ? 'Generating...' : 'Refresh'}
                      </button>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                      {recommendations.slice(0, 6).map((movie, index) => (
                        <RecommendationCard
                          key={movie.title || index}
                          movie={movie}
                          isSaved={isSaved(movie)}
                          onSave={handleSaveRecommendation}
                          onDismiss={handleDismissRecommendation}
                          variant={
                            userState.isEstablishedUser
                              ? 'primary'
                              : 'secondary'
                          }
                          animationDelay={index * 100}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Mood Collections */}
                <div className='space-y-6'>
                  <div className='space-y-1'>
                    <h2 className='text-2xl font-serif text-cream'>
                      Browse by Mood
                    </h2>
                    <p className='text-muted-gray text-sm'>
                      Curated collections for every feeling
                    </p>
                  </div>

                  <div className='grid md:grid-cols-2 gap-4'>
                    {MOOD_COLLECTIONS.map((collection) => (
                      <FilmCard
                        key={collection.id}
                        variant='secondary'
                        onClick={() =>
                          navigate(`/discover?collection=${collection.id}`)
                        }
                        className='cursor-pointer hover:scale-105 transition-all duration-300'
                      >
                        <div className='flex items-center space-x-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-teal/20 to-crimson/20 rounded-full flex items-center justify-center text-2xl'>
                            {collection.icon}
                          </div>
                          <div className='flex-1'>
                            <h3 className='text-lg font-serif text-cream'>
                              {collection.name}
                            </h3>
                            <p className='text-muted-gray text-sm'>
                              {collection.description}
                            </p>
                          </div>
                          <div className='text-muted-gray'>
                            <svg
                              className='w-5 h-5'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </div>
                        </div>
                      </FilmCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity Section */}
            {activeSection === 'recent' && (
              <div className='space-y-6'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-serif text-cream'>
                    Recent Activity
                  </h2>
                  <p className='text-muted-gray text-sm'>
                    Your latest ratings and interactions
                  </p>
                </div>

                {recentActivity.length > 0 ? (
                  <div className='space-y-4'>
                    {recentActivity.slice(0, 10).map((activity, index) => (
                      <FilmCard key={index} variant='secondary'>
                        <div className='flex items-center space-x-4'>
                          <div className='w-10 h-10 bg-teal/20 rounded-full flex items-center justify-center'>
                            <span className='text-sm'>⭐</span>
                          </div>
                          <div className='flex-1'>
                            <p className='text-cream'>
                              You rated{' '}
                              <span className='font-medium'>
                                {activity.title}
                              </span>
                            </p>
                            <div className='flex items-center space-x-2 text-sm text-muted-gray'>
                              <span>{activity.rating} stars</span>
                              <span>•</span>
                              <span>
                                {new Date(
                                  activity.timestamp
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className='text-teal font-bold text-lg'>
                            {activity.rating}★
                          </div>
                        </div>
                      </FilmCard>
                    ))}
                  </div>
                ) : (
                  <FilmCard variant='secondary'>
                    <div className='text-center py-8'>
                      <div className='text-4xl mb-4'>🎬</div>
                      <h3 className='text-lg font-serif text-cream mb-2'>
                        No activity yet
                      </h3>
                      <p className='text-muted-gray text-sm'>
                        Start rating movies to see your activity here
                      </p>
                    </div>
                  </FilmCard>
                )}
              </div>
            )}

            {/* Trending Section */}
            {activeSection === 'trending' && (
              <div className='space-y-6'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-serif text-cream'>
                    Trending Now
                  </h2>
                  <p className='text-muted-gray text-sm'>
                    Popular movies in your taste profile
                  </p>
                </div>

                <FilmCard variant='secondary'>
                  <div className='text-center py-12'>
                    <div className='text-4xl mb-4'>🔥</div>
                    <h3 className='text-lg font-serif text-cream mb-2'>
                      Coming Soon
                    </h3>
                    <p className='text-muted-gray text-sm'>
                      Trending movies feature will be available soon
                    </p>
                  </div>
                </FilmCard>
              </div>
            )}

            {/* Collections Section */}
            {activeSection === 'collections' && (
              <div className='space-y-6'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-serif text-cream'>
                    Your Collections
                  </h2>
                  <p className='text-muted-gray text-sm'>
                    Organized movie lists and watchlists
                  </p>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <FilmCard
                    variant='secondary'
                    onClick={() => navigate('/watchlist')}
                    className='cursor-pointer hover:scale-105 transition-all duration-300'
                  >
                    <div className='text-center space-y-4'>
                      <div className='text-4xl'>❤️</div>
                      <div>
                        <h3 className='text-xl font-serif text-cream'>
                          Watchlist
                        </h3>
                        <p className='text-muted-gray text-sm'>
                          Movies you want to watch
                        </p>
                      </div>
                    </div>
                  </FilmCard>

                  <FilmCard
                    variant='secondary'
                    onClick={() => navigate('/rate')}
                    className='cursor-pointer hover:scale-105 transition-all duration-300'
                  >
                    <div className='text-center space-y-4'>
                      <div className='text-4xl'>⭐</div>
                      <div>
                        <h3 className='text-xl font-serif text-cream'>
                          Rated Movies
                        </h3>
                        <p className='text-muted-gray text-sm'>
                          {stats.moviesRated} films rated
                        </p>
                      </div>
                    </div>
                  </FilmCard>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Error Display */}
        {recommendationError && (
          <div className='text-center p-4 bg-crimson/10 border border-crimson/30 rounded-2xl'>
            <p className='text-crimson text-sm'>{recommendationError}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
