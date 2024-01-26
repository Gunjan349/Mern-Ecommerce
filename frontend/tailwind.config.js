/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens : {
      "xs" : {'max' : '480px'},
      sm :  {'max' : '768px'},
      md : {'max' : '976px'},
      lg :  {'max' : '1440px'},
      xl :  {'max' : '1536px'},
      "2xl" : "1537px"
    },
    extend: {
      colors : {
        purple : "#b37fec",
        lightpurple : '#c5a1ec',
        pink : "#e36422",
        lightgrey : "#f5f5f7"
      },
      
    },
  },
  plugins: [],
}

