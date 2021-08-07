<template>
  <v-container class="px-md-0">
    <!-- Top Section Start  -->
    <v-row class="mb-3 align-center">
      <v-col>
        <div class="breadCrumbsCls">
          <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        </div>
        <div class="d-flex align-center">
          <p class="font-regular-18 mb-0">اجاره اقامتگاه در شهر رشت</p>
          <span class="ms-2 font-regular-12 secondary--text">(۳۴ مورد)</span>
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
                class="font-regular-12"
              ></v-select>
            </div>
          </div>
          <div class="white rounded ms-8">
            <v-btn
              elevation="0"
              fab
              small
              class="white me-n1"
              :class="ifRtl ? 'leftBorderZero' : 'rightBorderZero'"
              @click="listView"
            >
              <v-icon class="secondary--text">mdi-menu</v-icon>
            </v-btn>
            <v-btn
              elevation="0"
              fab
              small
              class="white"
              :class="ifRtl ? 'rightBorderZero' : 'leftBorderZero'"
              @click="gridView"
            >
              <v-icon class="secondary--text">mdi-apps</v-icon>
            </v-btn>
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

      <!-- test of owl carousel -->
      <!-- <client-only>
        <carousel :items="5" >
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          <v-chip outlined label color="borderGray" text-color="secondary" class="tagItem">
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </v-chip>
          
        </carousel>
      </client-only> -->

      <!-- Result Sec Start -->
      <div>
        <v-row class="ma-0">
          <v-col
            cols="12"
            :md="ifGridView ? 4 : 12"
            v-for="(result, index) in results"
            :key="index"
            class="pt-10 pb-11 px-6 resultBorder"
            :class="ifRtl ? 'resultSideBorderRtl' : 'resultSideBorderLtr'"
          >
            <!-- item component -->

            <PagesSearchResultItem :ifGridView="ifGridView" :index="index" />
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
      gridViewResult: true,
      sortBydefault: "بهترین تجربه",
      sortBy: ["گران ترین", "بهترین تجربه"],
      breadcrumbs: [
        {
          text: "هومسا",
          disabled: false,
          href: "#",
        },
        {
          text: "اقامتگاه های استان گیلان",
          disabled: false,
          href: "#",
        },
        {
          text: "شهر رشت",
          disabled: true,
          href: "#",
        },
      ],
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
    ifGridView() {
      if (this.gridViewResult) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    listView() {
      this.gridViewResult = false;
    },
    gridView() {
      this.gridViewResult = true;
    },
    changed( ) {

    },
    updated() {

    }
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

.leftBorderZero {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.rightBorderZero {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

//breadcrumb link color
.v-application .breadCrumbsCls a {
  color: #757575 !important;
}

.v-application .breadCrumbsCls a.v-breadcrumbs__item--disabled {
  color: black !important;
}

</style>