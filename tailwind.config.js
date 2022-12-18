/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#0093B8",
        "primary-hover": "#007a99",
        "underwater-top": "#4CA1AF",
        "underwater-bottom": "#2C3E50",
      },
      height: (theme) => ({
        "1p": "10%",
        "9p": "90%",
      }),
      borderWidth: {
        6: "6px",
      },
    },
  },
  plugins: [],
};
