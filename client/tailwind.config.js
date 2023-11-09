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
        mine :  'url(http://www.rw-designer.com/cursor-extern.php?id=82671)'
      }
    },
  },
  plugins: [require("daisyui")],
}

