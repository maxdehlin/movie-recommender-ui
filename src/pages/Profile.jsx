import FilmHeader from '../components/FilmHeader'

function Profile() {
  return (
    <div className='min-h-screen pt-12 pb-20 px-8'>
      <div className='max-w-5xl mx-auto space-y-16'>
        {/* Header - Director's Studio */}
        <section className='text-center space-y-12'>
          <div className='relative inline-block'>
            <FilmHeader
              title={["Director's", 'Studio']}
              subtitle='Your personal command center for managing preferences, viewing history, and cinematic profile'
              accentColor='teal'
            />
          </div>
        </section>

        {/* Profile Content - Coming Soon */}
        <div className='relative bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 p-16 shadow-2xl overflow-hidden'>
          {/* Film strip perforations */}
          <div className='absolute left-4 top-8 bottom-8 flex flex-col justify-center space-y-4'>
            <div className='w-3 h-3 bg-teal-500/20 rounded-full'></div>
            <div className='w-3 h-3 bg-red-600/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal-500/20 rounded-full'></div>
            <div className='w-3 h-3 bg-red-600/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal-500/20 rounded-full'></div>
          </div>
          <div className='absolute right-4 top-8 bottom-8 flex flex-col justify-center space-y-4'>
            <div className='w-3 h-3 bg-red-600/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal-500/20 rounded-full'></div>
            <div className='w-3 h-3 bg-red-600/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal-500/20 rounded-full'></div>
            <div className='w-3 h-3 bg-red-600/20 rounded-full'></div>
          </div>

          <div className='relative z-10 text-center space-y-12'>
            <div className='relative inline-block'>
              <div className='w-32 h-32 bg-gradient-to-br from-teal-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto border-2 border-gray-600/50 shadow-2xl'>
                <div className='absolute inset-8 rounded-full border border-gray-50/20'></div>
                <span className='text-6xl relative z-10 opacity-60'>🎭</span>
              </div>
              {/* Floating elements */}
              <div className='absolute -top-3 -right-3 w-6 h-6 bg-teal-500/20 rounded-full animate-float'></div>
              <div className='absolute -bottom-3 -left-3 w-4 h-4 bg-red-600/20 rounded-full animate-float-delay'></div>
            </div>

            <div className='space-y-8'>
              <div className='space-y-6'>
                <h2 className='text-3xl font-serif text-gray-50 tracking-wide'>
                  Profile Customization
                </h2>
                <p className='text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed'>
                  Your personal director's studio is currently in
                  post-production. Soon you'll be able to customize your viewing
                  preferences, manage your film history, and fine-tune your AI
                  recommendations.
                </p>
              </div>

              {/* Feature Preview Cards */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
                <div className='bg-gray-900/40 rounded-2xl border border-gray-600/30 p-8 space-y-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-full flex items-center justify-center mx-auto'>
                    <span className='text-2xl'>⚙️</span>
                  </div>
                  <h3 className='text-lg font-serif text-gray-50'>Preferences</h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    Customize your AI recommendation settings and viewing
                    preferences
                  </p>
                </div>

                <div className='bg-gray-900/40 rounded-2xl border border-gray-600/30 p-8 space-y-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full flex items-center justify-center mx-auto'>
                    <span className='text-2xl'>📊</span>
                  </div>
                  <h3 className='text-lg font-serif text-gray-50'>Analytics</h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    View detailed insights about your viewing patterns and taste
                    profile
                  </p>
                </div>

                <div className='bg-gray-900/40 rounded-2xl border border-gray-600/30 p-8 space-y-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-teal-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto'>
                    <span className='text-2xl'>🎬</span>
                  </div>
                  <h3 className='text-lg font-serif text-gray-50'>History</h3>
                  <p className='text-gray-400 text-sm leading-relaxed'>
                    Access your complete rating history and recommendation
                    timeline
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hover shimmer effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-2000'></div>
        </div>
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

export default Profile
