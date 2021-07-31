<template>
  <v-container>
    <!-- Top Section Start  -->
    <v-row class="mb-3">
      <v-col>
        <div class="font-regular-12 mb-2">
          <span class="secondary--text">هومسا /</span>
          <span class="secondary--text">اقامتگاه های استان گیلان /</span>
          <span>شهر رشت</span>
        </div>
        <div class="d-flex align-center">
          <h3 class="font-bold-18">اجاره اقامتگاه در شهر رشت</h3>
          <span class="ms-1 font-regular-12 secondary--text">(۳۴ مورد)</span>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex align-center justify-end">
          <div class="d-flex align-center">
            <span class="font-regular-12 secondary--text"
              >مرتب سازی بر اساس</span
            >
            <div class="sortByInput ms-3 mb-n7">
              <v-select
                :items="sortBy"
                v-model="sortBydefault"
                solo
                flat
                dense
              ></v-select>
            </div>
          </div>
          <div class="white ms-8 rounded">
            <v-icon class="py-2 ps-3 pe-1 secondary--text">mdi-menu</v-icon>
            <v-icon class="py-2 ps-1 pe-3 secondary--text">mdi-apps</v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- Top Section End  -->

    <!-- Main Section Start   -->
    <div class="white rounded-lg">
      <!-- Top Sec Start-->
      <div class="py-4 px-6">
        <v-row class="ma-0" align="center">
          <v-col cols="1" class="pa-0">
            <div>
              <span class="secondary--text font-regular-14">برچسب ها</span>
            </div>
          </v-col>
          <v-col cols="11" class="pa-0">
            <div>
              <AppItemCarousel />
            </div>

            <!-- <v-tabs show-arrows>
                <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

                <v-tab v-for="i in 30" :key="i" :href="'#tab-' + i">
                  Item {{ i }}
                </v-tab>
              </v-tabs> -->
          </v-col>
        </v-row>
      </div>
      <v-divider class="greyLight4"></v-divider>
      <!-- Top Sec End -->

      <!-- Result Sec Start -->
      <div>
        <v-row class="ma-0">
          
          <v-col
            cols="12"
            md="4"
            v-for="(result, index) in results"
            :key="index"
            class="pt-10 pb-11 px-6 resultBorder"
            :class="ifRtl ? 'resultSideBorderRtl' : 'resultSideBorderLtr'"
          >

          <!-- item component -->
            <PagesSearchResultItem />
          </v-col>
        </v-row>
      </div>
      <!-- Result Sec End -->

    </div>
    <!-- Main Section End  -->

    <!-- Bottom Section Start  -->
    <!-- Bottom Section End  -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sortBydefault: "بهترین تجربه",
      sortBy: ["گران ترین", "بهترین تجربه"],
      results: [
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
      ],
    };
  },
  computed: {
    ifRtl() {
      if (this.$vuetify.rtl) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.sortByInput {
  width: 134px;
}
.resultBorder {
  // border-left: #F5F5F5 solid 1px;
  border-bottom: #f5f5f5 solid 1px;
}

.resultSideBorderRtl {
  border-left: #f5f5f5 solid 1px;
}

.resultSideBorderLtr {
  border-right: #f5f5f5 solid 1px;
}

</style>