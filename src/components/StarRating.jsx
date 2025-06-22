import { useState } from 'react'

function StarRating({
  movie,
  currentRating = 0,
  onRate,
  size = 'default',
  starChar = '★',
  maxRating = 5,
  readOnly = false,
  showHover = true,
  className = '',
}) {
  const [hover, setHover] = useState(0)

  const sizeClasses = {
    small: 'text-sm',
    default: 'text-lg',
    large: 'text-2xl',
  }

  const currentSize = sizeClasses[size] || sizeClasses.default

  const handleClick = (rating) => {
    if (!readOnly && onRate) {
      onRate(movie, rating)
    }
  }

  const handleKeyDown = (event, rating) => {
    if (!readOnly) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(rating)
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault()
        const nextRating = Math.min(rating + 1, maxRating)
        document.querySelector(`[data-rating="${nextRating}"]`)?.focus()
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault()
        const prevRating = Math.max(rating - 1, 1)
        document.querySelector(`[data-rating="${prevRating}"]`)?.focus()
      }
    }
  }

  const handleMouseEnter = (rating) => {
    if (!readOnly && showHover) {
      setHover(rating)
    }
  }

  const handleMouseLeave = () => {
    if (!readOnly && showHover) {
      setHover(0)
    }
  }

  return (
    <div
      className={`flex items-center space-x-1 ${className}`}
      role='group'
      aria-label={`Rate ${
        movie?.title || 'movie'
      } out of ${maxRating} stars. Current rating: ${currentRating} stars`}
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const rating = index + 1
        const isActive = rating <= (hover || currentRating)
        const hasAnyRating = currentRating > 0

        return (
          <button
            key={rating}
            data-rating={rating}
            onClick={() => handleClick(rating)}
            onKeyDown={(e) => handleKeyDown(e, rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
            aria-pressed={isActive}
            tabIndex={readOnly ? -1 : 0}
            className={`transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded ${currentSize} ${
              readOnly ? 'cursor-default' : 'cursor-pointer'
            } ${
              isActive
                ? 'text-yellow-400'
                : hasAnyRating
                ? 'text-gray-500'
                : readOnly
                ? 'text-gray-600'
                : 'text-gray-600 hover:text-yellow-300'
            }`}
          >
            {starChar}
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
