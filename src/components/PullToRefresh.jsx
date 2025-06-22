import { useState, useRef } from 'react'
import cx from 'clsx'

function PullToRefresh({ onRefresh, children, className = '' }) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)
  const containerRef = useRef(null)

  const maxPullDistance = 80
  const refreshThreshold = 60

  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop > 0) return
    startY.current = e.touches[0].clientY
    setIsPulling(true)
  }

  const handleTouchMove = (e) => {
    if (!isPulling || containerRef.current?.scrollTop > 0) return

    currentY.current = e.touches[0].clientY
    const distance = Math.max(0, currentY.current - startY.current)
    const constrainedDistance = Math.min(distance * 0.4, maxPullDistance)

    setPullDistance(constrainedDistance)

    if (constrainedDistance > 0) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling) return

    setIsPulling(false)

    if (pullDistance >= refreshThreshold && !isRefreshing) {
      setIsRefreshing(true)

      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(100)
      }

      try {
        await onRefresh()
      } finally {
        setTimeout(() => {
          setIsRefreshing(false)
          setPullDistance(0)
        }, 500)
      }
    } else {
      setPullDistance(0)
    }
  }

  const shouldShowRefreshIcon = isPulling && pullDistance > 10
  const shouldShowSpinner = isRefreshing
  const iconRotation = Math.min((pullDistance / refreshThreshold) * 180, 180)

  return (
    <div
      ref={containerRef}
      className={cx('relative overflow-hidden', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateY(${
          isPulling || isRefreshing ? pullDistance : 0
        }px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Pull-to-refresh indicator */}
      <div
        className={cx(
          'absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200',
          shouldShowRefreshIcon || shouldShowSpinner
            ? 'opacity-100'
            : 'opacity-0'
        )}
        style={{
          height: `${pullDistance}px`,
          transform: `translateY(-${pullDistance}px)`,
        }}
      >
        <div className='flex flex-col items-center space-y-2'>
          {shouldShowSpinner ? (
            <div className='w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin' />
          ) : (
            <div
              className='w-6 h-6 text-teal-500 transition-transform duration-200'
              style={{ transform: `rotate(${iconRotation}deg)` }}
            >
              ↓
            </div>
          )}
          <span className='text-xs text-gray-400 font-medium'>
            {isRefreshing
              ? 'Refreshing...'
              : pullDistance >= refreshThreshold
              ? 'Release to refresh'
              : 'Pull down to refresh'}
          </span>
        </div>
      </div>

      {children}
    </div>
  )
}

export default PullToRefresh
