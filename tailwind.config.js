module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        myRed: '#ff2e63',
        myBlack: '#252a34',
        myGrey: '#eaeaea',
        myBlue: '#08d9d6'
      },
      fontFamily: {
        body: ['Poppins']
      },
      width: {
        l1: '300px',
        l2: '400px',
        l3: '500px',
        l4: '600px'
      },
      height: {
        l1: '300px',
        l2: '400px',
        l3: '500px',
        l3dot5: '550px',
        l4: '600px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
