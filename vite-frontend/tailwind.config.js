/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        anton: ['Anton', 'sans-serif'],
        inline_one: ['Alumni Sans Inline One', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

