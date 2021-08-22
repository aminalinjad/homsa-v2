<template>
  <v-app-bar height="90"  :clipped-right="isRtl" :clipped-left="!isRtl"><div class="hh">dfgdf</div></v-app-bar>
</template>

<script>
import SearchIcon from "~/assets/images/icons/ic-search-small-bg.svg?inline";
export default {
  components: { SearchIcon },
  props: {
    isRtl: {
      type: Boolean,
      default: true
    }


  },
  data() {
    return {
      fixedHeader: false,
      searchSection: false,
      searchResult: false,
      overlay: false,
      hostBtn: "میزبان شوید",
      login: "ورود",
      register: "ثبت‌نام",
      // phone: "۰۲۱-۲۸۱۱۱۵۰۰",
      userMenu: {
        menuTitle: "مشاهده حساب کاربری",
        menuBody: [
          { name: "اقامتگاه‌های من", link: "#1" },
          { name: "رزروهای من", link: "#2" },
          { name: "لیست اعلان‌ها", link: "#3" },
          { name: "لیست علاقه مندی‌ها", link: "#4" },
        ],
        menuFooter: [
          { name: "پشتیبانی", link: "#5" },
          { name: "خروج", link: "#6" },
        ],
      },
      searchForm: {
        destination: "کجا می‌خواهید بروید؟",
        checkIn: "انتخاب کنید",
        checkOut: "انتخاب کنید",
        count: "۱ نفر",
        count: "1",
      },
      searchFormValue: {
        destination: "یزد",
        destination: "کهگیلویه و بویراحمد",
        checkIn: "۱۲/۰۸",
        checkOut: "۱۲/۳۱",
        flexiblity: "۱",
        count: "۱",
      },
      suggestion: true,
      destinationSuggestions: {
        title: "پیشنهاد هومسا",
        items: [
          {
            city: "کرج",
            state: "استان البرز",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          },
          {
            city: "کردان",
            state: "ساوجبلاغ، استان البرز",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          },
          {
            city: "تهران",
            state: "تهران",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          },
          {
            city: "کیش",
            state: "هرمزگان",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          },
        ],
      },
      destinationSearchResult: [
        {
          city: "یزد",
          state: "استان یزد",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        },
        {
          city: "ایزدشهر",
          state: "نور، استان مازندران",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        },
        {
          city: "مهریز",
          state: "یزد، استان یزد",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        },
        {
          city: "استان یزد",
          state: "",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        },
      ],
    };
  },
  computed: {
    ifFixedHeader() {
      if (this.fixedHeader == false) {
        return false;
      } else {
        return true;
      }
    },
    ifSearchSection() {
      if (this.searchSection == false) {
        return false;
      } else {
        return true;
      }
    },
    ifSuggestion() {
      if (this.suggestion == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollPage, {passive: true});
  },
  destroyed() {
    // window.removeEventListener("scroll", this.removeFixedHeader);
  },
  methods: {
    showSearchSection() {
      // this.fixHeader(true);
      // this.scrollPage();
      this.searchSection = true;
      this.overlay = !this.overlay;
    },
    closeSearchSection() {
      this.searchSection = false;
      this.searchResult = !this.searchResult;
      this.overlay = !this.overlay;
      // this.fixHeader(true);
    },
    Search() {
      this.closeSearchSection();
    },
    scrollPage() {
      if (window.scrollY > 0) {
        this.fixHeader(true);
        // document.getElementById("headerSearch").classList.add("fixedHeader");
        // this.fixedHeader = true;
        // this.closeSearchSection();
      } else {
        this.fixHeader(false);
        // document.getElementById("headerSearch").classList.remove("fixedHeader");
        // this.fixedHeader = false;
      }
    },
    fixHeader(value) {
      if (value) {
        document.getElementById("headerSearch").classList.add("fixedHeader");
        this.fixedHeader = true;
      } else {
        document.getElementById("headerSearch").classList.remove("fixedHeader");
        this.fixedHeader = false;
      }
    },
    destinationSuggestion() {
      // console.log("deatination Suggestion called");
      this.suggestion = true;
    },
    destinationSearch() {
      console.log("deatination search called", this.searchForm.destination);
      if (
        this.searchForm.destination != "کجا می‌خواهید بروید؟" ||
        this.searchForm.destination != ""
      ) {
        this.suggestion = false;
      } else {
        this.suggestion = true;
      }
    },
    clearDestination() {
      console.log("clearDestination");
      this.searchForm.destination = "کجا می‌خواهید بروید؟";
      this.suggestion = true;
    },

    addCount() {
      this.searchForm.count++;
    },
    minusCount() {
      if (this.searchForm.count > 1) {
        this.searchForm.count--;
      } else {
      }
    },
    // removeFixedHeader() {
    //   let headerTop = document.getElementById('headerSearch').classList.remove("fixedHeader");
    //   console.log('headerTop', headerTop);

    // }
  },
};
</script>

<style lang="scss">
.headerCls {
  // position: relative;
  transition: all 0.2s;
  z-index: 10;
  &__top {
    height: 80px !important;
    // height: 74px !important;
    .selectInput {
      // width: 312px;
      min-width: 312px;
      max-width: max-content;
      height: 48px;
    }
  }
  &__bottom {
    // position: absolute;
    width: 100%;
    // z-index: 6;
    height: 114px !important;
    

    &__content {
      max-width: min-content;
      max-height: 66px;

      .srchDestination.v-autocomplete {
        .v-select {
          &__slot {
            input {
              top: -12px !important;
            }
          }
        }
      }
      .srchDestination {
        width: 270px;
      }
      .srchCheckIn,
      .srchCheckOut,
      .srchCount {
        width: 165px;
        height: 66px;
      }

      .v-text-field {
        .v-input {
          &__control {
            .v-input {
              &__slot:before {
                border-style: none;
              }

              &__slot:after {
                border-style: none;
              }
            }
          }
        }

        .v-label {
          color: var(--v-greenDark8-base) !important;
          font-size: 12px;
          font-weight: 600;
        }
      }

      .v-input {
        input,
        textarea {
          color: var(--v-greyLight2-base) !important;
        }
      }
    }
  }
}

.fixedHeader {
  position: fixed;
  // width: 100%;
  top: 0;
  left: 0;
  right: 0;
}

// costomize menu content
.v-menu {
  &__content {
    // left: 80px !important;
    position: fixed !important;
    box-shadow: 0px 4px 20px #00000014 !important;
  }
}
// costomize user menu content
.headerUserMenu.v-menu {
  &__content {
    left: 80px !important;
  }
}

// costomize autocomplete menu content
.v-autocomplete__content.v-menu__content {
  top: 198px !important;
  // left: 974px !important;
  width: 410px !important;
  @media (min-width: 1880px) {
    left: 974px !important;
  }
  @media (min-width: 1440px) and (max-width: 1880px) {
    left: 735px !important;
  }
}
// .srchDestinationDropdown {
//           width: 410px!important;
//         }

.hh {
  height: 200px;
  position: absolute;
  z-index: 9;
  background-color: red;
}
</style>
