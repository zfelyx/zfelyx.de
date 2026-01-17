/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#883AEA',
        'accent-light': '#E0CCFA',
        'accent-dark': '#310A65',
        'background': '#111827',
      },
    },
  },
  plugins: [],
}