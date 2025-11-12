/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        testRed: "#ff0000",
      },
      keyframes: {
        zoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" }, // subtle zoom
        },
      },
      animation: {
        zoom: "zoom 8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
