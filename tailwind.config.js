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

    "bg-green-300",
    "hover:bg-green-500",
    "hover:bg-red-500",
    "transition-all",
    "duration-300",
    "rounded",
    "px-4",
    "py-2",
    "text-white",
  ],
};
