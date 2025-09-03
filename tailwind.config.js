/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        riseGlow: {
          "0%":   {  opacity: "0.25" }, 
          "35%":  {  opacity: "0.55" },
          "55%":  { opacity: "0.85" },
          "100%": {   opacity: "0.25" },
        },
      },
      animation: {
        riseGlow: "riseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
