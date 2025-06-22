import { useState, useRef } from 'react'

const useSwipeGesture = (onSwipeLeft, onSwipeRight, options = {}) => {
  const {
    minSwipeDistance = 50,
    maxSwipeTime = 300,
    preventDefaultTouchmove = true,
  } = options

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const startTime = useRef(null)

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    startTime.current = Date.now()
  }

  const onTouchMove = (e) => {
    if (preventDefaultTouchmove) {
      e.preventDefault()
    }
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    const timeElapsed = Date.now() - startTime.current

    if (timeElapsed > maxSwipeTime) return

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
  }

  const handlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }

  return handlers
}

export default useSwipeGesture
