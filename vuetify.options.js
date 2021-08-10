import colors from 'vuetify/es5/util/colors'

export default {
  breakpoint: {},
  icons: {},
  lang: {},
  rtl: true,
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#359138',
        whiteColor: '#FFFFFF',
        secondary: '#757575',
        accent: colors.shades.black,
        error: colors.red.accent3,
        greyLight4: '#F5F5F5',
        greyLight2: '#ABABAB',
        greenDark8: '#012200',
        green2: '#57C25B',
        orangeBooking: '#FF9D00',
        orangeBookingBg: '#FFF6E8',
        borderGray: '#F5F5F5',
        redOffer: '#EC4040',
        redOfferTime: '#EC484A',
        navyDark: '#000022',
        


      },
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  }
}
