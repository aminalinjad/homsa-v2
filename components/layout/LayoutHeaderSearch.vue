<template>
  <div
    id="headerSearch"
    class="headerCls"
    :class="ifSearchSection || !ifFixedHeader ? 'ma-4 mb-0' : ''"
  >
    <!-- header top section -->
    <div
      class="rounded-t-lg whiteColor headerCls__top"
      :class="ifSearchSection || ifFixedHeader ? '' : 'rounded-b-lg'"
    >
    <v-container class="pa-4" :fluid="($vuetify.breakpoint.md||mapLayout)?true:false" >
      <v-row>
        <!-- header logo -->
        <v-col>
          <div>
            <img
              src="@/assets/images/logo-homsa.svg"
              class="mt-2 cursorPointer"
            />
          </div>
        </v-col>

        <!-- header input -->
        <v-col>
          <div
            class="
              mx-auto
              pt-2
              px-3
              text-center
              greyLight4
              rounded-lg
              cursorPointer
              selectInput
            "
            @click="showSearchSection"
            v-if="!ifSearchSection"
          >
            <div
              class="d-flex justify-space-between align-center"
              v-if="!searchResult"
            >
              <div
                class="
                  ps-1
                  d-flex
                  justify-start
                  secondary--text
                  font-regular-14
                "
              >
                <span>شهر را انتخاب کنید</span>
              </div>
              <img
                src="@/assets/images/icons/ic-search-small-bg.svg"
                width="32"
              />
            </div>
            <div
              class="
                d-flex
                justify-space-between
                align-center
                font-regular-14
                greenDark8--text
              "
              v-else
            >
              <div class="pe-3">{{ searchFormValue.destination }}</div>
              <v-divider vertical></v-divider>
              <div class="px-3">
                <span>{{ searchFormValue.checkIn }}</span>
                <span class="px-1">-></span>

                <span>{{ searchFormValue.checkOut }}</span>
                <span class="ps-1 font-regular-12 greyLight2--text"
                  >( + {{ searchFormValue.flexiblity }} روز)
                </span>
              </div>
              <v-divider vertical></v-divider>

              <div class="px-3">
                <span v-if="searchFormValue.count">
                  {{ searchFormValue.count }}
                  نفر
                </span>
                <span class="font-regular-14 secondary--text" v-else
                  >انتخاب نفرات</span
                >
              </div>
              <img
                src="@/assets/images/icons/ic-search-small-bg.svg"
                width="32"
              />
            </div>
          </div>
        </v-col>

        <!-- header user option -->
        <v-col>
          <div class="mt-1 d-flex align-center justify-end">
            <div>
              <v-btn rounded text color="primary" height="30" class="px-2 py-1">
                <span class="font-medium-14">
                  {{ hostBtn }}
                </span>
              </v-btn>
            </div>
            <v-divider vertical class="mx-3 greyLight4"></v-divider>
            <div>
              <v-menu
                fixed
                bottom
                offset-y
                min-width="184"
                content-class="headerUserMenu"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    rounded
                    text
                    color="greenDark8"
                    height="30"
                    class="ps-1 pe-2 py-1"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <img src="@/assets/images/icons/ic-profile.svg" />
                    <div class="ms-2">
                      <span class="font-medium-14">
                        {{ login }}
                      </span>
                      <span class="font-medium-14">/</span>
                      <span class="font-medium-14">
                        {{ register }}
                      </span>
                    </div>
                  </v-btn>
                </template>
                <v-list class="cursorPointer">
                  <v-list-item link to="#">
                    <v-list-item-subtitle class="greenDark8--text">{{
                      userMenu.menuTitle
                    }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-divider class="greyLight4"></v-divider>
                  <v-list-item
                    v-for="(item, index) in userMenu.menuBody"
                    :key="index"
                    link
                    :to="item.link"
                  >
                    <v-list-item-subtitle class="secondary--text">{{
                      item.name
                    }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-divider class="greyLight4"></v-divider>
                  <v-list-item
                    v-for="(item, index) in userMenu.menuFooter"
                    :key="index"
                    link
                    :to="item.link"
                  >
                    <v-list-item-subtitle class="secondary--text">{{
                      item.name
                    }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <v-divider vertical class="mx-3 greyLight4"></v-divider>

            <div class="d-flex align-center">
              <v-btn icon width="30" height="30" class="pa-1">
                <img src="@/assets/images/icons/ic-language.svg" />
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    </div>

    <!-- header bottom / search section -->
    <div
      v-if="ifSearchSection"
      class="
        greyLight4
        rounded-b-lg
        headerCls__bottom
        d-flex
        justify-center
        align-center
      "
    >
      <div class="d-flex headerCls__bottom__content">
        <!-- destination  -->
        <v-autocomplete
          filled
          clearable
          height="66"
          background-color="whiteColor"
          label="مقصد، اقامتگاه"
          :items="
            ifSuggestion
              ? destinationSuggestions.items
              : destinationSearchResult
          "
          item-text="city"
          item-value="city"
          :default="searchForm.destination"
          v-model="searchForm.destination"
          append-icon=""
          no-data-text="No data available"
          class="me-2 rounded srchDestination font-regular-14"
          @click="destinationSuggestion"
          @click:clear="clearDestination"
          @update:search-input="destinationSearch"
        >
          <!-- title in suggestion mode -->
          <template v-slot:prepend-item>
            <v-list-item-title
              v-if="ifSuggestion"
              class="ms-6 mt-4 font-medium-14 greenDark8--text"
              >{{ destinationSuggestions.title }}</v-list-item-title
            >
            <!--destination result -->
          </template>
          <template v-slot:item="data">
            <v-list-item-avatar rounded width="48" height="48" class="ms-2">
              <img :src="data.item.img" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-html="data.item.city"
                class="font-regular-14 greenDark8--text"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="data.item.state"
                class="font-regular-12 greyLight2--text"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-autocomplete>

        <!-- date range  -->
        <v-text-field
          filled
          readonly
          height="66"
          background-color="whiteColor"
          label="تاریخ ورود"
          v-model="searchForm.checkIn"
          class="me-2 rounded srchCheckIn font-regular-14"
        >
        </v-text-field>
        <v-text-field
          filled
          readonly
          height="66"
          background-color="whiteColor"
          label="تاریخ خروج"
          v-model="searchForm.checkOut"
          class="me-2 rounded srchCheckOut font-regular-14"
        >
        </v-text-field>

        <!-- count -->
        <v-row class="ma-0 me-2 srchCount whiteColor rounded">
          <v-col cols="9" class="pa-0">
            <v-text-field
              filled
              readonly
              height="66"
              background-color="whiteColor"
              label="تعداد نفرات"
              v-model="searchForm.count"
              class="rounded font-regular-14"
            >
            </v-text-field>
          </v-col>
          <v-col
            cols="3"
            class="pa-0 pe-3"
            :class="this.$vuetify.rtl ? 'text-left' : 'text-right'"
          >
            <div>
              <img
                class="mt-2 cursorPointer"
                src="@/assets/images/icons/ic-add.svg"
                @click="addCount"
              />
            </div>
            <div class="mt-n2 cursorPointer">
              <img
                src="@/assets/images/icons/ic-minus.svg"
                @click="minusCount"
              />
            </div>
          </v-col>
        </v-row>
        <v-btn
          fab
          color="primary"
          elevation="0"
          width="66"
          height="66"
          @click="Search"
        >
          <img src="@/assets/images/icons/ic-search.svg" />
        </v-btn>
      </div>

      <v-overlay :value="overlay" z-index="-1"></v-overlay>
    </div>
  </div>
</template>

<script>
import SearchIcon from "~/assets/images/icons/ic-search-small-bg.svg?inline";
import {mapGetters} from "vuex";
export default {
  components: { SearchIcon },
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
    ...mapGetters({
      mapLayout: "modules/structure/GET_MAP_LAYOUT"
    }),
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
    mdAndDown() {
      console.log('header md and down', this.$vuetify.breakpoint.mdAndDown);
      return this.$vuetify.breakpoint.mdAndDown
    }
  },
  mounted() {
    console.log(this.$vuetify)
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
  position: relative;
  transition: all 0.2s;
  z-index: 1500;
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
    position: absolute;
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
// .v-autocomplete__content.v-menu__content {
//   top: 198px !important;
//   // left: 974px !important;
//   width: 410px !important;
//   @media (min-width: 1880px) {
//     left: 974px !important;
//   }
//   @media (min-width: 1440px) and (max-width: 1880px) {
//     left: 735px !important;
//   }
// }
// .srchDestinationDropdown {
//           width: 410px!important;
//         }
</style>
