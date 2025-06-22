function FilmCard({
  children,
  variant = 'default',
  showPerforations = true,
  className = '',
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-charcoal-light/60 border-gray-600/30 hover:border-crimson/40 shadow-2xl hover:shadow-crimson/10'
      case 'secondary':
        return 'bg-charcoal-light/60 border-gray-600/30 hover:border-teal/40 shadow-2xl hover:shadow-teal/10'
      case 'glass':
        return 'bg-charcoal-light/40 border-gray-600/20 hover:border-gray-500/40 shadow-xl backdrop-blur-2xl'
      default:
        return 'bg-charcoal-light/60 border-gray-600/30 hover:border-crimson/40 shadow-2xl hover:shadow-crimson/10'
    }
  }

  const baseStyles =
    'relative backdrop-blur-xl rounded-3xl border p-8 transition-all duration-500 hover:scale-105 overflow-hidden group'

  return (
    <div
      className={`${baseStyles} ${getVariantStyles()} ${className}`}
      {...props}
    >
      {/* Film strip perforations */}
      {showPerforations && (
        <>
          <div className='absolute left-3 top-8 bottom-8 flex flex-col justify-center space-y-3'>
            <div className='w-2 h-2 bg-crimson/20 rounded-full'></div>
            <div className='w-2 h-2 bg-teal/20 rounded-full'></div>
            <div className='w-2 h-2 bg-crimson/20 rounded-full'></div>
          </div>
          <div className='absolute right-3 top-8 bottom-8 flex flex-col justify-center space-y-3'>
            <div className='w-2 h-2 bg-teal/20 rounded-full'></div>
            <div className='w-2 h-2 bg-crimson/20 rounded-full'></div>
            <div className='w-2 h-2 bg-teal/20 rounded-full'></div>
          </div>
        </>
      )}

      {/* Content */}
      <div className='relative z-10'>{children}</div>

      {/* Hover shimmer effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
    </div>
  )
}

export default FilmCard
