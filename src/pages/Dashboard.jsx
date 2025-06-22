import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [stats, setStats] = useState({
    moviesRated: 0,
    recommendationsReceived: 0,
    savedMovies: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    // Load user stats from localStorage
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
    const recommendations = JSON.parse(
      localStorage.getItem('recommendations') || '[]'
    )
    const savedMovies = JSON.parse(
      localStorage.getItem('savedRecommendations') || '[]'
    )

    setStats({
      moviesRated: Object.keys(ratings).length,
      recommendationsReceived: recommendations.length,
      savedMovies: savedMovies.length,
    })

    // Create recent activity from ratings
    const activity = Object.entries(ratings)
      .slice(-5)
      .reverse()
      .map(([movie, rating]) => ({
        type: 'rating',
        movie,
        rating,
        time: 'Recently',
      }))

    setRecentActivity(activity)
  }, [])

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
    {
      title: 'Discover Cinema',
      description: 'Explore new films',
      icon: '🎬',
      href: '/rate',
      color: 'teal',
      bgGradient: 'from-teal/10 to-crimson/10',
      borderColor: 'teal/30',
      hoverShadow: 'teal/15',
    },
  ]

  return (
    <div className='min-h-screen pt-12 pb-20 px-8'>
      <div className='max-w-7xl mx-auto space-y-16'>
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

            <div className='space-y-6'>
              <h1 className='text-5xl md:text-6xl font-serif text-cream tracking-wide leading-tight'>
                Welcome to Your
                <span className='block text-teal italic'>Cinema Archive</span>
              </h1>
              <p className='text-xl text-muted-gray font-light max-w-3xl mx-auto leading-relaxed'>
                Your personal vault of cinematic discoveries, where every film
                tells a story and AI crafts the perfect next chapter
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid - Film Canisters */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='group bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-teal/40 p-10 text-center space-y-6 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-teal/10'>
            <div className='relative'>
              <div className='w-20 h-20 bg-gradient-to-br from-teal/20 to-teal-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-teal/30 group-hover:border-teal/50 transition-all duration-300'>
                <span className='text-4xl group-hover:animate-pulse'>⭐</span>
              </div>
              {/* Film sprocket holes */}
              <div className='absolute -top-2 -right-2 w-3 h-3 bg-teal/30 rounded-full animate-pulse'></div>
              <div className='absolute -bottom-2 -left-2 w-2 h-2 bg-crimson/30 rounded-full animate-pulse'></div>
            </div>
            <div>
              <div className='text-4xl font-serif text-teal mb-2 tracking-wide'>
                {stats.moviesRated}
              </div>
              <div className='text-muted-gray font-medium text-lg tracking-wider uppercase'>
                Films Rated
              </div>
            </div>
          </div>

          <div className='group bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-crimson/40 p-10 text-center space-y-6 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-crimson/10'>
            <div className='relative'>
              <div className='w-20 h-20 bg-gradient-to-br from-crimson/20 to-crimson-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-crimson/30 group-hover:border-crimson/50 transition-all duration-300'>
                <span className='text-4xl group-hover:animate-pulse'>🎯</span>
              </div>
              {/* Film sprocket holes */}
              <div className='absolute -top-2 -left-2 w-3 h-3 bg-crimson/30 rounded-full animate-pulse'></div>
              <div className='absolute -bottom-2 -right-2 w-2 h-2 bg-teal/30 rounded-full animate-pulse'></div>
            </div>
            <div>
              <div className='text-4xl font-serif text-crimson mb-2 tracking-wide'>
                {stats.recommendationsReceived}
              </div>
              <div className='text-muted-gray font-medium text-lg tracking-wider uppercase'>
                AI Recommendations
              </div>
            </div>
          </div>

          <div className='group bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-teal/40 p-10 text-center space-y-6 hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-teal/10'>
            <div className='relative'>
              <div className='w-20 h-20 bg-gradient-to-br from-teal/20 to-crimson/20 rounded-full flex items-center justify-center mx-auto border-2 border-teal/30 group-hover:border-teal/50 transition-all duration-300'>
                <span className='text-4xl group-hover:animate-pulse'>❤️</span>
              </div>
              {/* Film sprocket holes */}
              <div className='absolute -top-2 -right-2 w-2 h-2 bg-teal/30 rounded-full animate-pulse'></div>
              <div className='absolute -bottom-2 -left-2 w-3 h-3 bg-crimson/30 rounded-full animate-pulse'></div>
            </div>
            <div>
              <div className='text-4xl font-serif text-teal mb-2 tracking-wide'>
                {stats.savedMovies}
              </div>
              <div className='text-muted-gray font-medium text-lg tracking-wider uppercase'>
                Saved Films
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions - Cinema Hall */}
        <section className='space-y-12'>
          <div className='text-center space-y-4'>
            <h2 className='text-4xl font-serif text-cream tracking-wide'>
              Your Cinema Hall
            </h2>
            <p className='text-muted-gray text-xl font-light'>
              Choose your next cinematic adventure
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`group relative bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-${action.color}/40 p-10 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-${action.hoverShadow} overflow-hidden`}
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

                <div className='relative z-10 text-center space-y-8'>
                  <div
                    className={`w-24 h-24 bg-gradient-to-br from-${action.color}/20 to-${action.color}-dark/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 border-2 border-${action.color}/30`}
                  >
                    <span className='text-5xl group-hover:animate-pulse'>
                      {action.icon}
                    </span>
                  </div>
                  <div className='space-y-4'>
                    <h3 className='text-2xl font-serif text-cream group-hover:text-teal transition-colors duration-300 tracking-wide'>
                      {action.title}
                    </h3>
                    <p className='text-muted-gray group-hover:text-cream/80 transition-colors duration-300 font-light text-lg leading-relaxed'>
                      {action.description}
                    </p>
                  </div>
                  <div className='flex items-center justify-center space-x-3 text-muted-gray group-hover:text-teal transition-colors duration-300'>
                    <span className='text-sm font-medium tracking-wider uppercase'>
                      Enter
                    </span>
                    <svg
                      className='w-5 h-5 group-hover:translate-x-2 transition-transform duration-300'
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

                {/* Hover shimmer effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity - Film Archive */}
        {recentActivity.length > 0 && (
          <section className='space-y-12'>
            <div className='text-center space-y-4'>
              <h2 className='text-4xl font-serif text-cream tracking-wide'>
                Recent Screenings
              </h2>
              <p className='text-muted-gray text-xl font-light'>
                Your latest film ratings and discoveries
              </p>
            </div>

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

        {/* Get Started Section - Director's Cut */}
        {stats.moviesRated === 0 && (
          <section className='text-center space-y-12'>
            <div className='relative bg-charcoal-light/80 backdrop-blur-xl rounded-3xl border border-gray-600/30 p-16 shadow-2xl overflow-hidden'>
              {/* Decorative film elements */}
              <div className='absolute top-8 left-8 w-6 h-6 bg-teal/20 rounded-full animate-float'></div>
              <div className='absolute top-8 right-8 w-4 h-4 bg-crimson/20 rounded-full animate-float-delay'></div>
              <div className='absolute bottom-8 left-12 w-5 h-5 bg-teal/15 rounded-full animate-float'></div>
              <div className='absolute bottom-8 right-12 w-3 h-3 bg-crimson/15 rounded-full animate-float-delay'></div>

              <div className='relative z-10 space-y-10'>
                <div className='relative inline-block'>
                  <div className='w-32 h-32 bg-gradient-to-br from-teal/20 via-crimson/20 to-teal/20 rounded-full flex items-center justify-center mx-auto border-4 border-gray-600/30 shadow-2xl'>
                    <div className='absolute inset-6 rounded-full border-2 border-cream/20'></div>
                    <div className='absolute inset-8 rounded-full border border-cream/10'></div>
                    <span className='text-6xl relative z-10'>🎬</span>
                  </div>
                  {/* Film sprocket holes */}
                  <div className='absolute -top-4 -left-4 w-6 h-6 bg-teal/30 rounded-full animate-pulse'></div>
                  <div className='absolute -top-4 -right-4 w-6 h-6 bg-crimson/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-4 -left-4 w-4 h-4 bg-crimson/20 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-4 -right-4 w-4 h-4 bg-teal/20 rounded-full animate-pulse'></div>
                </div>

                <div className='space-y-6'>
                  <h3 className='text-3xl font-serif text-cream tracking-wide'>
                    Begin Your Cinematic Journey
                  </h3>
                  <p className='text-muted-gray text-xl font-light max-w-2xl mx-auto leading-relaxed'>
                    Rate films you've watched to unlock personalized AI
                    recommendations tailored to your unique cinematic taste
                  </p>
                </div>

                <Link
                  to='/rate'
                  className='relative inline-flex px-12 py-6 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-charcoal rounded-3xl font-bold text-xl transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-teal/30 border border-teal/50 group overflow-hidden'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                  <span className='relative z-10 flex items-center space-x-3'>
                    <span>Rate Your First Film</span>
                    <svg
                      className='w-6 h-6 group-hover:translate-x-1 transition-transform duration-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </span>
                </Link>
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
