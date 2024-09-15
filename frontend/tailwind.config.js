/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".border-diminished": {
          "border-top": "1px solid transparent",
          "border-image":
            "linear-gradient(to right, transparent, #114156, transparent)",
          "border-image-slice": "1",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
