<template>
  <div class="ma-4 mb-0 headerCls">
    <div
      class="ps-11 pe-12 py-4 rounded-t-lg whiteColor headerCls__top"
      :class="searchSection ? '' : 'rounded-b-lg'"
    >
      <v-row>
        <v-col>
          <div>homsa logo</div>
        </v-col>
        <v-col>
          <div
            class="
              mx-auto
              px-3
              py-4
              text-center
              greyLight4
              rounded-lg
              cursorPointer
              selectInput
            "
            @click="showSearchSection"
          >
            <v-row class="align-center">
              <v-col cols="10" class="py-0">
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
                <!-- <div class="d-flex justify-space-between align-center">
                <span>cty</span>
                <span>dt</span>
                <span> g </span>
              </div> -->
              </v-col>
              <v-col cols="2" class="py-0">
                <img
                  src="@/assets/images/icons/ic-search.svg"
                  width="32"
                  class="pt-1"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col class="">
          <div class="d-flex align-center justify-end">
            <div>
              <v-btn rounded outlined color="primary">
                <v-icon>mdi-home-plus</v-icon>
                <span>
                  {{ hostBtn }}
                </span>
              </v-btn>
            </div>
            <div class="px-5">
              <span>
                {{ login }}
              </span>
              <span>|</span>
              <span>
                {{ register }}
              </span>
            </div>
            <div class="d-flex align-center">
              <div class="pe-1 pt-1">{{ phone }}</div>
              <v-icon> mdi-headset </v-icon>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-if="searchSection" class="grey rounded-b-lg headerCls__bottom d-flex justify-center align-center">
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
          <SearchIcon />
        </div>
      <!-- <v-overlay :value="overlay"></v-overlay> -->
    </div>
  </div>
</template>

<script>
import SearchIcon from "~/assets/images/icons/ic-search.svg?inline";
export default {
  components: { SearchIcon },
  data() {
    return {
      searchSection: false,
      overlay: false,
      hostBtn: "میزبان شوید",
      login: "ورود",
      register: "ثبت نام",
      phone: "۰۲۱-۲۸۱۱۱۵۰۰",
      searchForm: {
        destination: "کجا می‌خواهید بروید؟",
        checkIn: "انتخاب کنید",
        checkOut: "انتخاب کنید",
        count: "1",
      },
    };
  },
  methods: {
    showSearchSection() {
      // this.searchSection= true;
      this.searchSection = !this.searchSection;
      // this.overlay=!this.overlay;
    },
  },
};
</script>

<style lang="scss">
.headerCls {
  position: relative;
  z-index: 6;
  &__top {
    height: 80px !important;
    // height: 74px !important;
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

      .v-input input, .v-input textarea {
        color: var(--v-greyLight2-base)!important;
      }

      .v-text-field .v-label {
        color: var(--v-greenDark8-base)!important;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
}

.selectInput {
  width: 312px;
  min-width: 312px;
  height: 48px;
}
</style>
