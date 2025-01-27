/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        accent: 'var(--accent-color)',
        text: 'var(--text-color)',
        'button-text': 'var(--button-text-color)',
        'button-bg': 'var(--button-bg-color)',
        'button-hover-text': 'var(--button-hover-text-color)',
        'button-hover-bg': 'var(--button-hover-bg-color)',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'], // Example font setup
        serif: ['Merriweather', 'serif'],
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}