/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      screens: {
        xs: "280px",
        mob: "470px",
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
        green: "#50733D",
      },
      backgroundImage: {
        mobileCircles: "url('../images/mobile-sides.png')",
        desktopCircles: "url('../images/desktop-sides.png')",
        mobileSheep: "url('../images/sheep-mobile.jpg')",
      },
    },
  },
  plugins: [],
};
