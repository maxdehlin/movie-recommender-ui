function CinemaLogo({
  size = 'medium',
  showTitle = true,
  title = 'CinemaVault',
  subtitle = 'AI-Powered Discovery',
  className = '',
}) {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          logo: 'w-10 h-10',
          icon: 'text-lg',
          title: 'text-lg',
          subtitle: 'text-xs',
          sprockets: 'w-2 h-2',
        }
      case 'medium':
        return {
          logo: 'w-14 h-14',
          icon: 'text-2xl',
          title: 'text-2xl',
          subtitle: 'text-sm',
          sprockets: 'w-3 h-3',
        }
      case 'large':
        return {
          logo: 'w-20 h-20',
          icon: 'text-4xl',
          title: 'text-4xl',
          subtitle: 'text-lg',
          sprockets: 'w-4 h-4',
        }
      default:
        return {
          logo: 'w-14 h-14',
          icon: 'text-2xl',
          title: 'text-2xl',
          subtitle: 'text-sm',
          sprockets: 'w-3 h-3',
        }
    }
  }

  const styles = getSizeStyles()

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className='relative'>
        <div
          className={`${styles.logo} bg-gradient-to-br from-red-600 via-red-700 to-teal-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-red-600/30`}
        >
          <div className='absolute inset-3 rounded-full border border-gray-50/20'></div>
          <span className={`text-gray-50 font-bold ${styles.icon} relative z-10`}>
            🎬
          </span>
        </div>
        {/* Film sprocket holes */}
        <div
          className={`absolute -top-1 -left-1 ${styles.sprockets} bg-teal-500/30 rounded-full animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-1 -right-1 ${styles.sprockets} bg-red-600/30 rounded-full animate-pulse`}
        ></div>
      </div>

      {showTitle && (
        <div>
          <h1
            className={`${styles.title} font-serif text-gray-50 tracking-wide font-bold`}
          >
            {title}
          </h1>
          <p
            className={`${styles.subtitle} text-gray-400 font-light tracking-wide`}
          >
            {subtitle}
          </p>
        </div>
      )}

      <style jsx>{``}</style>
    </div>
  )
}

export default CinemaLogo
