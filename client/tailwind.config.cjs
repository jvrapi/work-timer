/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 0 18px 0px rgba(0, 0, 0, 0.75)",
      },
    },
    colors: {
      textColor: "#eee",
      primary: "#14d3c3",
      primaryText: "#2e2b2b",
      secondary: "#242424",
      secondaryHover: "#2d2d2d",
    },
  },
  plugins: [],
};
