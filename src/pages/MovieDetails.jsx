import { useParams } from 'react-router-dom'
import FilmHeader from '../components/FilmHeader'

function MovieDetails() {
  const { id } = useParams()

  return (
    <div className='min-h-screen pt-12 pb-20 px-8'>
      <div className='max-w-5xl mx-auto space-y-16'>
        {/* Header - Film Archive */}
        <section className='text-center space-y-12'>
          <div className='relative inline-block'>
            {/* Film reel decorations */}
            <div className='absolute -left-16 top-4 w-10 h-10 rounded-full border-4 border-crimson/20 animate-spin-slow hidden lg:block'>
              <div className='absolute inset-2 rounded-full border-2 border-crimson/30'></div>
            </div>
            <div className='absolute -right-16 bottom-4 w-8 h-8 rounded-full border-3 border-teal/20 animate-spin-slow hidden lg:block'>
              <div className='absolute inset-1 rounded-full border border-teal/30'></div>
            </div>

            <FilmHeader
              title={['Film', 'Archive']}
              subtitle='Deep dive into cinematic details, cast information, and critical analysis'
              accentColor='crimson'
            />
          </div>
        </section>

        {/* Movie Details Content - Coming Soon */}
        <div className='relative bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 p-16 shadow-2xl overflow-hidden'>
          {/* Film strip perforations */}
          <div className='absolute left-4 top-8 bottom-8 flex flex-col justify-center space-y-4'>
            <div className='w-3 h-3 bg-crimson/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal/20 rounded-full'></div>
            <div className='w-3 h-3 bg-crimson/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal/20 rounded-full'></div>
            <div className='w-3 h-3 bg-crimson/20 rounded-full'></div>
          </div>
          <div className='absolute right-4 top-8 bottom-8 flex flex-col justify-center space-y-4'>
            <div className='w-3 h-3 bg-teal/20 rounded-full'></div>
            <div className='w-3 h-3 bg-crimson/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal/20 rounded-full'></div>
            <div className='w-3 h-3 bg-crimson/20 rounded-full'></div>
            <div className='w-3 h-3 bg-teal/20 rounded-full'></div>
          </div>

          <div className='relative z-10 text-center space-y-12'>
            <div className='relative inline-block'>
              <div className='w-32 h-32 bg-gradient-to-br from-crimson/20 to-teal/20 rounded-full flex items-center justify-center mx-auto border-2 border-gray-600/50 shadow-2xl'>
                <div className='absolute inset-8 rounded-full border border-cream/20'></div>
                <span className='text-6xl relative z-10 opacity-60'>🎬</span>
              </div>
              {/* Floating elements */}
              <div className='absolute -top-3 -right-3 w-6 h-6 bg-crimson/20 rounded-full animate-float'></div>
              <div className='absolute -bottom-3 -left-3 w-4 h-4 bg-teal/20 rounded-full animate-float-delay'></div>
            </div>

            <div className='space-y-8'>
              <div className='space-y-6'>
                <h2 className='text-3xl font-serif text-cream tracking-wide'>
                  Detailed Film Analysis
                </h2>
                <p className='text-muted-gray text-lg font-light max-w-2xl mx-auto leading-relaxed'>
                  Our comprehensive film archive is currently being catalogued.
                  Soon you'll have access to in-depth movie information, cast
                  details, critical reviews, and cinematic analysis.
                </p>
                {id && (
                  <div className='mt-8 p-4 bg-charcoal/40 rounded-2xl border border-gray-600/30'>
                    <p className='text-teal text-sm font-medium tracking-wider uppercase'>
                      Archive Reference: {id}
                    </p>
                  </div>
                )}
              </div>

              {/* Feature Preview Cards */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
                <div className='bg-charcoal/40 rounded-2xl border border-gray-600/30 p-8 space-y-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-crimson/20 to-crimson-dark/20 rounded-full flex items-center justify-center mx-auto'>
                    <span className='text-2xl'>🎭</span>
                  </div>
                  <h3 className='text-lg font-serif text-cream'>Cast & Crew</h3>
                  <p className='text-muted-gray text-sm leading-relaxed'>
                    Complete filmography with detailed cast information and crew
                    credits
                  </p>
                </div>

                <div className='bg-charcoal/40 rounded-2xl border border-gray-600/30 p-8 space-y-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-teal/20 to-teal-dark/20 rounded-full flex items-center justify-center mx-auto'>
                    <span className='text-2xl'>📝</span>
                  </div>
                  <h3 className='text-lg font-serif text-cream'>Reviews</h3>
                  <p className='text-muted-gray text-sm leading-relaxed'>
                    Critical reviews, audience ratings, and professional film
                    analysis
                  </p>
                </div>

                <div className='bg-charcoal/40 rounded-2xl border border-gray-600/30 p-8 space-y-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-crimson/20 to-teal/20 rounded-full flex items-center justify-center mx-auto'>
                    <span className='text-2xl'>🎥</span>
                  </div>
                  <h3 className='text-lg font-serif text-cream'>Media</h3>
                  <p className='text-muted-gray text-sm leading-relaxed'>
                    Trailers, behind-the-scenes content, and production stills
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

export default MovieDetails
