function Profile() {
  return (
    <div className='min-h-screen pt-8 pb-16 px-8 w-screen'>
      <div className='max-w-4xl mx-auto space-y-12'>
        <section className='text-center space-y-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-white tracking-tight'>
            Your
            <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              {' '}
              Profile
            </span>
          </h1>
          <p className='text-xl text-white/70 font-light max-w-2xl mx-auto'>
            Manage your account settings and preferences
          </p>
        </section>

        <div className='backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-12'>
          <div className='text-center space-y-8'>
            <div className='w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto'>
              <span className='text-4xl'>👤</span>
            </div>
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold text-white'>
                Profile Settings
              </h2>
              <p className='text-white/60 text-lg'>
                Profile customization and user preferences will be available
                soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
