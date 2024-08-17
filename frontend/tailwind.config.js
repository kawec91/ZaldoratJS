/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myLightBrown: "#B19772",
        myMediumBrown: "#88613B",
        myDarkBrown: "#462B1E",
        myGoldenYellow: "#EAAF44",
        myLightCream: "#F5EDD3",
        myReddishOrange: "#C9400E",
        myDeepRed: "#7F0A12",
      },
    },
  },
  plugins: [],
};
