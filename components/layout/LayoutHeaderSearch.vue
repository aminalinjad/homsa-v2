<template>
  <header
    id="headerSearch"
    class="headerCls"
    :class="[
      searchSection || !fixedHeader ? 'pa-4 mb-0' : '',
      fixedHeader ? 'fixedHeader' : ''
    ]"
  >
    <!-- header top section -->
    <v-row
      class="ma-0 rounded-t-lg whiteColor headerCls__top"
      :class="[
        searchSection || fixedHeader ? '' : 'rounded-b-lg',
        !searchSection && fixedHeader ? 'bottomShodaw' : ''
      ]"
    >
      <v-container
        class="pa-4"
        :fluid="
          $vuetify.breakpoint.md || $route.query.showMap === 'true'
            ? true
            : false
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
                <div class="pe-3">{{ searchFormValue.destination }}</div>
                <v-divider vertical></v-divider>
                <div class="px-3">
                  <span
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
                    >{{ searchFormValue.checkIn }}</span
                  >
                  <v-icon v-if="$vuetify.rtl">$arrowLine</v-icon>
                  <v-icon v-else>$arrowLineRight</v-icon>

                  <span
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
                    >{{ searchFormValue.checkOut }}</span
                  >
                  <span
                    class="ps-1 font-regular-12 greyLight2--text"
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
                    >(
                    <v-icon small>$plusMinusGrey</v-icon>
                    {{ searchFormValue.flexiblity }}
                    {{ $t("header.top.input.day") }})
                  </span>
                </div>
                <v-divider vertical></v-divider>

                <div class="px-3">
                  <span
                    v-if="searchFormValue.count"
                    :class="$i18n.locale === 'fa' ? 'font-FaNummedium-14' : ''"
                  >
                    {{ searchFormValue.count }}
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
          <v-autocomplete
            ref="cityAutocomplete"
            filled
            clearable
            height="66"
            background-color="whiteColor"
            :label="`${$t('header.bottom.destination.label')}`"
            :placeholder="`${$t('header.bottom.destination.place-holder')}`"
            persistent-placeholder
            :items="
              homsaSuggestion
                ? destinationSuggestions.items
                : destinationSearchResult
            "
            item-text="city"
            item-value="city"
            :default="searchForm.destination"
            v-model="searchForm.destination"
            append-icon=""
            prepend-inner-icon="$pinLocation"
            no-data-text="No data available"
            :menu-props="{ minWidth: 410, left: $vuetify.rtl }"
            :class="hover ? 'boxShadow' : ''"
            class="me-2 rounded searchDestination font-regular-14"
            @click="destinationSuggestion"
            @click:clear="clearDestination"
            @update:search-input="destinationSearch"
          >
            <!-- title in suggestion mode -->
            <template v-slot:prepend-item>
              <v-list-item-title
                v-if="homsaSuggestion"
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
        </v-hover>

        <!-- date range  -->
        <v-hover v-slot="{ hover }">
          <v-row
            :class="hover ? 'boxShadow' : ''"
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
            <v-btn small icon class="me-3" @click="clearDateRange" v-if="checkInDate">
              <v-icon>$close</v-icon>
            </v-btn>
          </v-row>
        </v-hover>
        <!--        <v-hover v-slot="{ hover }">-->
        <!--          <v-text-field-->
        <!--            filled-->
        <!--            readonly-->
        <!--            height="66"-->
        <!--            background-color="whiteColor"-->
        <!--            :label="`${$t('header.bottom.check-in.label')}`"-->
        <!--            :placeholder="`${$t('header.bottom.check-in.place-holder')}`"-->
        <!--            persistent-placeholder-->
        <!--            v-model="searchForm.checkIn"-->
        <!--            :class="hover ? 'boxShadow' : ''"-->
        <!--            class="me-2 rounded searchCheckIn font-regular-14"-->
        <!--            @click="showCalendar"-->
        <!--          >-->
        <!--          </v-text-field>-->
        <!--        </v-hover>-->

        <!--        <v-hover v-slot="{ hover }">-->
        <!--          <v-text-field-->
        <!--            filled-->
        <!--            readonly-->
        <!--            height="66"-->
        <!--            background-color="whiteColor"-->
        <!--            :label="`${$t('header.bottom.check-out.label')}`"-->
        <!--            :placeholder="`${$t('header.bottom.check-out.place-holder')}`"-->
        <!--            persistent-placeholder-->
        <!--            v-model="searchForm.checkOut"-->
        <!--            :class="hover ? 'boxShadow' : ''"-->
        <!--            class="me-2 rounded searchCheckOut font-regular-14"-->
        <!--            @click="showCalendar"-->
        <!--          >-->
        <!--          </v-text-field>-->
        <!--        </v-hover>-->

        <!-- count / guest -->
        <v-hover v-slot="{ hover }">
          <v-row
            :class="hover ? 'boxShadow' : ''"
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
                v-model="searchForm.count"
                class="rounded"
                :class="
                  $i18n.locale === 'fa' ? 'farsiFontCountInput' : 'inputRight'
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
                    <v-btn small icon depressed @click="addCount">
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
                      @click="minusCount"
                      :disabled="searchForm.count === 1"
                    >
                      <MinusIcon
                        :clr="
                          searchForm.count === 1
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
      v-if="calendar"
      :checkInDate="checkInDate"
      :checkOutDate="checkOutDate"
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
import { mapGetters } from "vuex";
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
      checkInDate: null,
      checkOutDate: null,
      fixedHeader: false,
      searchSection: false,
      searchResult: false,
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
      searchForm: {
        destination: "",
        checkIn: "",
        checkOut: "",
        count: 1
      },
      searchFormValue: {
        destination: "یزد",
        destination: "کهگیلویه و بویراحمد",
        checkIn: "12/08",
        checkOut: "12/31",
        flexiblity: 1,
        count: 1
      },
      suggestion: true,
      destinationSuggestions: {
        title: "پیشنهاد هومسا",
        items: [
          {
            city: "کرج",
            state: "استان البرز",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
          },
          {
            city: "کردان",
            state: "ساوجبلاغ، استان البرز",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
          },
          {
            city: "تهران",
            state: "تهران",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
          },
          {
            city: "کیش",
            state: "هرمزگان",
            img: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
          }
        ]
      },
      destinationSearchResult: [
        {
          city: "یزد",
          state: "استان یزد",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        },
        {
          city: "ایزدشهر",
          state: "نور، استان مازندران",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        },
        {
          city: "مهریز",
          state: "یزد، استان یزد",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        },
        {
          city: "استان یزد",
          state: "",
          img: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`
    }),

    homsaSuggestion() {
      return this.suggestion === true;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollPage, { passive: true });
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollPage);
  },
  methods: {
    showSearchSection() {
      this.searchSection = true;
      this.overlay = !this.overlay;
    },
    closeSearchSection() {
      this.searchSection = !this.searchSection;
      this.calendar = false;
      this.searchResult = !this.searchResult;
      this.overlay = !this.overlay;
    },
    SearchServices() {
      this.calendar = false;
      this.closeSearchSection();
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
    destinationSuggestion() {
      this.suggestion = true;
    },
    destinationSearch() {
      if (
        this.searchForm.destination !== "کجا می‌خواهید بروید؟" ||
        this.searchForm.destination !== ""
      ) {
        this.suggestion = false;
      } else {
        this.suggestion = true;
      }
    },
    clearDestination() {
      this.searchForm.destination = "کجا می‌خواهید بروید؟";
      this.suggestion = true;
    },
    addCount() {
      this.searchForm.count++;
    },
    minusCount() {
      if (this.searchForm.count > 1) {
        this.searchForm.count--;
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
      this.checkInDate = checkInDate;
    },
    setCheckOutDate(checkOutDate) {
      this.checkOutDate = checkOutDate;
    },
    clearDateRange() {
      this.checkInDate = null;
      this.checkOutDate = null;
      this.calendar = false;
    },
    submitCalendarDate() {
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

      .boxShadow {
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

  .bottomShodaw {
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
