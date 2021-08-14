<template>
  <div
    id="headerSearch"
    class="headerCls"
    :class="ifSearchSection || !ifFixedHeader ? 'ma-4 mb-0' : ''"
  >
    <!-- header top section -->
    <div
      class="ps-11 pe-12 py-4 rounded-t-lg whiteColor headerCls__top"
      :class="ifSearchSection || ifFixedHeader ? '' : 'rounded-b-lg'"
    >
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
                class="headerUserMenu"
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
        <v-text-field
          filled
          height="66"
          background-color="whiteColor"
          label="مقصد، اقامتگاه"
          v-model="searchForm.destination"
          class="me-2 rounded srchDestination font-regular-14"
        >
        </v-text-field>
        <v-text-field
          filled
          height="66"
          background-color="whiteColor"
          label="تاریخ ورود"
          v-model="searchForm.checkIn"
          class="me-2 rounded srchCheckIn font-regular-14"
        >
        </v-text-field>
        <v-text-field
          filled
          height="66"
          background-color="whiteColor"
          label="تاریخ خروج"
          v-model="searchForm.checkOut"
          class="me-2 rounded srchCheckOut font-regular-14"
        >
        </v-text-field>
        <v-text-field
          filled
          height="66"
          background-color="whiteColor"
          type="number"
          label="تعداد نفرات"
          v-model="searchForm.count"
          class="me-2 rounded srchCount font-regular-14"
        >
        </v-text-field>
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
      <v-overlay :value="overlay" z-index="-1"> </v-overlay>
    </div>
  </div>
</template>

<script>
import SearchIcon from "~/assets/images/icons/ic-search-small-bg.svg?inline";
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
  },
  mounted() {
    window.addEventListener("scroll", this.scrollPage);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.removeFixedHeader);
  },
  methods: {
    showSearchSection() {
      // this.searchSection= true;
      // this.fixHeader(true);
      this.searchSection = true;
      this.overlay = !this.overlay;
    },
    closeSearchSection() {
      this.searchSection = false;
      this.searchResult = !this.searchResult;
      this.overlay = !this.overlay;
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
    position: absolute;
    width: 100%;
    // z-index: 6;
    height: 114px !important;

    &__content {
      max-width: min-content;
      max-height: 66px;
      .srchDestination {
        width: 270px;
      }
      .srchCheckIn,
      .srchCheckOut,
      .srchCount {
        width: 165px;
      }


      .v-text-field > .v-input__control > .v-input__slot:before {
        border-style: none;
      }
      .v-text-field > .v-input__control > .v-input__slot:after {
        border-style: none;
      }

      .v-input input,
      .v-input textarea {
        color: var(--v-greyLight2-base) !important;
      }

      .v-text-field .v-label {
        color: var(--v-greenDark8-base) !important;
        font-size: 12px;
        font-weight: 600;
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

// costomize user menu content
.v-menu {
  &__content {
    left: 80px !important;
    box-shadow: 0px 4px 20px #00000014 !important;
  }
}
</style>
