import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services";
import {indexOf} from "core-js/internals/array-includes";

export default {
  layout: "search",
  name: 'slugPage',
  middleware: 'checkToken',
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
    }
    if (route.query.checkin) {
      data.checkin = route.query.checkin
    }
    if (route.query.checkout) {
      data.checkout = route.query.checkout
    }
    let splitSlug = params.slug.split('-')

    data.slugs = [{
      value: splitSlug[1],
      type: splitSlug[0]
    }]

    for (let [routeQueryKey, routeQueryValue] of Object.entries(route.query)) {
      if (routeQueryKey.match('\\[(.*?)\\]')) {
        data[routeQueryKey.split('[')[0]] = {
          ...data[routeQueryKey.split('[')[0]],
          [routeQueryKey.match('\\[(.*?)\\]')[1]]: +routeQueryValue
        }
      } else {
        if (routeQueryValue) {
          if (routeQueryValue === 'true') {
            data[routeQueryKey] = true
          } else if (typeof routeQueryValue !== 'string') {
            data[routeQueryKey] = +routeQueryValue
          }
        }
      }
    }
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
  mounted() {
    this.test()
  },
  methods: {
    ...mapActions({
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
    }),

    test() {
      let data = {}
      for (let [routeQueryKey, routeQueryValue] of Object.entries(this.$route.query)) {
        if (routeQueryKey.match('\\[(.*?)\\]')) {
          data[routeQueryKey.split('[')[0]] = {
            ...data[routeQueryKey.split('[')[0]],
            [routeQueryKey.match('\\[(.*?)\\]')[1]]: +routeQueryValue
          }
        } else {
          if (routeQueryValue) {
            if (routeQueryValue === 'true') {
              data[routeQueryKey] = true
            } else {
              data[routeQueryKey] = +routeQueryValue
            }
          }
        }
      }
    }
  },
};
