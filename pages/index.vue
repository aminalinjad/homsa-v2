<template>
  <!--  without map -->
  <div v-if="$route.query.showMap === 'false' || !$route.query.showMap">
    <!-- main  -->
    <v-main class="pt-3">
      <v-container :fluid="$vuetify.breakpoint.md">
        <v-row class="justify-center">
          <v-col class="filterContainer">
            <PagesSearchFilters />
          </v-col>
          <v-col
            id="sahar"
            ref="resultContainerRef"
            class="resultContainer"
            :class="{ stickyResultContainer: isIntersecting }"
          >
            <PagesSearchContent />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- footer  -->
    <PagesSearchFooter />
  </div>

  <!--  with map -->
  <v-row v-else class="ma-0">
    <PagesSearchMapSide class="pb-4" :isRtl="$vuetify.rtl" />
    <v-main>
      <v-container class="pt-0 fill-height" fluid>
        <PagesSearchMap class="mapLayoutContainer px-1" />
      </v-container>
    </v-main>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "@/store/types.js";
import { SearchServices } from "@/services";

export default {
  layout: "search",
  name: "mainPage",
  props: [],
  head() {
    return {
      title: this.getSearchResult.title
    };
  },
  data() {
    return {
      id: 444,
      propsPagination: null,
      isIntersecting: false
    };
  },
  asyncData({ params, app, store, route }) {
    let data = {
      // "Accept-Language": "fa",
      q: "اجاره ویلا استخردار رامسر",
      page: Number(route.query.page) || 1,
      sort: "popular",
      guest: 5
    };
    return SearchServices.searchResults(data).then(res => {
      store.dispatch("modules/search/SET_SEARCH_RESULTS", res.data);
      store.dispatch("modules/filters/SET_FILTERS", res.data.filters.filters);
      store.dispatch(
        "modules/filters/SET_HISTOGRAM_PRICES",
        res.data.histogram_prices.prices
      );
      return {
        results: res.data.data
      };
    });
  },
  computed: {
    ...mapGetters({
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`
    })
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandler);
  },
  methods: {
    scrollHandler() {
      if (this.$refs.resultContainerRef.offsetHeight -window.innerHeight -150 <= window.pageYOffset) {
        this.isIntersecting = true;
      } else {
        this.isIntersecting = false;
      }
    }

  }
};
</script>

<style scoped lang="scss">
.filterContainer {
  flex: 0 0 336px;
  height: max-content;
  //position: sticky;
  top: 96px;
}

.resultContainer {
  // flex: 0 0 1008px;
  overflow: hidden;
  height: max-content;
  //position: sticky;
  top: 96px;
}

.stickyResultContainer {
  position: sticky !important;
}

.mapLayoutContainer {
  flex: 1;
  height: 100%;
}
</style>
