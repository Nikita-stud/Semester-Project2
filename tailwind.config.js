/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      screens: {
        xs: "280px",
      },
      fontFamily: {
        garamond: ["EB Garamond"],
        // helvetica: ["EB Garamond"],
      },
      fontSize: {
        mobileMainHeader: "36px",
        mobileSecondaryHeader: "28px",
        mobileButton: "21px",
        mobileText: "16px",
        desktopMainHeader: "49px",
        desktopSecondaryHeader: "37px",
        desktopButton: "24px",
        desktopText: "21px",
      },
      colors: {
        white: "#F3FFFB",
        formWhite: "#FFFFFF",
        dark: "#101802",
        grey: "#757575",
        yellow: "#FFCA13",
        darkerYellow: "#92613A",
      },
      backgroundImage: {
        mobileCircles: "url('../images/mobile-sides.png')",
        desktopCircles: "url('../images/desktop-sides.png')",
      },
    },
  },
  plugins: [],
};
