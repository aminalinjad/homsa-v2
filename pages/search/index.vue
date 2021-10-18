<template>
  <!--  without map -->
  <div v-if="$route.query.showMap === 'false' || !$route.query.showMap">
    <!-- main  -->
    <v-main class="pt-3">
      <v-container class="" :fluid="$vuetify.breakpoint.md">
        <v-row class="justify-center">
          <v-col class="filterContainer">
            <PagesSearchFilters />
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
import {SearchServices} from "@/services";

export default {
  layout: "search",
  props: [],
  head() {
    return {
      title: this.getSearchResult.title,
    }
  },
  data() {
    return {
      id: 444,
      propsPagination: null
    };
  },
  asyncData({params, app, store , route}) {
    let data = {
      q: route.query.q,
      page: Number(route.query.page) || 1,
      sort: route.query.sort ? route.query.sort : 'popular',
      guest:  Number(route.query.guest) || 1,
      checkin: route.query.checkInDate,
      checkout: route.query.checkOutDate,
    }
    return SearchServices.searchResults(data).then(res => {
      // console.log(res.data)
      store.dispatch('modules/search/SET_SEARCH_RESULTS', res.data)
      store.dispatch('modules/filters/SET_FILTERS', res.data.filters.filters)
      store.dispatch('modules/filters/SET_HISTOGRAM_PRICES', res.data.histogram_prices.prices)
      console.log('sahar', res.data.histogram_prices.prices)
      return {
        results: res.data.data
      }
    })
  },
  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`,
    }),
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      setMapLayout: `modules/structure/${types.structure.actions.GET_MAP_LAYOUT}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
    }),
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

