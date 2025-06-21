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
      title: 'Rate Movies',
      description: 'Rate movies to improve recommendations',
      icon: '⭐',
      href: '/rate',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'View Watchlist',
      description: 'See your saved movies',
      icon: '❤️',
      href: '/watchlist',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Browse Movies',
      description: 'Discover new films',
      icon: '🎬',
      href: '/rate',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <div className='min-h-screen pt-8 pb-16 px-8 w-screen'>
      <div className='max-w-7xl mx-auto space-y-12'>
        {/* Welcome Section */}
        <section className='text-center space-y-6'>
          <div className='space-y-4'>
            <h1 className='text-4xl md:text-5xl font-bold text-white tracking-tight'>
              Welcome to
              <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                {' '}
                MovieMind
              </span>
            </h1>
            <p className='text-xl text-white/70 font-light max-w-2xl mx-auto'>
              Your personalized movie recommendation hub. Track your ratings,
              discover new films, and build your perfect watchlist.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl border border-indigo-400/20 p-8 text-center space-y-4 hover:scale-105 transition-all duration-300 shadow-lg'>
            <div className='w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto'>
              <span className='text-3xl'>⭐</span>
            </div>
            <div>
              <div className='text-3xl font-bold text-white mb-1'>
                {stats.moviesRated}
              </div>
              <div className='text-white/60 font-medium'>Movies Rated</div>
            </div>
          </div>

          <div className='backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl border border-purple-400/20 p-8 text-center space-y-4 hover:scale-105 transition-all duration-300 shadow-lg'>
            <div className='w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto'>
              <span className='text-3xl'>🎯</span>
            </div>
            <div>
              <div className='text-3xl font-bold text-white mb-1'>
                {stats.recommendationsReceived}
              </div>
              <div className='text-white/60 font-medium'>Recommendations</div>
            </div>
          </div>

          <div className='backdrop-blur-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-3xl border border-pink-400/20 p-8 text-center space-y-4 hover:scale-105 transition-all duration-300 shadow-lg'>
            <div className='w-16 h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center mx-auto'>
              <span className='text-3xl'>❤️</span>
            </div>
            <div>
              <div className='text-3xl font-bold text-white mb-1'>
                {stats.savedMovies}
              </div>
              <div className='text-white/60 font-medium'>Saved Movies</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className='space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-white mb-4'>
              Quick Actions
            </h2>
            <p className='text-white/60 text-lg'>
              What would you like to do today?
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className='group backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/20'
              >
                <div className='text-center space-y-6'>
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${action.gradient}/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300`}
                  >
                    <span className='text-4xl'>{action.icon}</span>
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-xl font-bold text-white group-hover:text-white transition-colors'>
                      {action.title}
                    </h3>
                    <p className='text-white/60 group-hover:text-white/80 transition-colors'>
                      {action.description}
                    </p>
                  </div>
                  <div className='flex items-center justify-center space-x-2 text-white/40 group-hover:text-white/60 transition-colors'>
                    <span className='text-sm font-medium'>Get Started</span>
                    <svg
                      className='w-4 h-4 group-hover:translate-x-1 transition-transform'
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
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <section className='space-y-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-white mb-4'>
                Recent Activity
              </h2>
              <p className='text-white/60 text-lg'>Your latest movie ratings</p>
            </div>

            <div className='backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-8'>
              <div className='space-y-4'>
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10'
                  >
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center'>
                        <span className='text-xl'>⭐</span>
                      </div>
                      <div>
                        <h4 className='font-semibold text-white'>
                          {activity.movie}
                        </h4>
                        <p className='text-white/60 text-sm'>
                          Rated {activity.rating}/5 stars
                        </p>
                      </div>
                    </div>
                    <div className='text-white/40 text-sm'>{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Get Started Section for New Users */}
        {stats.moviesRated === 0 && (
          <section className='text-center space-y-8'>
            <div className='backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl border border-indigo-400/20 p-12'>
              <div className='space-y-6'>
                <div className='w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto'>
                  <span className='text-5xl'>🎬</span>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-2xl font-bold text-white'>
                    Ready to Get Started?
                  </h3>
                  <p className='text-white/70 text-lg max-w-md mx-auto'>
                    Rate a few movies you've watched to receive personalized AI
                    recommendations
                  </p>
                </div>
                <Link
                  to='/rate'
                  className='relative inline-flex px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25 border border-indigo-400/30 overflow-hidden group bg-no-repeat'
                >
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
                  <span className='relative z-10 drop-shadow-sm'>
                    Rate Your First Movie
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Dashboard
