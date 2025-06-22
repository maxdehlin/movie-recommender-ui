function FilmReel({
  size = 'medium',
  color = 'teal',
  position = 'left',
  className = '',
}) {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-12 h-12 border-4',
  }

  const colorClasses = {
    teal: 'border-teal/20',
    crimson: 'border-crimson/20',
  }

  const innerColorClasses = {
    teal: 'border-teal/30',
    crimson: 'border-crimson/30',
  }

  const innerRingClasses = {
    teal: 'border-teal/50',
    crimson: 'border-crimson/50',
  }

  const positionClasses = {
    left: '-left-16 top-4',
    right: '-right-16 bottom-4',
    'top-left': '-left-12 top-8',
    'top-right': '-right-12 top-8',
    'bottom-left': '-left-12 bottom-8',
    'bottom-right': '-right-12 bottom-8',
  }

  const insetClasses = {
    small: 'inset-1',
    medium: 'inset-2',
    large: 'inset-2',
  }

  const innerInsetClasses = {
    small: 'inset-1',
    medium: 'inset-1',
    large: 'inset-4',
  }

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} rounded-full ${colorClasses[color]} animate-spin-slow hidden lg:block ${className}`}
    >
      <div
        className={`absolute ${insetClasses[size]} rounded-full border-2 ${innerColorClasses[color]}`}
      ></div>
      {size === 'large' && (
        <div
          className={`absolute ${innerInsetClasses[size]} rounded-full border ${innerRingClasses[color]}`}
        ></div>
      )}
    </div>
  )
}

export default FilmReel
