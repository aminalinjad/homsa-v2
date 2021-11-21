import { mapActions, mapGetters } from "vuex";
import { SearchServices } from "@/services";
import * as types from "@/store/types.js";
import MinusIcon from "@/assets/AppIcons/minus.vue";
import AddIcon from "@/assets/AppIcons/add.vue";

export default {
  components: {
    MinusIcon,
    AddIcon
  },
  data() {
    return {
      calendar: false,
      clearCalendar: false,
      checkInDate: null,
      checkOutDate: null,
      fixedHeader: false,
      searchSection: false,
      overlay: false,
      minusCountDisable: true,
      userMenu: {
        menuTitle: "مشاهده حساب کاربری",
        menuBody: [
          { name: "اقامتگاه‌های من", link: "#1" },
          { name: "رزروهای من", link: "#2" },
          { name: "لیست اعلان‌ها", link: "#3" },
          { name: "لیست علاقه مندی‌ها", link: "#4" }
        ],
        menuFooter: [
          { name: "پشتیبانی", link: "#5" },
          { name: "خروج", link: "#6" }
        ]
      },
      userDestinationSearch: "",
      searchFormValue: {
        destination: this.$route.query.q ? this.$route.query.q : null,
        checkIn: null,
        checkOut: null,
        flexibility: 1,
        guest: this.$route.query.guest ? this.$route.query.guest: 1
      },
      suggestionsDefault: [],
      suggestion: true
    };
  },

  watch: {
    userDestinationSearch: {
      immediate: true,
      deep: true,
      handler(val) {
        this.destinationSearch(val);
      }
    }
  },

  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`,
    }),
    addIconClass() {
      return this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.primary : this.$vuetify.theme.themes.light.primary;
    },
    minusIconClass() {
      if(this.searchFormValue.guest > 1) {
        return this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.primary: this.$vuetify.theme.themes.light.primary
      }
      return null;
    }
  },

  mounted() {
    window.addEventListener("scroll", this.scrollPage, { passive: true });
    this.destinationSearch("");
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollPage);
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
    }),
    clickOnUserSuggestion() {
      if (this.$refs.cityAutocomplete) {
        this.$refs.cityAutocomplete.isMenuActive = false;
      }
    },
    showSearchSection() {
      this.searchSection = true;
      this.overlay = !this.overlay;
    },
    closeSearchSection() {
      this.searchSection = !this.searchSection;
      this.calendar = false;
      this.overlay = !this.overlay;
    },
    searchServices() {
      if (
        this.userDestinationSearch === "" ||
        this.userDestinationSearch === null
      ) {
        this.$toast.error("جستجو بدون پارامتر امکانپذیر نیست");
      } else {
        if (
          this.searchFormValue.destination &&
          this.searchFormValue.destination.type
        ) {
          //check send request or not
          if (
            `${this.searchFormValue.destination.type}-${this.searchFormValue.destination.slug}` ===
            this.$route.params.slug
          ) {
            setTimeout(() => {
              this.$nuxt.$loading.start()
            }, 1)

            let data = {...this.getRequestData}
            data.guest = this.searchFormValue.guest
            data.page = 1

            if (this.searchFormValue.checkIn) {
              data.checkin = this.searchFormValue.checkIn;
            }
            if (this.searchFormValue.checkOut) {
              data.checkout = this.searchFormValue.checkOut;
            }

            let splitSlug = this.$route.params.slug.split("-");

            data.slugs = [
              {
                value: splitSlug[1],
                type: splitSlug[0]
              }
            ];
            this.setRequestData(data)

            SearchServices.searchResults(data)
              .then(res => {
                this.calendar = false;
                this.closeSearchSection();
                this.setSearchResult(res.data)
                this.$nuxt.$loading.finish();
              })
              .catch(err => {

              });
          } else {
            this.calendar = false;
            this.closeSearchSection();
          }
          //end check request
          let queryData = {
            page: undefined,
            guest: this.searchFormValue.guest,
            checkInDate: this.searchFormValue.checkIn
              ? this.searchFormValue.checkIn
              : undefined,
            checkOutDate: this.searchFormValue.checkOut
              ? this.searchFormValue.checkOut
              : undefined,
            q: undefined
          };
          this.$router.push({
            path: `${this.searchFormValue.destination.type}-${this.searchFormValue.destination.slug}`,
            query: { ...this.$route.query, ...queryData }
          });
        } else {
          //check send request or not
          if (this.userDestinationSearch === this.$route.query.q) {
            setTimeout(() => {
              this.$nuxt.$loading.start()
            }, 1)
            let data = {...this.getRequestData}
            data.guest = this.searchFormValue.guest
            data.q = this.userDestinationSearch
            if (this.searchFormValue.checkIn) {
              data.checkin = this.searchFormValue.checkIn;
            }
            if (this.searchFormValue.checkOut) {
              data.checkout = this.searchFormValue.checkOut;
            }

            this.setRequestData(data)

            SearchServices.searchResults(data)
              .then(res => {
                this.calendar = false;
                this.closeSearchSection();
                this.setSearchResult(res.data);
                this.$nuxt.$loading.finish();
              })
              .catch(err => {
              });
          } else {
            this.calendar = false;
            this.closeSearchSection();
          }
          //end check request
          this.$router.push({
            path: "search",
            query: {
              ...this.$route.query,
              guest: this.searchFormValue.guest,
              q: this.userDestinationSearch,
              page: undefined
            }
          });
        }
      }
    },
    scrollPage() {
      if (this.$refs.cityAutocomplete) {
        this.$refs.cityAutocomplete.isMenuActive = false;
      }
      if (this.$refs.menuRef) {
        this.$refs.menuRef.isActive = false;
      }
      if (window.scrollY > 0) {
        this.fixedHeader = true;
      } else {
        this.fixedHeader = false;
      }
    },
    destinationSearch(userDestination) {
      let data = {
        term: userDestination
      };
      return SearchServices.destinationSuggestions(data)
        .then(res => {
          this.suggestionsDefault = res.data.data;
        })
        .catch(err => {
        });
    },
    clearDestination() {},
    addGuest() {
      this.searchFormValue.guest++;
    },
    minusGuest() {
      if (this.searchFormValue.guest > 1) {
        this.searchFormValue.guest--;
      }
    },
    changeLang() {
      if (this.$i18n.locale === "fa") {
        this.$i18n.setLocale("en");
        this.$vuetify.rtl = false;
      } else {
        this.$i18n.setLocale("fa");
        this.$vuetify.rtl = true;
      }
      // this.$vuetify.rtl = !this.$vuetify.rtl;
    },
    showCalendar() {
      this.calendar = true;
    },
    setCheckInDate(checkInDate) {
      if (checkInDate) {
        this.clearCalendar = false;
        this.searchFormValue.checkIn = checkInDate.date;
        this.$vuetify.rtl
          ? (this.checkInDate = checkInDate.jalali_date)
          : (this.checkInDate = checkInDate.date);
      } else {
        this.searchFormValue.checkIn = null;
        this.checkInDate = null;
      }
    },
    setCheckOutDate(checkOutDate) {
      if (checkOutDate) {
        this.searchFormValue.checkOut = checkOutDate.date;
        this.$vuetify.rtl
          ? (this.checkOutDate = checkOutDate.jalali_date)
          : (this.checkOutDate = checkOutDate.date);
      } else {
        this.searchFormValue.checkOut = null;
        this.checkOutDate = null;
      }
    },
    clearDateRange() {
      this.checkInDate = null;
      this.checkOutDate = null;
      this.searchFormValue.checkIn = null;
      this.searchFormValue.checkOut = null;
      this.calendar = false;
      this.clearCalendar = true;
    },
    closeCalendar() {
      if (this.calendar) {
        this.clearDateRange();
      }
    },
    submitCalendarDate(flexibility) {
      this.searchFormValue.flexibility = flexibility ? flexibility : 1;
      this.calendar = !this.calendar;
    }
  }
};
