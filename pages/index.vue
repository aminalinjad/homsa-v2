<template>
  <!--  without map -->
  <div v-if="$route.query.showMap === 'false' || !$route.query.showMap">
    <!-- main  -->
    <v-main class="pt-3">
      <v-container class="" :fluid="$vuetify.breakpoint.md">
        <v-row class="justify-center">
          <v-col class="filterContainer">
            <PagesSearchFilters/>
          </v-col>
          <v-col class="resultContainer">
            <PagesSearchContent/>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <!-- footer  -->
    <PagesSearchFooter/>
  </div>

  <!--  with map -->
  <v-row v-else class="ma-0">
    <PagesSearchMapSide class="pb-4" :isRtl="$vuetify.rtl"/>
    <v-main>
      <v-container class="pt-0 fill-height" fluid>
        <PagesSearchMap class="mapLayoutContainer px-1"/>
      </v-container>
    </v-main>
  </v-row>

</template>
<script>
import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";

import {SearchServices} from "@/services"

export default {
  layout: "search",
  props: [],
  data() {
    return {
      id: 444,
      propsPagination: null
    };
  },
  asyncData({params, app, store , route}) {
    let result
    let data = {
      q: "tehran",
      "Accept-Language": "fa",
      page: Number(route.query.page) || 1,
      sort: "popular"
    }
    return SearchServices.searchResults(data).then(res => {
      console.log(res.data)
      store.dispatch('modules/search/SET_SEARCH_RESULTS', res.data)
      return {
        results: res.data.data
      }
    })
  },
  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
    }),
  },
  mounted() {
    this.getFilterData();
  },
  methods: {
    ...mapActions({
      setMapLayout: `modules/structure/${types.structure.actions.GET_MAP_LAYOUT}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
    }),
    getFilterData() {
      let filters = [
        {
          type: "map",
        },
        {
          type: "price",
          step: 200,
          min: 200,
          max: 1000000,
          options: [
            {
              price: 100000,
              count: 5,
            },
            {
              price: 200000,
              count: 10,
            },
            {
              price: 500000,
              count: 20,
            },
            {
              price: 700000,
              count: 5,
            },
          ],
        },
        {
          type: "count",
          options: ["اتاق خواب"],
        },
        {
          type: "count",
          title: "امکانات خواب",
          expand: [0],
          options: [
            "تخت خواب دو نفره",
            "تخت خواب تک نفره",
            "تخت کودک",
            "کاناپه تخت خواب شو",
            "تشک",
          ],
        },
        {type: "boolean", label: "رزرو آنی"},
        {type: "boolean", label: "مهمان نواز"},
        {type: "boolean", label: "تخفیف‌دار"},
        {type: "boolean", label: "ضدعفونی"},
        {type: "select", title: "اقامتگاه", expand: []},
        {type: "select", title: "آشپزخانه", expand: []},
        {
          type: "select",
          title: "نزدیک به",
          expand: [0],
          options: ["دریا", "دریاچه", "جنگل", "حرم"],
        },
        {
          type: "select",
          title: "قوانین و مقررات",
          expand: [0],
          options: ["استعمال دخانیات", "ورود حیوانات خانگی", "برگزاری مراسم"],
        },
        {
          type: "selectGroup",
          title: "امکانات",
          options: [
            {
              type: "select",
              title: "آشپزخانه",
              expand: [0],
              options: ["یخچال", "مایکروویو", "لوازم آشپزی", "اجاق گاز"],
            },
            {
              type: "select",
              title: "رفاهی",
              expand: [0],
              options: ["یخچال", "مایکروویو", "لوازم آشپزی"],
            },
            {
              type: "select",
              title: "بهداشتی",
              expand: [0],
              options: ["یخچال", "مایکروویو"],
            },
            {
              type: "select",
              title: "امکانات سرمایشی گرمایشی",
              expand: [0],
              options: ["لوازم آشپزی", "اجاق گاز"],
            },
            {
              type: "select",
              title: "وعده غذایی",
              expand: [0],
              options: ["یخچال", "مایکروویو", "لوازم آشپزی", "اجاق گاز"],
            },
          ],
        },
      ];
      this.setFilters(filters);
    },
  },
};
</script>

<style scoped lang="scss">
.resultContainerMap {
  flex: 0 0 504px;
  overflow: hidden;
}

.mapContainer {
  // flex: 0 0 1008px;
  overflow: hidden;
}

.filterContainer {
  flex: 0 0 336px;
  height: max-content;
  position: sticky;
  top: 96px;
}

.resultContainer {
  // flex: 0 0 1008px;
  overflow: hidden;
  height: max-content;
  position: sticky;
  top: 96px;
}

.mapLayoutContainer {
  flex: 1;
  height: 100%;
}
</style>

