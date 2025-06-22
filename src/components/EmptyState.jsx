import FilmButton from './FilmButton'

function EmptyState({
  icon = '🎬',
  title,
  subtitle,
  actionText,
  actionHref,
  actionOnClick,
  size = 'large',
  variant = 'primary',
}) {
  const sizeClasses = {
    small: {
      container: 'py-16',
      icon: 'w-24 h-24 text-4xl',
      title: 'text-2xl',
      subtitle: 'text-base max-w-md',
    },
    medium: {
      container: 'py-24',
      icon: 'w-32 h-32 text-5xl',
      title: 'text-3xl',
      subtitle: 'text-lg max-w-lg',
    },
    large: {
      container: 'py-32',
      icon: 'w-48 h-48 text-8xl',
      title: 'text-4xl',
      subtitle: 'text-xl max-w-lg',
    },
  }

  const variantClasses = {
    primary: 'from-crimson/10 to-teal/10',
    secondary: 'from-teal/10 to-crimson/10',
    muted: 'from-gray-600/10 to-gray-500/10',
  }

  const currentSize = sizeClasses[size]

  return (
    <div className={`text-center space-y-12 ${currentSize.container}`}>
      <div className='relative inline-block mb-12'>
        <div
          className={`mx-auto bg-gradient-to-br ${variantClasses[variant]} rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600/30 shadow-2xl ${currentSize.icon}`}
        >
          <div className='absolute inset-8 rounded-full border-2 border-cream/20'></div>
          <div className='absolute inset-12 rounded-full border border-cream/10'></div>
          <span
            className={`opacity-40 relative z-10 ${
              currentSize.icon.includes('text-8xl')
                ? 'text-8xl'
                : currentSize.icon.includes('text-5xl')
                ? 'text-5xl'
                : 'text-4xl'
            }`}
          >
            {icon}
          </span>
        </div>

        {/* Floating film elements */}
        <div className='absolute -top-4 -left-4 w-8 h-8 bg-crimson/20 rounded-full animate-float'></div>
        <div className='absolute -top-4 -right-4 w-6 h-6 bg-teal/20 rounded-full animate-float-delay'></div>
        <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-teal/15 rounded-full animate-float'></div>
        <div className='absolute -bottom-4 -right-4 w-4 h-4 bg-crimson/15 rounded-full animate-float-delay'></div>
      </div>

      <div className='space-y-8'>
        <div className='space-y-6'>
          {title && (
            <h3
              className={`font-serif text-cream tracking-wide ${currentSize.title}`}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              className={`text-muted-gray font-light mx-auto leading-relaxed ${currentSize.subtitle}`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {actionText && (actionHref || actionOnClick) && (
          <div>
            {actionHref ? (
              <a href={actionHref}>
                <FilmButton
                  size={size === 'small' ? 'medium' : 'xlarge'}
                  variant='primary'
                  icon={
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  }
                >
                  {actionText}
                </FilmButton>
              </a>
            ) : (
              <FilmButton
                size={size === 'small' ? 'medium' : 'xlarge'}
                variant='primary'
                onClick={actionOnClick}
                icon={
                  <svg
                    className='w-6 h-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                }
              >
                {actionText}
              </FilmButton>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmptyState
