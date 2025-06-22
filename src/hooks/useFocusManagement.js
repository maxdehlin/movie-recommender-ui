import { useRef } from 'react'

const useFocusManagement = () => {
  const lastFocusedElement = useRef(null)

  const saveFocus = () => {
    lastFocusedElement.current = document.activeElement
  }

  const restoreFocus = () => {
    if (
      lastFocusedElement.current &&
      typeof lastFocusedElement.current.focus === 'function'
    ) {
      lastFocusedElement.current.focus()
    }
  }

  const focusFirstElement = (
    selector = '[tabindex="0"], button, input, select, textarea, a[href]'
  ) => {
    const element = document.querySelector(selector)
    if (element) {
      element.focus()
    }
  }

  const getFocusableElements = (container) => {
    return container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  }

  const announceToScreenReader = (message, priority = 'polite') => {
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'

    document.body.appendChild(announcer)

    setTimeout(() => {
      announcer.textContent = message
      setTimeout(() => {
        document.body.removeChild(announcer)
      }, 1000)
    }, 100)
  }

  return {
    saveFocus,
    restoreFocus,
    focusFirstElement,
    getFocusableElements,
    announceToScreenReader,
  }
}

export default useFocusManagement
