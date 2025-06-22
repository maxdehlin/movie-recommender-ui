function LoadingSpinner({
  size = 'medium',
  color = 'teal',
  title = 'Loading...',
  subtitle = '',
  fullScreen = false,
  variant = 'default',
}) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  }

  const colorClasses = {
    teal: 'border-teal/30 border-t-teal',
    crimson: 'border-crimson/30 border-t-crimson',
  }

  const innerColorClasses = {
    teal: 'bg-teal/20',
    crimson: 'bg-crimson/20',
  }

  const containerClass = fullScreen
    ? 'min-h-screen bg-charcoal flex items-center justify-center'
    : 'flex items-center justify-center py-12'

  if (variant === 'cinematic') {
    return (
      <div className={containerClass}>
        <div className='text-center space-y-12 opacity-0 animate-fade-in-up'>
          {/* Simple Loader */}
          <div
            className='relative mx-auto'
            style={{ width: '80px', height: '80px' }}
          >
            {/* Outer ring */}
            <div className='absolute inset-0 border-4 border-teal/20 rounded-full'></div>

            {/* Inner spinning element */}
            <div className='absolute inset-2 border-3 border-transparent border-t-teal border-r-teal rounded-full animate-spin'></div>

            {/* Center hub */}
            <div className='absolute inset-6 bg-gradient-to-br from-teal/30 to-crimson/30 rounded-full flex items-center justify-center'>
              <div className='w-4 h-4 bg-cream/80 rounded-full animate-pulse-glow'></div>
            </div>
          </div>

          {/* Loading dots */}
          <div className='flex items-center justify-center space-x-2'>
            <div
              className='w-2 h-2 bg-teal/60 rounded-full animate-bounce'
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              className='w-2 h-2 bg-crimson/60 rounded-full animate-bounce'
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className='w-2 h-2 bg-teal/60 rounded-full animate-bounce'
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>

          {(title || subtitle) && (
            <div
              className='space-y-4 transform animate-fade-in-scale'
              style={{ animationDelay: '0.5s' }}
            >
              {title && (
                <h3 className='text-2xl font-serif text-cream tracking-wide'>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className='text-muted-gray text-lg font-light leading-relaxed'>
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <div className='text-center space-y-8 opacity-0 animate-fade-in-up'>
        <div className='relative'>
          {/* Enhanced main spinner */}
          <div
            className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin mx-auto shadow-lg`}
            style={{
              background: `conic-gradient(from 0deg, transparent, ${
                color === 'teal' ? '#14b8a6' : '#dc2626'
              }20, transparent)`,
            }}
          ></div>

          {/* Inner pulsing core */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div
              className={`${
                size === 'small'
                  ? 'w-4 h-4'
                  : size === 'medium'
                  ? 'w-12 h-12'
                  : 'w-20 h-20'
              } ${
                innerColorClasses[color]
              } rounded-full animate-pulse-glow border border-white/20`}
            ></div>
          </div>

          {/* Outer glow ring */}
          <div className='absolute inset-0 rounded-full border border-white/10 animate-pulse-slow'></div>
        </div>

        {(title || subtitle) && (
          <div
            className='space-y-3 transform animate-slide-in-right'
            style={{ animationDelay: '0.3s' }}
          >
            {title && (
              <h3
                className={`font-serif text-cream tracking-wide ${
                  size === 'small'
                    ? 'text-lg'
                    : size === 'medium'
                    ? 'text-3xl'
                    : 'text-4xl'
                }`}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={`text-muted-gray font-light ${
                  size === 'small' ? 'text-sm' : 'text-lg'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadingSpinner
