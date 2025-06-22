import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='min-h-screen bg-gray-900 relative overflow-hidden flex flex-col'>
      {/* Film Strip Background Pattern */}
      <div className='fixed inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #dc2626 0px, #dc2626 8px, transparent 8px, transparent 32px), repeating-linear-gradient(-45deg, #14b8a6 0px, #14b8a6 4px, transparent 4px, transparent 24px)`,
            backgroundSize: '40px 40px, 28px 28px',
          }}
        ></div>
      </div>

      {/* Cinematic Atmosphere */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        {/* Spotlight effects */}
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/3 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-0 left-1/2 w-72 h-72 bg-red-600/3 rounded-full blur-3xl animate-pulse delay-2000'></div>

        {/* Floating film elements */}
        <div className='absolute top-20 left-10 w-6 h-6 bg-red-600/20 rounded-full animate-float'></div>
        <div className='absolute top-40 right-20 w-4 h-4 bg-teal-500/20 rounded-full animate-float-delay'></div>
        <div className='absolute bottom-32 left-1/4 w-3 h-3 bg-red-600/15 rounded-full animate-float'></div>
        <div className='absolute bottom-20 right-1/3 w-5 h-5 bg-teal-500/15 rounded-full animate-float-delay'></div>
        <div className='absolute top-1/2 left-20 w-2 h-2 bg-teal-500/25 rounded-full animate-float'></div>
        <div className='absolute top-3/4 right-10 w-4 h-4 bg-red-600/20 rounded-full animate-float-delay'></div>
      </div>

      {/* Header - Cinema Marquee Style */}
      <header className='relative z-10 backdrop-blur-xl bg-gray-900-light/90 border-b border-gray-600/30 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <div className='w-14 h-14 bg-gradient-to-br from-red-600 via-red-600-dark to-teal-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-red-600/30'>
                  <div className='absolute inset-3 rounded-full border border-gray-50/20'></div>
                  <span className='text-gray-50 font-bold text-2xl relative z-10'>
                    🎬
                  </span>
                </div>
                {/* Film sprocket holes */}
                <div className='absolute -top-1 -left-1 w-3 h-3 bg-teal-500/30 rounded-full animate-pulse'></div>
                <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-red-600/30 rounded-full animate-pulse'></div>
              </div>
              <div>
                <h1 className='text-2xl font-serif text-gray-50 tracking-wide font-bold'>
                  CinemaVault
                </h1>
                <p className='text-sm text-gray-400 font-light tracking-wide'>
                  AI-Powered Discovery
                </p>
              </div>
            </div>

            <Link
              to='/login'
              className='relative px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-500-dark hover:from-teal-500-dark hover:to-teal-500 text-gray-900 rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-teal-500/30 border border-teal-500/50 group overflow-hidden'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
              <span className='relative z-10 flex items-center space-x-2'>
                <span>Enter Vault</span>
                <svg
                  className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Film Premiere */}
      <main className='relative z-10 flex-1'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32'>
          <div className='text-center space-y-16'>
            {/* Hero Content */}
            <div className='space-y-12'>
              <div className='relative inline-block'>
                <div className='space-y-8'>
                  <h1 className='text-6xl md:text-8xl font-serif text-gray-50 tracking-wide leading-tight'>
                    Discover Your Next
                    <span className='block text-transparent bg-gradient-to-r from-red-600 via-teal-500 to-red-600 bg-clip-text italic'>
                      Cinematic Obsession
                    </span>
                  </h1>
                  <p className='text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-4xl mx-auto'>
                    Step into our vault of cinematic treasures. Our AI curator
                    learns your unique taste, analyzing every nuance to
                    recommend films that will captivate your imagination and
                    expand your cinematic horizons.
                  </p>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row items-center justify-center gap-8'>
                <Link
                  to='/login'
                  className='relative px-16 py-6 bg-gradient-to-r from-red-600 via-red-600-dark to-teal-500 hover:from-red-600-dark hover:via-teal-500 hover:to-red-600 text-gray-50 rounded-3xl font-bold text-xl transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-red-600/30 border border-red-600/50 tracking-wide overflow-hidden group'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
                  <span className='relative z-10 flex items-center space-x-3'>
                    <span>Begin Your Journey</span>
                    <svg
                      className='w-6 h-6 group-hover:translate-x-1 transition-transform duration-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </span>
                </Link>

                <div className='flex items-center space-x-6 text-gray-400'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 bg-teal-500 rounded-full animate-pulse'></div>
                    <span className='text-sm font-medium tracking-wider uppercase'>
                      Free Access
                    </span>
                  </div>
                  <div className='w-1 h-1 bg-gray-600 rounded-full'></div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 bg-red-600 rounded-full animate-pulse delay-300'></div>
                    <span className='text-sm font-medium tracking-wider uppercase'>
                      AI Powered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features - Cinema Experience */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto pt-24'>
              <div className='group text-center space-y-8 bg-gray-900-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-red-600/40 p-10 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-red-600/10'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-600-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-600/30 group-hover:border-red-600/50 transition-all duration-300'>
                    <span className='text-4xl group-hover:animate-pulse'>
                      🎭
                    </span>
                  </div>
                  {/* Film sprocket holes */}
                  <div className='absolute -top-2 -right-2 w-3 h-3 bg-red-600/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-2 -left-2 w-2 h-2 bg-teal-500/30 rounded-full animate-pulse'></div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-2xl font-serif text-gray-50 group-hover:text-red-600 transition-colors duration-300 tracking-wide'>
                    Rate Your Films
                  </h3>
                  <p className='text-gray-400 group-hover:text-gray-50/80 transition-colors duration-300 leading-relaxed font-light'>
                    Share your cinematic experiences by rating films you've
                    watched. Each rating helps our AI understand your unique
                    taste profile.
                  </p>
                </div>
              </div>

              <div className='group text-center space-y-8 bg-gray-900-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-teal-500-500/40 p-10 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-teal-500/10'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-br from-teal-500/20 to-teal-500-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-teal-500/30 group-hover:border-teal-500-500/50 transition-all duration-300'>
                    <span className='text-4xl group-hover:animate-pulse'>
                      🤖
                    </span>
                  </div>
                  {/* Film sprocket holes */}
                  <div className='absolute -top-2 -left-2 w-3 h-3 bg-teal-500/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-2 -right-2 w-2 h-2 bg-red-600/30 rounded-full animate-pulse'></div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-2xl font-serif text-gray-50 group-hover:text-teal-500-500 transition-colors duration-300 tracking-wide'>
                    AI Curation
                  </h3>
                  <p className='text-gray-400 group-hover:text-gray-50/80 transition-colors duration-300 leading-relaxed font-light'>
                    Advanced algorithms analyze patterns in your preferences,
                    discovering subtle connections between films you love.
                  </p>
                </div>
              </div>

              <div className='group text-center space-y-8 bg-gray-900-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-red-600/40 p-10 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-red-600/10'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-br from-red-600/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-600/30 group-hover:border-red-600/50 transition-all duration-300'>
                    <span className='text-4xl group-hover:animate-pulse'>
                      ✨
                    </span>
                  </div>
                  {/* Film sprocket holes */}
                  <div className='absolute -top-2 -right-2 w-2 h-2 bg-teal-500/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-2 -left-2 w-3 h-3 bg-red-600/30 rounded-full animate-pulse'></div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-2xl font-serif text-gray-50 group-hover:text-red-600 transition-colors duration-300 tracking-wide'>
                    Perfect Discoveries
                  </h3>
                  <p className='text-gray-400 group-hover:text-gray-50/80 transition-colors duration-300 leading-relaxed font-light'>
                    Receive personalized recommendations that perfectly match
                    your taste, uncovering hidden gems you never knew existed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Cinema Credits */}
      <footer className='relative z-10 border-t border-gray-600/30 backdrop-blur-xl bg-gray-900-light/80'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-12'>
          <div className='text-center space-y-6'>
            <div className='flex items-center justify-center space-x-4'>
              <div className='w-3 h-3 bg-gradient-to-r from-red-600 to-teal-500 rounded-full'></div>
              <p className='text-gray-400 text-sm font-light tracking-wider'>
                © 2024 CinemaVault. Where AI meets artistry in film discovery.
              </p>
              <div className='w-3 h-3 bg-gradient-to-r from-teal-500 to-red-600 rounded-full'></div>
            </div>
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-1 h-1 bg-red-600/50 rounded-full'></div>
              <div className='w-1 h-1 bg-teal-500/50 rounded-full'></div>
              <div className='w-1 h-1 bg-red-600/50 rounded-full'></div>
            </div>
          </div>
        </div>
      </footer>

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

export default LandingPage
