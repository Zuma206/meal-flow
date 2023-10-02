/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadein: "fadein .2s linear forwards",
        floatup: "floatup .2s linear forwards",
      },
      keyframes: {
        fadein: {
          "0%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        floatup: {
          "0%": {
            transform: "translateY(2rem)",
          },
          "100%": {
            transform: "translateY(0rem)",
          },
        },
      },
    },
  },
  plugins: [],
};
