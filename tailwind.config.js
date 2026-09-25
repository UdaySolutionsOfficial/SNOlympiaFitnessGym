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
          volt: '#CCFF00',
          'volt-hover': '#D6FF33',
          'volt-active': '#B5E600',
          'volt-soft': 'rgba(204, 255, 0, 0.12)',
          'text-primary': '#F4F6F8',
          'text-secondary': '#B4BCC6',
          'text-muted': '#6E7885',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-subtle': 'rgba(255, 255, 255, 0.05)',
          'border-volt': 'rgba(204, 255, 0, 0.35)',
        }
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-volt': '0 0 25px rgba(204, 255, 0, 0.25)',
        'glow-volt-lg': '0 0 40px rgba(204, 255, 0, 0.35)',
        'card-depth': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
