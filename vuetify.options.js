import colors from "vuetify/es5/util/colors";
import fa from "vuetify/es5/locale/fa";
import customIcon from "@/utiles/customIcon.js"

export default {
  // breakpoint: {
  //   thresholds: {
  //     xs: 600,
  //     sm: 960,
  //     md: 1440,
  //     lg: 1880,
  //   },
  //   scrollBarWidth: 16,

  // },
  icons: {
    values: customIcon
  },
  lang: {
    locales: { fa },
    current: "fa"
  },
  rtl: true,
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        background: "#F5F5F5",
        whiteColor: "#FFFFFF",
        blackColor: "#000000",
        primary: "#359138",
        secondary: "#757575",
        accent: colors.shades.black,
        error: colors.red.accent3,
        greyLight1: "#FAFAFA",
        greyLight4: "#F5F5F5",
        greyLight2: "#ABABAB",
        greyDark8: "#323232",
        greenDark8: "#012200",
        green2: "#57C25B",
        orangeBooking: "#FF9D00",
        orangeBookingBg: "#FFF6E8",
        redOffer: "#EC4040",
        redOfferTime: "#EC484A",
        navyDark: "#000022"
      },
      dark: {
        // background: '#F5F5F5',
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
};