function FilmButton({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  className = '',
  icon = null,
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-crimson to-crimson-dark hover:from-crimson-dark hover:to-crimson text-cream border-crimson/50 hover:border-crimson/70 shadow-xl hover:shadow-crimson/30'
      case 'secondary':
        return 'bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-charcoal border-teal/50 hover:border-teal/70 shadow-xl hover:shadow-teal/30'
      case 'ghost':
        return 'bg-charcoal-light/60 hover:bg-charcoal-light/80 text-cream border-gray-600/50 hover:border-gray-500/70 shadow-xl backdrop-blur-xl'
      case 'danger':
        return 'bg-crimson/80 hover:bg-crimson text-cream border-crimson/50 hover:border-crimson shadow-lg hover:shadow-crimson/25'
      default:
        return 'bg-gradient-to-r from-crimson to-crimson-dark hover:from-crimson-dark hover:to-crimson text-cream border-crimson/50 hover:border-crimson/70 shadow-xl hover:shadow-crimson/30'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-6 py-3 text-sm rounded-xl'
      case 'medium':
        return 'px-8 py-4 text-base rounded-2xl'
      case 'large':
        return 'px-12 py-6 text-lg rounded-3xl'
      case 'xlarge':
        return 'px-16 py-6 text-xl rounded-3xl'
      default:
        return 'px-8 py-4 text-base rounded-2xl'
    }
  }

  const baseStyles =
    'relative font-bold transition-all duration-500 hover:scale-105 border group overflow-hidden tracking-wide'
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed hover:scale-100'
    : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${getVariantStyles()} ${getSizeStyles()} ${disabledStyles} ${className}`}
      {...props}
    >
      {/* Shimmer effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>

      <span className='relative z-10 flex items-center justify-center space-x-2'>
        <span>{children}</span>
        {icon && (
          <span className='group-hover:translate-x-1 transition-transform duration-300'>
            {icon}
          </span>
        )}
      </span>
    </button>
  )
}

export default FilmButton
