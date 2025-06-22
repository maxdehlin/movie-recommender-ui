function LoadingSpinner({
  size = 'medium',
  color = 'teal',
  title = 'Loading...',
  subtitle = '',
  fullScreen = false,
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

  return (
    <div className={containerClass}>
      <div className='text-center space-y-8'>
        <div className='relative'>
          <div
            className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin mx-auto`}
          ></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div
              className={`${
                size === 'small'
                  ? 'w-4 h-4'
                  : size === 'medium'
                  ? 'w-12 h-12'
                  : 'w-20 h-20'
              } ${innerColorClasses[color]} rounded-full animate-pulse`}
            ></div>
          </div>
        </div>
        {(title || subtitle) && (
          <div className='space-y-3'>
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
                className={`text-muted-gray ${
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
