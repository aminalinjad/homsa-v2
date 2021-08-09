<template>
  <div class="ma-4 mb-0 headerCls">
    <div class="ps-11 pe-12 py-4 rounded-t-lg whiteColor headerCls__top" :class="searchSection? '':'rounded-b-lg'">
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
    <div 
    v-if="searchSection"
    class="grey rounded-b-lg headerCls__bottom">
      <div class="d-flex justify-center">
        f
        <!-- <v-text-field label="مقصد، اقامتگاه">
          کجا می‌خواهید بروید؟
        </v-text-field>
        <v-text-field label="مقصد، اقامتگاه">
          کجا می‌خواهید بروید؟
        </v-text-field>
        <v-text-field label="مقصد، اقامتگاه">
          کجا می‌خواهید بروید؟
        </v-text-field> -->
      </div>
      <!-- <v-overlay :value="overlay"></v-overlay> -->
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchSection: false,
      overlay: false,
      hostBtn: "میزبان شوید",
      login: "ورود",
      register: "ثبت نام",
      phone: "۰۲۱-۲۸۱۱۱۵۰۰",
    };
  },
  methods: {
    showSearchSection() {
      // this.searchSection= true;
      this.searchSection= !this.searchSection;
      // this.overlay=!this.overlay;
    }
  }
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
    height: 114px!important;
  }
}

.selectInput {
  width: 312px;
  min-width: 312px;
  height: 48px;
}
</style>
