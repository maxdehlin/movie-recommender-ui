function StatsCard({ icon, value, label, color = 'teal' }) {
  const colorClasses = {
    teal: {
      gradient: 'from-teal/20 to-teal-dark/20',
      border: 'border-teal/30 group-hover:border-teal/50',
      text: 'text-teal',
      shadow: 'hover:shadow-teal/10',
      sprocket1: 'bg-teal/30',
      sprocket2: 'bg-crimson/30',
    },
    crimson: {
      gradient: 'from-crimson/20 to-crimson-dark/20',
      border: 'border-crimson/30 group-hover:border-crimson/50',
      text: 'text-crimson',
      shadow: 'hover:shadow-crimson/10',
      sprocket1: 'bg-crimson/30',
      sprocket2: 'bg-teal/30',
    },
  }

  const currentColor = colorClasses[color]

  return (
    <div
      className={`group bg-charcoal-light/60 backdrop-blur-xl rounded-3xl border border-gray-600/30 hover:border-${color}/40 p-10 text-center space-y-6 hover:scale-105 transition-all duration-500 shadow-2xl ${currentColor.shadow}`}
    >
      <div className='relative'>
        <div
          className={`w-20 h-20 bg-gradient-to-br ${currentColor.gradient} rounded-full flex items-center justify-center mx-auto border-2 ${currentColor.border} transition-all duration-300`}
        >
          <span className='text-4xl group-hover:animate-pulse'>{icon}</span>
        </div>
        {/* Film sprocket holes */}
        <div
          className={`absolute -top-2 -right-2 w-3 h-3 ${currentColor.sprocket1} rounded-full animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-2 -left-2 w-2 h-2 ${currentColor.sprocket2} rounded-full animate-pulse`}
        ></div>
      </div>
      <div>
        <div
          className={`text-4xl font-serif ${currentColor.text} mb-2 tracking-wide`}
        >
          {value}
        </div>
        <div className='text-muted-gray font-medium text-lg tracking-wider uppercase'>
          {label}
        </div>
      </div>
    </div>
  )
}

export default StatsCard
