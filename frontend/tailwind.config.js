/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#002244",
        secondary: "#E0FBFC",
        accent: "#98C1D9",
        cta: "#EE6C4D",
      },
    },
  },
  plugins: [],
};
