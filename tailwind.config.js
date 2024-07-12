module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e3a8a',
        accent: '#22c55e',
        highlight: '#60a5fa',
        neutral: {
          light: '#f5f5f5',
          dark: '#1a202c', // Changed to a darker gray for better contrast
          customBg: '#2F426B',
        },
        alert: '#ef4444',
      },
      fontFamily: {
        sans: ['Roboto', 'Montserrat', 'Lato', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}