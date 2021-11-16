import { mapActions, mapGetters } from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services";

export default {
  props: {
    filter: {
      type: Object,
      default() {
        return {}
      }
    },
    filterIndex: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      appliedFilter: `modules/filters/${types.filters.getters.GET_APPLIED_FILTER}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`
    })
  },
  methods: {
    ...mapActions({
      setAppliedFilter: `modules/filters/${types.filters.actions.SET_APPLIED_FILTER}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
      setUpdateFilterDefault: `modules/filters/${types.filters.actions.SET_UPDATE_FILTER_DEFAULT}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setHistogramPrices: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`,
      setUpdateAppliedFilter: `modules/filters/${types.filters.actions.SET_UPDATE_APPLIED_FILTER}`
    }),
    filterSwitch(filter, filterIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      let value = filter.default;
      value = !value
      //change default value
      this.setUpdateFilterDefault({
        default: value,
        filterIndex: this.filterIndex
      });

      let appliedFilters = [...this.appliedFilter];
      let data = {...this.getRequestData};
      let appliedFilterIndex = appliedFilters.findIndex(
        appliedFilter => appliedFilter.slug === filter.slug
      );
      let currentFilter = {
        type: filter.type,
        slug: filter.slug,
        name: filter.name,
        value: value,
        filterIndex: this.filterIndex
      };
      if(value) {
        //set in req data
        data[filter.slug] = value;
        this.setRequestData(data);

        //push in query
        this.$router.push({
          query: {...this.$route.query, [filter.slug]: value}
        });

        //add in applied filter
        this.setUpdateAppliedFilter({
          index: appliedFilters.length,
          value: currentFilter
        });
      } else {
        //delete from req data
        delete data[filter.slug];
        this.setRequestData(data);

        //remove form url query
        this.$router.push({
          query: { ...this.$route.query, [filter.slug]: undefined },
        });

        //remove from applied filter
        appliedFilters.splice(appliedFilterIndex, 1);
        this.setAppliedFilter(appliedFilters);
      }

      return SearchServices.searchResults(data).then((res) => {
        this.setSearchResult(res.data);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
  }
}
