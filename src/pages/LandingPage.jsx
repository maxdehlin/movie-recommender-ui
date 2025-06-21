import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden w-screen flex flex-col'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/3 -right-4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute -bottom-8 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Header */}
      <header className='relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                <span className='text-white font-bold text-lg'>🎬</span>
              </div>
              <div>
                <h1 className='text-xl font-bold text-white tracking-tight'>
                  MovieMind
                </h1>
                <p className='text-xs text-white/60 font-medium'>
                  AI-Powered Recommendations
                </p>
              </div>
            </div>
            <Link
              to='/login'
              className='relative px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/25 border border-indigo-400/30 overflow-hidden group bg-no-repeat'
            >
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
              <span className='relative z-10 drop-shadow-sm'>Get Started</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className='relative z-10 flex-1'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32'>
          <div className='text-center space-y-12'>
            {/* Hero Content */}
            <div className='space-y-8'>
              <div className='space-y-6'>
                <h1 className='text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight'>
                  Discover Your Next
                  <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block'>
                    Favorite Movie
                  </span>
                </h1>
                <p className='text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto'>
                  Powered by AI, MovieMind learns your taste and recommends
                  films you'll absolutely love. Rate a few movies and unlock
                  personalized recommendations.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
                <Link
                  to='/login'
                  className='relative px-12 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-purple-500/30 border border-indigo-400/30 tracking-wide overflow-hidden group bg-no-repeat'
                >
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300'></div>
                  <span className='relative z-10 drop-shadow-sm'>
                    Start Discovering
                  </span>
                </Link>
                <div className='flex items-center space-x-4 text-white/60'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    <span className='text-sm font-medium'>Free to use</span>
                  </div>
                  <div className='w-1 h-1 bg-white/30 rounded-full'></div>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300'></div>
                    <span className='text-sm font-medium'>AI-powered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Preview */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-20'>
              <div className='text-center space-y-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-indigo-400/20'>
                  <span className='text-3xl'>🎭</span>
                </div>
                <h3 className='text-xl font-semibold text-white'>
                  Rate Movies
                </h3>
                <p className='text-white/60 leading-relaxed'>
                  Rate movies you've watched to help our AI understand your
                  preferences
                </p>
              </div>

              <div className='text-center space-y-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-purple-400/20'>
                  <span className='text-3xl'>🤖</span>
                </div>
                <h3 className='text-xl font-semibold text-white'>
                  AI Analysis
                </h3>
                <p className='text-white/60 leading-relaxed'>
                  Advanced algorithms analyze your taste and find patterns in
                  your preferences
                </p>
              </div>

              <div className='text-center space-y-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-pink-400/20'>
                  <span className='text-3xl'>✨</span>
                </div>
                <h3 className='text-xl font-semibold text-white'>
                  Perfect Matches
                </h3>
                <p className='text-white/60 leading-relaxed'>
                  Get personalized recommendations that match your unique taste
                  perfectly
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='relative z-10 border-t border-white/10 backdrop-blur-xl bg-white/5'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-8'>
          <div className='text-center'>
            <p className='text-white/50 text-sm'>
              © 2024 MovieMind. Discover movies you'll love with AI-powered
              recommendations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
