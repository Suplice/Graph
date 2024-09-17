/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xlg: "1124px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".border-diminished-t": {
          "border-top": "1px solid transparent",
          "border-image":
            "linear-gradient(to right, transparent, #114156, transparent)",
          "border-image-slice": "1",
        },
      };
      addUtilities(newUtilities);
    },

    function ({ addUtilities }) {
      const newUtilities = {
        ".border-diminished-b": {
          "border-bottom": "1px solid transparent",
          "border-image":
            "linear-gradient(to right, transparent, #114156, transparent)",
          "border-image-slice": "1",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
