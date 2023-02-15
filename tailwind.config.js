/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "440px",
      md: "768px",
     
    },
    colors: {
      "weather-primary" : "#00668A",
      "weather-secondary": "#004E71"
    },
    fontFamily: {
      Roboto:["Roboto", "sans-serif"]
    },
    container:{
      padding:"2rem",
      center:true
    },
    extend: {},
  },
  plugins: [],
};
