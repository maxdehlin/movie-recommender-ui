import { useState, useEffect } from 'react'

function Toast({ message, type = 'info', duration = 4000, onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      setIsExiting(false)

      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-teal/20 to-teal-dark/20',
          border: 'border-teal/40',
          shadow: 'shadow-teal/20',
          icon: '✓',
          iconBg: 'bg-teal/30',
          iconColor: 'text-teal-light',
        }
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-crimson/20 to-crimson-dark/20',
          border: 'border-crimson/40',
          shadow: 'shadow-crimson/20',
          icon: '✕',
          iconBg: 'bg-crimson/30',
          iconColor: 'text-crimson-light',
        }
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-orange-500/20 to-orange-600/20',
          border: 'border-orange-500/40',
          shadow: 'shadow-orange-500/20',
          icon: '⚠',
          iconBg: 'bg-orange-500/30',
          iconColor: 'text-orange-300',
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-teal/20 to-crimson/20',
          border: 'border-gray-500/40',
          shadow: 'shadow-gray-500/20',
          icon: 'ℹ',
          iconBg: 'bg-gray-500/30',
          iconColor: 'text-gray-300',
        }
    }
  }

  if (!isVisible) return null

  const styles = getTypeStyles()

  return (
    <div className='fixed top-4 right-4 z-50'>
      <div
        className={`
          ${styles.bg} ${styles.border} ${styles.shadow}
          backdrop-blur-xl rounded-2xl border p-4 pr-6 shadow-2xl
          transform transition-all duration-300 ease-out
          ${
            isExiting
              ? 'translate-x-full opacity-0 scale-95'
              : 'translate-x-0 opacity-100 scale-100 animate-slide-in-right'
          }
          max-w-md min-w-[320px]
        `}
      >
        <div className='flex items-start space-x-4'>
          {/* Icon */}
          <div
            className={`
            ${styles.iconBg} ${styles.iconColor}
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            font-bold text-sm animate-bounce-in
          `}
          >
            {styles.icon}
          </div>

          {/* Content */}
          <div className='flex-1 pt-1'>
            <p className='text-cream text-sm font-medium leading-relaxed'>
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className='flex-shrink-0 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 text-cream/60 hover:text-cream/80 text-xs font-bold ml-2'
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden'>
          <div
            className={`h-full ${
              type === 'success'
                ? 'bg-teal'
                : type === 'error'
                ? 'bg-crimson'
                : type === 'warning'
                ? 'bg-orange-500'
                : 'bg-gray-500'
            } transition-all ease-linear`}
            style={{
              width: '100%',
              animation: `shrink ${duration}ms linear`,
            }}
          ></div>
        </div>

        {/* Film strip perforations */}
        <div className='absolute left-2 top-1/2 transform -translate-y-1/2 space-y-1 opacity-30'>
          <div className='w-1 h-1 bg-current rounded-full'></div>
          <div className='w-1 h-1 bg-current rounded-full'></div>
          <div className='w-1 h-1 bg-current rounded-full'></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}

// Toast container component to manage multiple toasts
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className='fixed top-4 right-4 z-50 space-y-3'>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

export default Toast
export { ToastContainer }
