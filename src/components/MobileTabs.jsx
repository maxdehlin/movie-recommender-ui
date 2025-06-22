import cx from 'clsx'

function MobileTabs({ tabs = [], activeTab, onTabChange, className = '' }) {
  return (
    <div
      className={cx(
        'lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-800/95 backdrop-blur-xl border-t border-gray-600/30',
        className
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className='flex items-center justify-around px-2 pt-2 pb-1'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id)
              // Haptic feedback
              if ('vibrate' in navigator) {
                navigator.vibrate(30)
              }
            }}
            className={cx(
              'flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 max-w-[100px] active:scale-95',
              activeTab === tab.id
                ? 'bg-gradient-to-t from-teal-500/20 to-red-600/20 text-gray-50 border border-teal-500/30'
                : 'text-gray-400 hover:text-gray-50 hover:bg-gray-700/50'
            )}
            aria-label={`Switch to ${tab.name}`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className='text-lg mb-1' aria-hidden='true'>
              {tab.icon}
            </span>
            <span className='text-xs font-medium truncate w-full text-center leading-tight'>
              {tab.name}
            </span>
            {tab.count > 0 && (
              <span className='text-[10px] bg-teal-500/30 text-teal-400 px-1.5 py-0.5 rounded-full min-w-[18px] text-center mt-0.5'>
                {tab.count > 99 ? '99+' : tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileTabs
