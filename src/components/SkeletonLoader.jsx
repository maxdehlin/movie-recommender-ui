function SkeletonLoader({ variant = 'card', count = 1, className = '' }) {
  const renderMovieCard = () => (
    <div className='bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-600/30 p-4 animate-pulse overflow-hidden relative'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4 flex-1'>
          <div className='w-12 h-18 bg-gray-700/50 rounded-lg relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer'></div>
          </div>
          <div className='flex-1 min-w-0 space-y-2'>
            <div className='h-6 bg-gray-700/50 rounded w-3/4 relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer'></div>
            </div>
            <div className='h-4 bg-gray-700/30 rounded w-1/2 relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer'></div>
            </div>
            <div className='flex space-x-2'>
              <div className='h-6 w-16 bg-gray-700/30 rounded-full relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer'></div>
              </div>
              <div className='h-6 w-20 bg-gray-700/30 rounded-full relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='w-10 h-10 bg-gray-700/30 rounded-lg relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer'></div>
          </div>
          <div className='flex space-x-1'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='w-6 h-6 bg-gray-700/30 rounded relative overflow-hidden'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-shimmer'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecommendationCard = () => (
    <div className='bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-600/30 p-6 animate-pulse'>
      <div className='flex items-start space-x-4'>
        <div className='w-16 h-24 bg-gray-700/50 rounded-lg flex-shrink-0'></div>
        <div className='flex-1 space-y-3'>
          <div className='h-6 bg-gray-700/50 rounded w-3/4'></div>
          <div className='h-4 bg-gray-700/30 rounded w-1/2'></div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-700/20 rounded w-full'></div>
            <div className='h-4 bg-gray-700/20 rounded w-5/6'></div>
          </div>
          <div className='flex justify-between items-center pt-2'>
            <div className='h-8 w-24 bg-gray-700/30 rounded-lg'></div>
            <div className='h-8 w-8 bg-gray-700/30 rounded-lg'></div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSearchResult = () => (
    <div className='bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-600/30 p-4 animate-pulse'>
      <div className='flex items-center space-x-4'>
        <div className='w-16 h-24 bg-gray-700/50 rounded-lg flex-shrink-0'></div>
        <div className='flex-1 space-y-2'>
          <div className='h-5 bg-gray-700/50 rounded w-3/4'></div>
          <div className='h-4 bg-gray-700/30 rounded w-1/2'></div>
          <div className='flex space-x-2'>
            <div className='h-5 w-14 bg-gray-700/30 rounded-full'></div>
            <div className='h-5 w-16 bg-gray-700/30 rounded-full'></div>
          </div>
        </div>
        <div className='flex space-x-1'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='w-6 h-6 bg-gray-700/30 rounded'></div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderText = () => (
    <div className='animate-pulse space-y-2'>
      <div className='h-4 bg-gray-700/50 rounded w-3/4'></div>
      <div className='h-4 bg-gray-700/30 rounded w-1/2'></div>
    </div>
  )

  const renderVariant = () => {
    switch (variant) {
      case 'movie-card':
        return renderMovieCard()
      case 'recommendation-card':
        return renderRecommendationCard()
      case 'search-result':
        return renderSearchResult()
      case 'text':
        return renderText()
      default:
        return renderMovieCard()
    }
  }

  return (
    <div className={className}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={count > 1 ? 'mb-4' : ''}>
          {renderVariant()}
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
