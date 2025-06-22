import cx from 'clsx'

function ResponsiveGrid({
  children,
  variant = 'cards',
  gap = 'default',
  className = '',
}) {
  const variantClasses = {
    cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    list: 'flex flex-col',
    compact: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  }

  const gapClasses = {
    tight: 'gap-2',
    default: 'gap-4',
    loose: 'gap-6',
    mobile: 'gap-3 sm:gap-4 lg:gap-6',
  }

  return (
    <div
      className={cx(
        variantClasses[variant],
        gapClasses[gap],
        'w-full',
        className
      )}
    >
      {children}
    </div>
  )
}

export default ResponsiveGrid
