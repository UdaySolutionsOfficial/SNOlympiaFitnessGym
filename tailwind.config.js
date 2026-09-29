/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#08090A',
          graphite: '#0E1114',
          surface: '#15191E',
          'surface-hover': '#1C2229',
          volt: '#FF5E1E',
          'volt-hover': '#FF7538',
          'volt-active': '#E0480C',
          'volt-soft': 'rgba(255, 94, 30, 0.15)',
          orange: '#FF5E1E',
          'orange-hover': '#FF7538',
          'orange-active': '#E0480C',
          'orange-soft': 'rgba(255, 94, 30, 0.15)',
          'text-primary': '#F4F6F8',
          'text-secondary': '#B4BCC6',
          'text-muted': '#6E7885',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-subtle': 'rgba(255, 255, 255, 0.05)',
          'border-volt': 'rgba(255, 94, 30, 0.45)',
          'border-orange': 'rgba(255, 94, 30, 0.45)',
        }
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-volt': '0 0 25px rgba(255, 94, 30, 0.35)',
        'glow-volt-lg': '0 0 45px rgba(255, 94, 30, 0.5)',
        'glow-orange': '0 0 25px rgba(255, 94, 30, 0.35)',
        'glow-orange-lg': '0 0 45px rgba(255, 94, 30, 0.5)',
        'card-depth': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'liquid-wave': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee: 'marquee 28s linear infinite',
        'liquid-wave': 'liquid-wave 2.2s linear infinite',
      }
    },
  },
  plugins: [],
}
