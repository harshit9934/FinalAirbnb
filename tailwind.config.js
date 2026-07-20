/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./views/**/*.html", "./views/**/*.css"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "text-5xl",
    "text-gray-800",
    "text-gray-600",
    "text-red-500",
    "font-bold",
    "text-center",
    "mb-10",
    "text-lg",
  ],
};
