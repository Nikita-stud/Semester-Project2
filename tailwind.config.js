/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        garamond: ["EB Garamond"],
        // helvetica: ["EB Garamond"],
      },
      fontSize: {
        mobileMainHeader: "36px",
        mobileSecondaryHeader: "28px",
        mobileButton: "21px",
        mobileText: "16px",
      },
      colors: {
        white: "#F3FFFB",
        formWhite: "#FFFFFF",
        dark: "#101802",
        grey: "#757575",
        yellow: "#FFCA13",
        darkerYellow: "#92613A",
      },
    },
  },
  plugins: [],
};
