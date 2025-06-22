import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='min-h-screen bg-charcoal relative overflow-hidden flex flex-col'>
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
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-crimson/5 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/3 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-0 left-1/2 w-72 h-72 bg-crimson/3 rounded-full blur-3xl animate-pulse delay-2000'></div>

        {/* Floating film elements */}
        <div className='absolute top-20 left-10 w-6 h-6 bg-crimson/20 rounded-full animate-float'></div>
        <div className='absolute top-40 right-20 w-4 h-4 bg-teal/20 rounded-full animate-float-delay'></div>
        <div className='absolute bottom-32 left-1/4 w-3 h-3 bg-crimson/15 rounded-full animate-float'></div>
        <div className='absolute bottom-20 right-1/3 w-5 h-5 bg-teal/15 rounded-full animate-float-delay'></div>
        <div className='absolute top-1/2 left-20 w-2 h-2 bg-teal/25 rounded-full animate-float'></div>
        <div className='absolute top-3/4 right-10 w-4 h-4 bg-crimson/20 rounded-full animate-float-delay'></div>
      </div>

      {/* Header - Cinema Marquee Style */}
      <header className='relative z-10 backdrop-blur-xl bg-charcoal-light/90 border-b border-gray-600/30 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <div className='w-14 h-14 bg-gradient-to-br from-crimson via-crimson-dark to-teal rounded-full flex items-center justify-center shadow-2xl border-2 border-crimson/30'>
                  <div className='absolute inset-3 rounded-full border border-cream/20'></div>
                  <span className='text-cream font-bold text-2xl relative z-10'>
                    🎬
                  </span>
                </div>
                {/* Film sprocket holes */}
                <div className='absolute -top-1 -left-1 w-3 h-3 bg-teal/30 rounded-full animate-pulse'></div>
                <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-crimson/30 rounded-full animate-pulse'></div>
              </div>
              <div>
                <h1 className='text-2xl font-serif text-cream tracking-wide font-bold'>
                  CinemaVault
                </h1>
                <p className='text-sm text-muted-gray font-light tracking-wide'>
                  AI-Powered Discovery
                </p>
              </div>
            </div>

            <Link
              to='/login'
              className='relative px-8 py-4 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-charcoal rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-teal/30 border border-teal/50 group overflow-hidden'
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
                  <h1 className='text-6xl md:text-8xl font-serif text-cream tracking-wide leading-tight'>
                    Discover Your Next
                    <span className='block text-transparent bg-gradient-to-r from-crimson via-teal to-crimson bg-clip-text italic'>
                      Cinematic Obsession
                    </span>
                  </h1>
                  <p className='text-xl md:text-2xl text-muted-gray font-light leading-relaxed max-w-4xl mx-auto'>
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
                  className='relative px-16 py-6 bg-gradient-to-r from-crimson via-crimson-dark to-teal hover:from-crimson-dark hover:via-teal hover:to-crimson text-cream rounded-3xl font-bold text-xl transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-crimson/30 border border-crimson/50 tracking-wide overflow-hidden group'
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

                <div className='flex items-center space-x-6 text-muted-gray'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 bg-teal rounded-full animate-pulse'></div>
                    <span className='text-sm font-medium tracking-wider uppercase'>
                      Free Access
                    </span>
                  </div>
                  <div className='w-1 h-1 bg-gray-600 rounded-full'></div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 bg-crimson rounded-full animate-pulse delay-300'></div>
                    <span className='text-sm font-medium tracking-wider uppercase'>
                      AI Powered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features - Cinema Experience */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto pt-24'>
              <div className='group text-center space-y-8 bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-crimson/40 p-10 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-crimson/10'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-br from-crimson/20 to-crimson-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-crimson/30 group-hover:border-crimson/50 transition-all duration-300'>
                    <span className='text-4xl group-hover:animate-pulse'>
                      🎭
                    </span>
                  </div>
                  {/* Film sprocket holes */}
                  <div className='absolute -top-2 -right-2 w-3 h-3 bg-crimson/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-2 -left-2 w-2 h-2 bg-teal/30 rounded-full animate-pulse'></div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-2xl font-serif text-cream group-hover:text-crimson transition-colors duration-300 tracking-wide'>
                    Rate Your Films
                  </h3>
                  <p className='text-muted-gray group-hover:text-cream/80 transition-colors duration-300 leading-relaxed font-light'>
                    Share your cinematic experiences by rating films you've
                    watched. Each rating helps our AI understand your unique
                    taste profile.
                  </p>
                </div>
              </div>

              <div className='group text-center space-y-8 bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-teal/40 p-10 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-teal/10'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-br from-teal/20 to-teal-dark/20 rounded-full flex items-center justify-center mx-auto border-2 border-teal/30 group-hover:border-teal/50 transition-all duration-300'>
                    <span className='text-4xl group-hover:animate-pulse'>
                      🤖
                    </span>
                  </div>
                  {/* Film sprocket holes */}
                  <div className='absolute -top-2 -left-2 w-3 h-3 bg-teal/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-2 -right-2 w-2 h-2 bg-crimson/30 rounded-full animate-pulse'></div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-2xl font-serif text-cream group-hover:text-teal transition-colors duration-300 tracking-wide'>
                    AI Curation
                  </h3>
                  <p className='text-muted-gray group-hover:text-cream/80 transition-colors duration-300 leading-relaxed font-light'>
                    Advanced algorithms analyze patterns in your preferences,
                    discovering subtle connections between films you love.
                  </p>
                </div>
              </div>

              <div className='group text-center space-y-8 bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-crimson/40 p-10 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-crimson/10'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-br from-crimson/20 to-teal/20 rounded-full flex items-center justify-center mx-auto border-2 border-crimson/30 group-hover:border-crimson/50 transition-all duration-300'>
                    <span className='text-4xl group-hover:animate-pulse'>
                      ✨
                    </span>
                  </div>
                  {/* Film sprocket holes */}
                  <div className='absolute -top-2 -right-2 w-2 h-2 bg-teal/30 rounded-full animate-pulse'></div>
                  <div className='absolute -bottom-2 -left-2 w-3 h-3 bg-crimson/30 rounded-full animate-pulse'></div>
                </div>
                <div className='space-y-4'>
                  <h3 className='text-2xl font-serif text-cream group-hover:text-crimson transition-colors duration-300 tracking-wide'>
                    Perfect Discoveries
                  </h3>
                  <p className='text-muted-gray group-hover:text-cream/80 transition-colors duration-300 leading-relaxed font-light'>
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
      <footer className='relative z-10 border-t border-gray-600/30 backdrop-blur-xl bg-charcoal-light/80'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 py-12'>
          <div className='text-center space-y-6'>
            <div className='flex items-center justify-center space-x-4'>
              <div className='w-3 h-3 bg-gradient-to-r from-crimson to-teal rounded-full'></div>
              <p className='text-muted-gray text-sm font-light tracking-wider'>
                © 2024 CinemaVault. Where AI meets artistry in film discovery.
              </p>
              <div className='w-3 h-3 bg-gradient-to-r from-teal to-crimson rounded-full'></div>
            </div>
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-1 h-1 bg-crimson/50 rounded-full'></div>
              <div className='w-1 h-1 bg-teal/50 rounded-full'></div>
              <div className='w-1 h-1 bg-crimson/50 rounded-full'></div>
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
