import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CinemaLogo from '../components/CinemaLogo'
import StatsCard from '../components/StatsCard'
import FilmCard from '../components/FilmCard'
import QuickRater from '../components/QuickRater'
import RecommendationCard from '../components/RecommendationCard'
import useToast from '../hooks/useToast'
import useRatings from '../hooks/useRatings'
import useRecommendations from '../hooks/useRecommendations'
import useUserState from '../hooks/useUserState'

function Dashboard() {
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

  return (
    <div className='min-h-screen pt-4 pb-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-12 sm:space-y-16'>
        {/* Welcome Section - Cinematic Style */}
        <section className='text-center space-y-12'>
          <div className='relative inline-block'>
            <CinemaLogo className='mx-auto mb-8' />
            <div className='space-y-4'>
              <h1 className='text-4xl md:text-6xl font-serif text-center bg-gradient-to-r from-cream via-teal to-cream bg-clip-text text-transparent leading-tight tracking-wide'>
                {userState.title}
              </h1>
              <p className='text-xl text-muted-gray max-w-2xl mx-auto leading-relaxed font-light'>
                {userState.description}
              </p>
            </div>
          </div>
        </section>

        {/* Progressive Stats & Onboarding */}
        {userState.isNewUser && (
          <section className='space-y-8'>
            <div className='bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 p-8 sm:p-12 shadow-2xl'>
              <div className='text-center space-y-8'>
                <div className='space-y-4'>
                  <h2 className='text-2xl font-serif text-cream'>
                    Start Your Cinema Journey
                  </h2>
                  <p className='text-muted-gray leading-relaxed max-w-md mx-auto'>
                    {userState.getMotivationalMessage()}
                  </p>
                </div>

                {/* Progress Steps */}
                <div className='flex justify-center items-center space-x-4 md:space-x-8'>
                  {userState.getProgressSteps().map((step, index) => (
                    <div key={step.number} className='flex items-center'>
                      <div className='text-center'>
                        <div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                            step.completed
                              ? 'bg-teal border-teal text-black'
                              : step.active
                              ? 'border-crimson text-crimson bg-crimson/10'
                              : 'border-gray-600 text-muted-gray'
                          }`}
                        >
                          {step.completed ? '✓' : step.number}
                        </div>
                        <div className='mt-2 text-xs text-center max-w-20'>
                          <p
                            className={
                              step.active ? 'text-cream' : 'text-muted-gray'
                            }
                          >
                            {step.title}
                          </p>
                        </div>
                      </div>
                      {index < userState.getProgressSteps().length - 1 && (
                        <div className='hidden md:block w-16 h-0.5 bg-gray-600 mx-4'></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Rating */}
                <div className='max-w-md mx-auto'>
                  <QuickRater
                    onRate={handleRating}
                    placeholder="Search for a film you've seen..."
                    maxResults={3}
                    size='default'
                    showPoster={true}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Progressing User */}
        {userState.isProgressingUser && (
          <div className='mb-12 space-y-8'>
            {/* Progress Card */}
            <FilmCard variant='secondary'>
              <div className='text-center space-y-6'>
                <div className='space-y-2'>
                  <h2 className='text-2xl font-serif text-cream'>
                    You're Making Progress!
                  </h2>
                  <p className='text-muted-gray'>
                    {userState.getMotivationalMessage()}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className='space-y-3'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-gray'>Progress</span>
                    <span className='text-teal font-medium'>
                      {stats.moviesRated}/{userState.nextMilestone} films rated
                    </span>
                  </div>
                  <div className='w-full bg-charcoal-light/50 rounded-full h-3 overflow-hidden'>
                    <div
                      className='h-full bg-gradient-to-r from-teal to-crimson rounded-full transition-all duration-700 ease-out'
                      style={{ width: `${userState.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Rating */}
                <div className='max-w-md mx-auto'>
                  <QuickRater
                    onRate={handleRating}
                    placeholder='Continue rating films...'
                    maxResults={3}
                    size='compact'
                    showPoster={true}
                  />
                </div>
              </div>
            </FilmCard>

            {/* Basic Recommendations */}
            {recommendations.length > 0 && (
              <div className='space-y-6'>
                <div className='text-center space-y-2'>
                  <h2 className='text-2xl font-serif text-cream flex items-center justify-center space-x-2'>
                    <span>Basic Recommendations</span>
                    <span className='text-crimson'>✨</span>
                  </h2>
                  <p className='text-muted-gray text-sm'>
                    Rate more films for better recommendations
                  </p>
                </div>

                <div className='grid md:grid-cols-3 gap-6'>
                  {recommendations.slice(0, 3).map((movie, index) => (
                    <RecommendationCard
                      key={movie.title || index}
                      movie={movie}
                      isSaved={isSaved(movie)}
                      onSave={handleSaveRecommendation}
                      onDismiss={handleDismissRecommendation}
                      variant='secondary'
                      animationDelay={index * 100}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Established User */}
        {userState.isEstablishedUser && (
          <>
            {/* Statistics */}
            <div className='grid md:grid-cols-3 gap-6 mb-12'>
              <StatsCard
                title='Films Rated'
                value={stats.moviesRated}
                icon='⭐'
                subtitle='Total ratings'
              />
              <StatsCard
                title='Average Rating'
                value={stats.averageRating.toFixed(1)}
                icon='📊'
                subtitle='Your taste profile'
              />
              <StatsCard
                title='Recent Activity'
                value={recentActivity.length}
                icon='🎬'
                subtitle='Latest interactions'
              />
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className='mb-12 space-y-6'>
                <div className='text-center space-y-2'>
                  <h2 className='text-2xl font-serif text-cream flex items-center justify-center space-x-2'>
                    <span>Curated for You by AI</span>
                    <span className='text-crimson'>✨</span>
                  </h2>
                  <p className='text-muted-gray'>
                    Personalized recommendations based on your taste profile
                  </p>
                </div>

                <div className='grid md:grid-cols-3 gap-6'>
                  {recommendations.slice(0, 3).map((movie, index) => (
                    <RecommendationCard
                      key={movie.title || index}
                      movie={movie}
                      isSaved={isSaved(movie)}
                      onSave={handleSaveRecommendation}
                      onDismiss={handleDismissRecommendation}
                      variant='primary'
                      animationDelay={index * 100}
                    />
                  ))}
                </div>

                <div className='text-center'>
                  <button
                    onClick={handleGenerateRecommendations}
                    disabled={isGenerating || isLoadingRecommendations}
                    className='px-6 py-3 bg-gradient-to-r from-crimson to-crimson-dark rounded-xl text-cream font-medium hover:from-crimson-dark hover:to-crimson transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100'
                  >
                    {isGenerating || isLoadingRecommendations ? (
                      <div className='flex items-center space-x-2'>
                        <div className='w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin'></div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      'Generate New Recommendations'
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Quick Actions */}
        <div className='grid md:grid-cols-2 gap-6 justify-center max-w-2xl mx-auto'>
          {!userState.isNewUser && (
            <FilmCard
              variant='secondary'
              onClick={() => navigate('/rate')}
              className='cursor-pointer transform hover:scale-105 transition-all duration-300'
            >
              <div className='text-center space-y-4'>
                <div className='text-4xl'>🎯</div>
                <div>
                  <h3 className='text-xl font-serif text-cream mb-2'>
                    {userState.ctaText}
                  </h3>
                  <p className='text-muted-gray text-sm'>
                    {userState.isProgressingUser
                      ? 'Build your taste profile'
                      : 'Discover and rate new films'}
                  </p>
                </div>
              </div>
            </FilmCard>
          )}

          <FilmCard
            variant='secondary'
            onClick={() => navigate('/watchlist')}
            className='cursor-pointer transform hover:scale-105 transition-all duration-300'
          >
            <div className='text-center space-y-4'>
              <div className='text-4xl'>❤️</div>
              <div>
                <h3 className='text-xl font-serif text-cream mb-2'>
                  My Watchlist
                </h3>
                <p className='text-muted-gray text-sm'>
                  Saved films and recommendations
                </p>
              </div>
            </div>
          </FilmCard>
        </div>

        {/* Error Display */}
        {recommendationError && (
          <div className='mt-8 text-center p-4 bg-crimson/10 border border-crimson/30 rounded-2xl max-w-md mx-auto'>
            <p className='text-crimson text-sm'>{recommendationError}</p>
          </div>
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
