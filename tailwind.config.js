/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#215FAB",
      secondary: "#BFD7EA",
      accent: "#023047",
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
    },
  },
  plugins: [],
};
