/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {screens: {
    'sm': '350px',
    'md': '576px',
    'lg': '768px',
    'xl': '992px',
    '2xl': '1199px',
    '3xl': '1500px',
  },
    extend: {
      width: {
        '97': '700px',
      },
    },
  },
  plugins: [],
}

