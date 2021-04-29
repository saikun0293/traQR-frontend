module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        myRed: "#ff2e63",
        myBlack: "#252a34",
        myGrey: "#eaeaea",
        myBlue: "#08d9d6",
      },
      fontFamily: {
        body: ["Poppins"],
      },
      width: {
        loginContent: "450px",
        loginIllustration: "600px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
