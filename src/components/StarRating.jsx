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
    <div className={`flex items-center space-x-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, index) => {
        const rating = index + 1
        const isActive = rating <= (hover || currentRating)
        const hasAnyRating = currentRating > 0

        return (
          <button
            key={rating}
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            className={`transition-all duration-200 ${currentSize} ${
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
