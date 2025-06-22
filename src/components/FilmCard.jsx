function FilmCard({
  children,
  variant = 'default',
  showPerforations = true,
  className = '',
  animationDelay = 0,
  intensity = 'medium',
  ...props
}) {
  const getVariantStyles = () => {
    const intensitySettings = {
      light: {
        bg: 'bg-charcoal-light/40',
        blur: 'backdrop-blur-md',
        border: 'border-gray-600/20',
      },
      medium: {
        bg: 'bg-charcoal-light/60',
        blur: 'backdrop-blur-xl',
        border: 'border-gray-600/30',
      },
      heavy: {
        bg: 'bg-charcoal-light/80',
        blur: 'backdrop-blur-2xl',
        border: 'border-gray-600/40',
      },
    }

    const currentIntensity =
      intensitySettings[intensity] || intensitySettings.medium

    switch (variant) {
      case 'primary':
        return {
          ...currentIntensity,
          hover:
            'hover:border-crimson/50 hover:shadow-crimson/25 hover:bg-charcoal-light/70',
          glow: 'shadow-2xl group-hover:shadow-crimson/20',
        }
      case 'secondary':
        return {
          ...currentIntensity,
          hover:
            'hover:border-teal/50 hover:shadow-teal/25 hover:bg-charcoal-light/70',
          glow: 'shadow-2xl group-hover:shadow-teal/20',
        }
      case 'glass':
        return {
          bg: 'bg-gradient-to-br from-charcoal-light/30 via-charcoal-light/20 to-charcoal-light/40',
          blur: 'backdrop-blur-3xl',
          border:
            'border-gradient-to-r from-gray-600/30 via-gray-500/20 to-gray-600/30',
          hover:
            'hover:border-gray-400/50 hover:shadow-white/10 hover:bg-gradient-to-br hover:from-charcoal-light/40 hover:via-charcoal-light/30 hover:to-charcoal-light/50',
          glow: 'shadow-xl group-hover:shadow-white/15',
        }
      case 'frosted':
        return {
          bg: 'bg-gradient-to-br from-white/5 via-white/2 to-white/8',
          blur: 'backdrop-blur-2xl backdrop-saturate-150',
          border: 'border-white/20',
          hover:
            'hover:border-white/40 hover:shadow-white/20 hover:bg-gradient-to-br hover:from-white/10 hover:via-white/5 hover:to-white/15',
          glow: 'shadow-2xl group-hover:shadow-white/25',
        }
      default:
        return {
          ...currentIntensity,
          hover:
            'hover:border-crimson/50 hover:shadow-crimson/25 hover:bg-charcoal-light/70',
          glow: 'shadow-2xl group-hover:shadow-crimson/20',
        }
    }
  }

  const styles = getVariantStyles()

  const baseStyles = `
    relative ${styles.blur} ${styles.bg} rounded-3xl border ${styles.border} 
    p-8 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 
    overflow-hidden group opacity-0 animate-fade-in-up
    ${styles.hover} ${styles.glow}
    touch-manipulation active:scale-[0.98]
    before:absolute before:inset-0 before:rounded-3xl 
    before:bg-gradient-to-br before:from-white/[0.05] before:via-transparent before:to-white/[0.02]
    before:opacity-0 before:transition-opacity before:duration-500
    hover:before:opacity-100
  `

  return (
    <div
      className={`${baseStyles} ${className}`}
      style={{
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'forwards',
      }}
      {...props}
    >
      {/* Enhanced film strip perforations */}
      {showPerforations && (
        <>
          <div className='absolute left-3 top-8 bottom-8 flex flex-col justify-center space-y-3 opacity-20 group-hover:opacity-50 transition-opacity duration-700'>
            <div className='w-2 h-2 bg-crimson/60 rounded-full animate-pulse-glow shadow-sm shadow-crimson/30'></div>
            <div
              className='w-2 h-2 bg-teal/60 rounded-full animate-pulse-glow shadow-sm shadow-teal/30'
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className='w-2 h-2 bg-crimson/60 rounded-full animate-pulse-glow shadow-sm shadow-crimson/30'
              style={{ animationDelay: '2s' }}
            ></div>
          </div>
          <div className='absolute right-3 top-8 bottom-8 flex flex-col justify-center space-y-3 opacity-20 group-hover:opacity-50 transition-opacity duration-700'>
            <div
              className='w-2 h-2 bg-teal/60 rounded-full animate-pulse-glow shadow-sm shadow-teal/30'
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className='w-2 h-2 bg-crimson/60 rounded-full animate-pulse-glow shadow-sm shadow-crimson/30'
              style={{ animationDelay: '1.5s' }}
            ></div>
            <div
              className='w-2 h-2 bg-teal/60 rounded-full animate-pulse-glow shadow-sm shadow-teal/30'
              style={{ animationDelay: '2.5s' }}
            ></div>
          </div>
        </>
      )}

      {/* Content with enhanced layering */}
      <div className='relative z-20 transform transition-transform duration-500 group-hover:scale-[1.01]'>
        {children}
      </div>

      {/* Multi-layered shimmer effects */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1400 ease-out opacity-0 group-hover:opacity-100'></div>
      <div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-crimson/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1600 ease-out opacity-0 group-hover:opacity-100'
        style={{ transitionDelay: '200ms' }}
      ></div>

      {/* Sophisticated inner glow layers */}
      <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
      <div className='absolute inset-0 rounded-3xl bg-gradient-to-tl from-crimson/0 via-crimson/0 to-crimson/3 opacity-0 group-hover:opacity-80 transition-opacity duration-900'></div>

      {/* Edge highlighting */}
      <div className='absolute inset-[1px] rounded-3xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
    </div>
  )
}

export default FilmCard
