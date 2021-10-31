<template>
  <header
    id="headerSearch"
    class="headerCls"
    :class="{ 'pa-4 mb-0' : searchSection || !fixedHeader, 'fixedHeader' : fixedHeader }"
  >
    <!-- header top section -->
    <v-row
      class="ma-0 rounded-t-lg whiteColor headerCls__top"
      :class="['ma-0 rounded-t-lg whiteColor headerCls__top',
      { 'rounded-b-lg': !searchSection || !fixedHeader , 'bottomShadow': !searchSection && fixedHeader }
      ]"
    >
      <v-container
        class="pa-4"
        :fluid="
          $vuetify.breakpoint.md || $route.query.showMap === 'true'
        "
      >
        <v-row>
          <!-- header logo -->
          <v-col>
            <img
              src="@/assets/images/logo-homsa.svg"
              class="mt-2 cursorPointer"
            />
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
              v-if="!searchSection"
            >
              <div
                class="d-flex justify-space-between align-center"
                v-if="!searchFormValue.destination"
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
                  <span>{{ $t("header.top.input.destination") }}</span>
                </div>
                <v-btn fab color="primary" elevation="0" width="32" height="32">
                  <v-icon>$searchLeft</v-icon>
                </v-btn>
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
                <div class="pe-3">{{ userDestinationSearch }}</div>
                <v-divider vertical></v-divider>
                <div v-if="checkInDate" class="px-3">
                  <span
                    :class="{ 'font-FaNumregular-14': $vuetify.rtl }"

                  >{{ checkInDate }}</span
                  >
                  <v-icon v-if="$vuetify.rtl">$arrowLine</v-icon>
                  <v-icon v-else>$arrowLineRight</v-icon>

                  <span
                    :class="{ 'font-FaNumregular-14': $vuetify.rtl }"
                  >{{ checkOutDate }}</span
                  >
                  <span
                    class="ps-1 font-regular-12 greyLight2--text"
                    :class="{ 'font-FaNumregular-12': $vuetify.rtl }"
                  >(
                    <v-icon small>$plusMinusGrey</v-icon>
                    {{ searchFormValue.flexibility }}
                    {{ $t("header.top.input.day") }})
                  </span>
                </div>
                <div v-else>تاریخ را انتخاب کنید</div>
                <v-divider vertical></v-divider>

                <div class="px-3">
                  <span
                    v-if="searchFormValue.guest"
                    :class="{ 'font-FaNummedium-14': $vuetify.rtl }"
                  >
                    {{ searchFormValue.guest }}
                    {{ $t("header.top.input.unit") }}
                  </span>
                  <span class="font-regular-14 secondary--text" v-else>{{
                      $t("header.top.input.count")
                    }}</span>
                </div>
                <v-btn fab color="primary" elevation="0" width="32" height="32">
                  <v-icon>$searchLeft</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>

          <!-- header user option -->
          <v-col>
            <div class="mt-1 d-flex align-center justify-end">
              <div>
                <v-btn
                  rounded
                  text
                  color="primary"
                  height="30"
                  class="px-2 py-1 text-capitalize"
                >
                  <span class="font-medium-14">
                    {{ $t("header.top.guest") }}
                  </span>
                </v-btn>
              </div>
              <v-divider vertical class="mx-3 greyLight4"></v-divider>
              <div>
                <v-menu
                  ref="menuRef"
                  fixed
                  :left="$vuetify.rtl"
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
                      class="ps-1 pe-2 py-1 text-capitalize"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon size="22">$profile</v-icon>
                      <div class="ms-2">
                        <span class="font-medium-14">
                          {{ $t("header.top.user.login") }}
                        </span>
                        <span class="font-medium-14">/</span>
                        <span class="font-medium-14">
                          {{ $t("header.top.user.register") }}
                        </span>
                      </div>
                    </v-btn>
                  </template>
                  <v-list class="cursorPointer">
                    <v-list-item link to="">
                      <v-list-item-subtitle class="greenDark8--text"
                      >{{ userMenu.menuTitle }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-divider class="greyLight4"></v-divider>
                    <v-list-item
                      v-for="(item, index) in userMenu.menuBody"
                      :key="index"
                      link
                      :to="item.link"
                    >
                      <v-list-item-subtitle class="secondary--text"
                      >{{ item.name }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-divider class="greyLight4"></v-divider>
                    <v-list-item
                      v-for="(item, index) in userMenu.menuFooter"
                      :key="`${index + userMenu.menuBody.length}`"
                      link
                      :to="item.link"
                    >
                      <v-list-item-subtitle class="secondary--text"
                      >{{ item.name }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <v-divider vertical class="mx-3 greyLight4"></v-divider>

              <div class="d-flex align-center">
                <v-btn
                  icon
                  width="30"
                  height="30"
                  class="pa-1"
                  @click="changeLang"
                >
                  <v-icon size="30">$language</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <!-- header bottom / search section -->
    <v-row
      :class="searchSection ? 'search-section-down' : 'search-section-up'"
      class="
        ma-0
        greyLight4
        rounded-b-lg
        headerCls__bottom
        justify-center
        align-center
      "
    >
      <div class="d-flex headerCls__bottom__content">
        <!-- destination  -->
        <v-hover v-slot="{ hover }">
          <v-combobox
            ref="cityAutocomplete"
            filled
            clearable
            height="66"
            background-color="whiteColor"
            :label="`${$t('header.bottom.destination.label')}`"
            :placeholder="`${$t('header.bottom.destination.place-holder')}`"
            persistent-placeholder
            :items="suggestionsDefault"
            :search-input.sync="userDestinationSearch"
            item-text="title"
            item-value="title"
            v-model="searchFormValue.destination"
            append-icon=""
            prepend-inner-icon="$pinLocation"
            :menu-props="{ minWidth: 410, left: $vuetify.rtl }"
            :class="['me-2 rounded searchDestination font-regular-14', { 'searchInputBoxShadow': hover }]"
            @click:clear="clearDestination"
            return-object
            no-filter
            :value="userDestinationSearch"
            @click.native="closeCalendar"
          >
            <!-- title in suggestion mode -->
            <template v-slot:prepend-item>
              <v-list-item-title
                v-if="userDestinationSearch === '' || userDestinationSearch === null"
                class="ms-6 mt-4 font-medium-14 greenDark8--text"
              >پیشنهاد هومسا
              </v-list-item-title
              >
              <div class="font-medium-14 greenDark8--text cursorPointer pa-5" v-else-if="suggestionsDefault.length !== 0">
                  <v-list-item-title
                    @click="clickOnUserSuggestion"
                    v-html="`جستجوی ${userDestinationSearch} در هومسا`"
                    class="font-regular-14 greenDark8--text"
                  ></v-list-item-title>
              </div>
              <!--destination result -->
            </template>

            <template v-slot:no-data>
              <div class="font-medium-14 greenDark8--text cursorPointer pa-5">
                <v-list-item-title
                  @click="clickOnUserSuggestion"
                  v-html="`جستجوی ${userDestinationSearch} در هومسا`"
                  class="font-regular-14 greenDark8--text"
                ></v-list-item-title>
              </div>

            </template>

            <template v-slot:item="data">
              <v-list-item-avatar rounded width="48" height="48" class="ms-2">
                <img :src="data.item.image"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-html="data.item.title"
                  class="font-regular-14 greenDark8--text"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.sub_title"
                  class="font-regular-12 greyLight2--text"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-combobox>
        </v-hover>

        <!-- date range  -->
        <v-hover v-slot="{ hover }">
          <v-row
            :class="{ 'searchInputBoxShadow': hover }"
            class="ma-0 me-2 searchDateRange whiteColor rounded justify-sm-space-between align-center"
          >
            <v-row class="my-0 mx-3" @click="showCalendar">
              <v-icon>$calendar</v-icon>
              <v-col class="my-0 py-0">
                <p class="my-0 font-medium-12 greenDark8--text">
                  {{ $t("header.bottom.date-range.date-range") }}
                </p>
                <v-row class="ma-0">
                  <span v-if="checkInDate" class="greenDark8--text">
                    <span
                      :class="$vuetify.rtl ? 'font-FaNumregular-14': 'font-regular-14'"
                    >{{ checkInDate }}</span
                    >
                    <span>
                      <v-icon small v-if="$vuetify.rtl">$arrowLineDark</v-icon>
                      <v-icon small v-else>$arrowLineDarkRight</v-icon>
                    </span>
                    <span v-if="checkOutDate" :class="$vuetify.rtl ? 'font-FaNumregular-14': 'font-regular-14'">
                      {{ checkOutDate }}
                    </span>
                  </span>
                  <span class="font-regular-14 greyLight2--text" v-else>
                    {{ $t("header.bottom.date-range.place-holder") }}
                  </span>
                </v-row>
              </v-col>
            </v-row>
            <v-btn small icon class="me-0" @click="clearDateRange" v-if="checkInDate">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-row>
        </v-hover>
        <!-- count / guest -->
        <v-hover v-slot="{ hover }">
          <v-row
            :class="{ 'searchInputBoxShadow': hover }"
            class="ma-0 me-2 searchCount whiteColor rounded"
          >
            <v-col cols="9" class="pa-0">
              <v-text-field
                filled
                readonly
                height="66"
                background-color="whiteColor"
                prepend-inner-icon="$usersProfile"
                :suffix="`${$t('header.bottom.count.suffix')}`"
                :label="`${$t('header.bottom.count.label')}`"
                v-model="searchFormValue.guest"
                class="rounded"
                :class="
                  $vuetify.rtl ? 'farsiFontCountInput' : 'inputRight'
                "
              >
              </v-text-field>
            </v-col>

            <v-col
              cols="3"
              class="pa-0 pe-3"
              :class="$vuetify.rtl ? 'text-left' : 'text-right'"
            >
              <v-row class="ma-0" v-if="hover">
                <v-col class="pt-2 pb-1 px-0">
                  <v-hover v-slot="{ hover }">
                    <v-btn small icon depressed @click="addGuest">
                      <AddIcon
                        :clr="
                          hover
                            ? $vuetify.theme.dark
                              ? $vuetify.theme.themes.dark.primary
                              : $vuetify.theme.themes.light.primary
                            : null
                        "
                      />
                    </v-btn>
                  </v-hover>
                </v-col>
                <v-col class="mt-n3 pt-1 px-0">
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      small
                      icon
                      depressed
                      @click="minusGuest"
                      :disabled="searchFormValue.guest === 1"
                    >
                      <MinusIcon
                        :clr="
                          searchFormValue.guest === 1
                            ? null
                            : hover
                            ? $vuetify.theme.dark
                              ? $vuetify.theme.themes.dark.primary
                              : $vuetify.theme.themes.light.primary
                            : $vuetify.theme.themes.dark.secondary
                        "
                      />
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-hover>

        <v-btn
          fab
          color="primary"
          elevation="0"
          width="66"
          height="66"
          @click="SearchServices"
        >
          <v-icon size="30">$search</v-icon>
        </v-btn>
      </div>
    </v-row>

    <!-- calendar  -->
    <AppCalendar
      class="appCalendar"
      v-show="calendar"
      :checkInDate="checkInDate"
      :checkOutDate="checkOutDate"
      :clearCalendarData="clearCalendar"
      @setCheckInDate="setCheckInDate"
      @setCheckOutDate="setCheckOutDate"
      @submitCalendarDate="submitCalendarDate"
    />
    <!-- overlay  -->
    <v-overlay
      :value="overlay"
      @click.native="closeSearchSection"
      z-index="-1"
    ></v-overlay>
  </header>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {SearchServices} from "@/services";
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
      test: '',
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
          {name: "اقامتگاه‌های من", link: "#1"},
          {name: "رزروهای من", link: "#2"},
          {name: "لیست اعلان‌ها", link: "#3"},
          {name: "لیست علاقه مندی‌ها", link: "#4"}
        ],
        menuFooter: [
          {name: "پشتیبانی", link: "#5"},
          {name: "خروج", link: "#6"}
        ]
      },
      userDestinationSearch: '',
      searchFormValue: {
        destination: null,
        checkIn: null,
        checkOut: null,
        flexibility: 1,
        guest: 1
      },
      suggestionsDefault: [],
      suggestion: true,
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
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`
    }),
  },

  mounted() {
    window.addEventListener("scroll", this.scrollPage, {passive: true});
    this.destinationSearch('');
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollPage);
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
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
    SearchServices() {
      if (this.userDestinationSearch === '' || this.userDestinationSearch === null) {
        this.$toast.error('جستجو بدون پارامتر امکانپذیر نیست')
      }else  {

        if (this.searchFormValue.destination && this.searchFormValue.destination.type) {
          //check send request or not
          if (`${this.searchFormValue.destination.type}-${this.searchFormValue.destination.slug}` === this.$route.params.slug) {
            setTimeout(() => {
              this.$nuxt.$loading.start()
            } , 1)
            let data = {
              page: Number(this.$route.query.page) || 1,
              sort: this.$route.query.sort ? this.$route.query.sort : 'popular',
              guest: this.searchFormValue.guest,
            }
            if (this.searchFormValue.checkIn) {
              data.checkin = this.searchFormValue.checkIn
            }
            if (this.searchFormValue.checkOut) {
              data.checkout = this.searchFormValue.checkOut
            }

            let splitSlug = this.$route.params.slug.split('-')

            data.slugs = [{
              value: splitSlug[1],
              type: splitSlug[0]
            }]
            SearchServices.searchResults(data).then(res => {
              this.calendar = false;
              this.closeSearchSection();
              this.$nuxt.$loading.finish()
              console.log(res.data)
              this.setSearchResult(res.data)
            }).catch(err => {
              this.$nuxt.$loading.finish()
            })
          }else {
            this.calendar = false;
            this.closeSearchSection();
          }
          //end check request
          let queryData = {
            guest: this.searchFormValue.guest,
            checkInDate: this.searchFormValue.checkIn ? this.searchFormValue.checkIn : undefined,
            checkOutDate: this.searchFormValue.checkOut ? this.searchFormValue.checkOut : undefined,
            q: undefined
          }
          this.$router.push({
            path: `${this.searchFormValue.destination.type}-${this.searchFormValue.destination.slug}`,
            query: {...this.$route.query, ...queryData}
          })
        } else {
          //check send request or not
          if (this.userDestinationSearch === this.$route.query.q) {
            setTimeout(() => {
              this.$nuxt.$loading.start()
            } , 1)
            let data = {
              page: Number(this.$route.query.page) || 1,
              sort: this.$route.query.sort ? this.$route.query.sort : 'popular',
              guest: this.searchFormValue.guest,
              q: this.userDestinationSearch
            }
            if (this.searchFormValue.checkIn) {
              data.checkin = this.searchFormValue.checkIn
            }
            if (this.searchFormValue.checkOut) {
              data.checkout = this.searchFormValue.checkOut
            }
            SearchServices.searchResults(data).then(res => {
              this.calendar = false;
              this.closeSearchSection();
              this.$nuxt.$loading.finish()
              console.log(res.data)
              this.setSearchResult(res.data)
            }).catch(err => {
              this.$nuxt.$loading.finish()
            })
          }else {
            this.calendar = false;
            this.closeSearchSection();
          }
          //end check request
          this.$router.push({
            path: 'search',
            query: {...this.$route.query, guest: this.searchFormValue.guest, q: this.userDestinationSearch}
          })
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
      }
      return SearchServices.destinationSuggestions(data)
        .then(res => {
          this.suggestionsDefault = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
    },
    clearDestination() {
    },
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
        this.$vuetify.rtl ? this.checkInDate = checkInDate.jalali_date : this.checkInDate = checkInDate.date;
      } else {
        this.searchFormValue.checkIn = null;
        this.checkInDate = null;
      }
    },
    setCheckOutDate(checkOutDate) {
      if (checkOutDate) {
        this.searchFormValue.checkOut = checkOutDate.date;
        this.$vuetify.rtl ? this.checkOutDate = checkOutDate.jalali_date : this.checkOutDate = checkOutDate.date;
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
        this.clearDateRange()
      }
    },
    submitCalendarDate(flexibility) {
      this.searchFormValue.flexibility = flexibility ? flexibility : 1;
      this.calendar = !this.calendar;
    }
  }
};
</script>

<style lang="scss">
.headerCls {
  position: relative;
  transition: all 0.2s;
  z-index: 1500;

  &__top {
    z-index: 1;
    position: relative;
    height: 80px !important;

    .selectInput {
      min-width: 312px;
      max-width: max-content;
      height: 48px;
    }
  }

  &__bottom {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 114px;
    top: -60px;
    z-index: 0;
    visibility: hidden;

    &__content {
      max-width: min-content;
      max-height: 66px;

      .searchInputBoxShadow {
        box-shadow: 0px 4px 10px #0000001a;
      }

      .searchDestination.v-autocomplete {
        .v-select {
          &__slot {
            input {
              top: -12px !important;
            }
          }
        }
      }

      .searchDestination {
        width: 270px;
      }

      .searchDateRange {
        width: 255px;
        height: 66px;
        cursor: text;
      }

      .searchCheckIn,
      .searchCheckOut,
      .searchCount {
        width: 165px;
        height: 66px;

        // .v-input {
        //   input {
        //       text-align: end!important;
        //     }
        // }

        .v-input.farsiFontCountInput {
          input,
          textarea {
            text-align: left !important;
          }
        }

        .v-input.inputRight {
          input,
          textarea {
            text-align: right !important;
          }
        }
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

        &__suffix {
          color: var(--v-greyLight2-base) !important;
          font-size: 14px;
          margin-top: 10px !important;
        }
      }

      .v-input {
        input,
        textarea {
          color: var(--v-greyLight2-base) !important;
        }
      }

      .farsiFontCountInput {
        .v-text-field {
          &__slot {
            font-family: IRANSansFaNumregular !important;
          }
        }
      }
    }
  }

  .bottomShadow {
    box-shadow: 0 4px 10px -2px var(--v-greyLight2-base);
  }
}

////animation menu
.search-section-down {
  animation: headerMove 300ms forwards;
}

.search-section-up {
  animation: headerBackMove 300ms forwards;
}

@keyframes headerBackMove {
  from {
    top: -10px;
    opacity: 1;
    height: 114px;
  }
  to {
    visibility: hidden;
    top: -30px;
    opacity: 0;
    height: 0;
  }
}

@keyframes headerMove {
  from {
    opacity: 0;
    top: -60px;
  }
  to {
    visibility: visible;
    opacity: 1;
    top: 0;
  }
}

.fixedHeader {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
}

// costomize menu content
.v-menu {
  &__content {
    //position: fixed !important;
    box-shadow: 0 4px 20px #00000014 !important;
    z-index: 9999 !important;
  }
}

// customize calendar position
.appCalendar {
  position: absolute !important;
  left: 0;
  right: 0;
  margin-top: -8px;
  margin-left: auto;
  margin-right: auto;
}
</style>
