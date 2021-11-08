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
      propsPagination: null,
      data: null
    };
  },
  asyncData({params, app, store, route, router}) {
    let data = {
      page: Number(route.query.page) || 1,
      sort: route.query.sort ? route.query.sort : 'popular',
      guest: Number(route.query.guest) || 1,
      checkin: route.query.checkInDate,
      checkout: route.query.checkOutDate,
    }
    let splitSlug = params.slug.split('-')

    data.slugs = [{
      value: splitSlug[1],
      type: splitSlug[0]
    }]
    return SearchServices.searchResults(data).then(res => {
      store.dispatch('modules/requestData/SET_REQUEST_DATA', data)
      store.dispatch('modules/search/SET_SEARCH_RESULTS', res.data)
      store.dispatch('modules/filters/SET_FILTERS', res.data.filters.filters)
      store.dispatch('modules/filters/SET_HISTOGRAM_PRICES', res.data.histogram_prices.prices)

      return {
        results: res.data.data
      }
    }).catch(err => {
    })
  },
  computed: {
    ...mapGetters({
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`,
    }),
  },
  methods: {
    ...mapActions({
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
    }),

    test() {
      let routeQueries = this.$route.query;
      let filterTypes = this.filterTypes;

      filterTypes.forEach((filterType, filterTypeIndex) => {
        if (filterType.type === "price_range") {
          if (routeQueries.min_price) {
            this.rangeSliderFrom = this.$route.query.min_price;
            this.data.min_price = parseInt(routeQueries.min_price);
          }
          if (routeQueries.max_price) {
            this.rangeSliderTo = this.$route.query.max_price;
            this.data.max_price = parseInt(routeQueries.max_price);
          } else if (filterType.type === "counter") {
            // if (filterType.slug in routeQueries) {
            //   alert(filterType.slug)
            //   alert(routeQueries[filterType.slug])
            // }
            for (let [routeQueryKey, routeQueryValue] of Object.entries(
              routeQueries
            )) {
              if (routeQueryKey.includes(filterType.slug)) {
                this.data[filterType.slug] = routeQueryValue
                  ? parseInt(routeQueryValue)
                  : 0
              }
            }
          }else if (filterTypes[filterTypeIndex].type === "list_counter") {
            let filterListCounterItems = []

            for (let [routeQueryKey, routeQueryValue] of Object.entries(
              routeQueries
            )) {
              if (routeQueryKey.includes(filterType.slug)) {
                let routeQueryId = parseInt(
                  routeQueryKey.substring(
                    filterType.slug.length + 1,
                    routeQueryKey.length - 1
                  )
                );
                if (routeQueryValue) {
                  filterListCounterItems.push({
                    id: routeQueryId,
                    count: parseInt(routeQueryValue),
                  });
                }

              }
            }
            if (filterListCounterItems.length > 0) {
              this.data[filterType.slug] = filterListCounterItems;
            }
          }else if (filterTypes[filterTypeIndex].type === "switch") {
            for (let [routeQueryKey, routeQueryValue] of Object.entries(
              routeQueries
            )) {
              if (routeQueryKey.includes(filterType.slug)) {
                this.data[filterType.slug] = routeQueryValue === "true";
              }
            }
          }else if (
            filterTypes[filterTypeIndex].type === "list" ||
            filterTypes[filterTypeIndex].type === "list_checkbox"
          ) {
            let filterCheckBoxItems = [];
            for (let [routeQueryKey, routeQueryValue] of Object.entries(
              routeQueries
            )) {
              if (routeQueryKey.includes(filterType.slug)) {
                if (routeQueryValue) {
                  filterCheckBoxItems.push(parseInt(routeQueryValue));
                }
              }
            }
            if (filterCheckBoxItems.length > 0) {
              this.data[filterType.slug] = filterCheckBoxItems;
            }
          }
        }
      })
    }
  },
};
