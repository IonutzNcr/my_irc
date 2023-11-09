/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'patua': ['Patua One', 'sans-serif'],
        'pompiere' : ['Pompiere', 'sans-serif'],
      },
      cursor :{
        mine :  'url(./src/assets/trinity.cur), auto'
      }
    },
  },
  plugins: [require("daisyui")],
}

