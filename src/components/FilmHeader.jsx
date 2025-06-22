function FilmHeader({
  title,
  subtitle,
  accentColor = 'crimson',
  showReels = true,
  className = '',
}) {
  const getAccentColorClass = () => {
    switch (accentColor) {
      case 'crimson':
        return 'text-crimson'
      case 'teal':
        return 'text-teal'
      case 'cream':
        return 'text-cream'
      default:
        return 'text-crimson'
    }
  }

  const getReelColors = () => {
    switch (accentColor) {
      case 'crimson':
        return {
          left: 'border-crimson/20',
          leftInner: 'border-crimson/30',
          right: 'border-teal/20',
          rightInner: 'border-teal/30',
        }
      case 'teal':
        return {
          left: 'border-teal/20',
          leftInner: 'border-teal/30',
          right: 'border-crimson/20',
          rightInner: 'border-crimson/30',
        }
      default:
        return {
          left: 'border-crimson/20',
          leftInner: 'border-crimson/30',
          right: 'border-teal/20',
          rightInner: 'border-teal/30',
        }
    }
  }

  const reelColors = getReelColors()

  return (
    <section className={`text-center space-y-12 ${className}`}>
      <div className='relative inline-block'>
        {/* Film reel decorations */}
        {showReels && (
          <>
            <div
              className={`absolute -left-16 top-4 w-10 h-10 rounded-full border-4 ${reelColors.left} animate-spin-slow hidden lg:block`}
            >
              <div
                className={`absolute inset-2 rounded-full border-2 ${reelColors.leftInner}`}
              ></div>
            </div>
            <div
              className={`absolute -right-16 bottom-4 w-8 h-8 rounded-full border-3 ${reelColors.right} animate-spin-slow hidden lg:block`}
            >
              <div
                className={`absolute inset-1 rounded-full border ${reelColors.rightInner}`}
              ></div>
            </div>
          </>
        )}

        <div className='space-y-8'>
          <h1 className='text-5xl md:text-6xl font-serif text-cream tracking-wide leading-tight'>
            {Array.isArray(title) ? (
              <>
                {title[0]}
                <span className={`block ${getAccentColorClass()} italic`}>
                  {title[1]}
                </span>
              </>
            ) : (
              title
            )}
          </h1>
          {subtitle && (
            <p className='text-xl text-muted-gray font-light max-w-3xl mx-auto leading-relaxed'>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default FilmHeader
