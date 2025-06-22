function Alert({ type = 'info', children, onClose = null, className = '' }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-teal/15 border-teal/40',
          text: 'text-cream',
          icon: 'bg-teal/30',
          dot: 'bg-teal',
        }
      case 'error':
        return {
          bg: 'bg-crimson/15 border-crimson/40',
          text: 'text-cream',
          icon: 'bg-crimson/30',
          dot: 'bg-crimson',
        }
      case 'warning':
        return {
          bg: 'bg-yellow-500/15 border-yellow-500/40',
          text: 'text-cream',
          icon: 'bg-yellow-500/30',
          dot: 'bg-yellow-500',
        }
      case 'info':
      default:
        return {
          bg: 'bg-blue-500/15 border-blue-500/40',
          text: 'text-cream',
          icon: 'bg-blue-500/30',
          dot: 'bg-blue-500',
        }
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        )
      case 'error':
        return (
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        )
      case 'warning':
        return (
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        )
      case 'info':
      default:
        return (
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )
    }
  }

  const styles = getTypeStyles()

  return (
    <div
      className={`p-6 ${styles.bg} border ${
        styles.bg.split(' ')[1]
      } rounded-2xl ${
        styles.text
      } backdrop-blur-sm animate-fade-in shadow-xl ${className}`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div
            className={`w-8 h-8 rounded-full ${styles.icon} flex items-center justify-center`}
          >
            <div
              className={`w-4 h-4 ${styles.dot} rounded-full animate-pulse flex items-center justify-center`}
            >
              <div className='text-white text-xs'>{getIcon()}</div>
            </div>
          </div>
          <div className='font-medium text-lg'>{children}</div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className='ml-4 text-cream/60 hover:text-cream transition-colors duration-200'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
