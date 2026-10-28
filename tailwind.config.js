/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A0E17',
          surface: '#121A29',
          card: '#182235',
          border: '#22324D',
          hover: '#1F2C45',
          cyan: '#00E5FF',
          teal: '#00B4D8',
          violet: '#7C3AED',
          accent: '#38BDF8',
        },
        risk: {
          safe: '#10B981',       // Emerald (0-19)
          low: '#3B82F6',        // Blue (20-39)
          moderate: '#F59E0B',   // Amber (40-69)
          critical: '#EF4444',   // Crimson (70-100)
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(0, 229, 255, 0.25)',
        'glow-critical': '0 0 25px -5px rgba(239, 68, 68, 0.3)',
        'glow-safe': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
