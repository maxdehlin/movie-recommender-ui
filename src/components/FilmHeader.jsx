function FilmHeader({
  title,
  subtitle,
  accentColor = 'crimson',
  className = '',
}) {
  const getAccentColorClass = () => {
    switch (accentColor) {
      case 'crimson':
        return 'text-crimson'
      case 'teal':
        return 'text-teal'
      case 'cream':
        return 'text-cream'
      default:
        return 'text-crimson'
    }
  }

  return (
    <section className={`text-center space-y-6 ${className}`}>
      <div className='space-y-4'>
        <h1 className='text-3xl md:text-4xl font-serif text-cream tracking-wide leading-tight'>
          {Array.isArray(title) ? (
            <>
              {title[0]}
              <span className={`block ${getAccentColorClass()} italic`}>
                {title[1]}
              </span>
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle && (
          <p className='text-lg text-muted-gray font-light max-w-2xl mx-auto leading-relaxed'>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

export default FilmHeader
