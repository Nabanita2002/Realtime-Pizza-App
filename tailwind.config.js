/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/views/home.ejs"],
  theme: {
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms')], 
}

