/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#111111',
          light: '#1a1a1a',
          dark: '#0a0a0a',
        },
        crimson: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
          light: '#ef4444',
        },
        teal: {
          DEFAULT: '#14b8a6',
          dark: '#0d9488',
          light: '#2dd4bf',
        },
        cream: {
          DEFAULT: '#f9fafb',
          warm: '#fef7ed',
        },
        'muted-gray': {
          DEFAULT: '#9ca3af',
          light: '#d1d5db',
          dark: '#6b7280',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'float-delay': 'float-delay 3s ease-in-out infinite 1.5s',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-delay': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(-12px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        3: '3px',
      },
      dropShadow: {
        glow: '0 0 20px rgba(20, 184, 166, 0.4)',
        crimson: '0 0 20px rgba(220, 38, 38, 0.4)',
      },
    },
  },
  plugins: [],
}
