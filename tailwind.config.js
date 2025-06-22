/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand colors
        charcoal: {
          DEFAULT: '#111111',
          light: '#1a1a1a',
          dark: '#0a0a0a',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#1a1f2e',
          900: '#111827',
          950: '#0a0a0a',
        },
        crimson: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
          light: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        teal: {
          DEFAULT: '#14b8a6',
          dark: '#0d9488',
          light: '#2dd4bf',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        cream: {
          DEFAULT: '#f9fafb',
          warm: '#fef7ed',
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#fafafa',
          300: '#f5f5f5',
          400: '#e5e5e5',
          500: '#d4d4d4',
          600: '#a3a3a3',
          700: '#737373',
          800: '#525252',
          900: '#404040',
        },
        'muted-gray': {
          DEFAULT: '#9ca3af',
          light: '#d1d5db',
          dark: '#6b7280',
        },

        // Semantic colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // Genre-based colors
        genre: {
          action: '#ef4444', // Red
          adventure: '#f59e0b', // Amber
          comedy: '#eab308', // Yellow
          drama: '#8b5cf6', // Violet
          horror: '#dc2626', // Dark red
          romance: '#ec4899', // Pink
          thriller: '#1f2937', // Dark gray
          scifi: '#06b6d4', // Cyan
          fantasy: '#a855f7', // Purple
          mystery: '#4b5563', // Gray
          documentary: '#059669', // Emerald
          animation: '#f97316', // Orange
        },

        // Surface variants
        surface: {
          'glass-light': 'rgba(26, 26, 26, 0.4)',
          'glass-medium': 'rgba(26, 26, 26, 0.6)',
          'glass-heavy': 'rgba(26, 26, 26, 0.8)',
          frosted: 'rgba(255, 255, 255, 0.05)',
          elevated: 'rgba(26, 26, 26, 0.9)',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'float-delay': 'float-delay 3s ease-in-out infinite 1.5s',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-scale': 'fade-in-scale 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
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
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        'fade-in-scale': {
          from: {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'slide-in-right': {
          from: {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'bounce-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.1)',
          },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      borderWidth: {
        3: '3px',
      },
      dropShadow: {
        glow: '0 0 20px rgba(20, 184, 166, 0.4)',
        crimson: '0 0 20px rgba(220, 38, 38, 0.4)',
        'glow-lg': '0 0 40px rgba(20, 184, 166, 0.3)',
        'crimson-lg': '0 0 40px rgba(220, 38, 38, 0.3)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'crimson-glow':
          '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)',
        'teal-glow':
          '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        grain:
          "url('data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}
