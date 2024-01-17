/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", 
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"  //primevue
],
  theme: {
    extend: {},
  },
  plugins: [],
}

