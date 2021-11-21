import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services";

export default {
  layout: "search",
  name: 'searchPage',
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
  asyncData({params, app, store, route}) {
    let data = {
      q: route.query.q,
      page: Number(route.query.page) || 1,
      sort: route.query.sort ? route.query.sort : 'popular',
      guest: Number(route.query.guest) || 1,
      checkin: route.query.checkInDate,
      checkout: route.query.checkOutDate,
    }
    return SearchServices.searchResults(data).then(res => {
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
}
