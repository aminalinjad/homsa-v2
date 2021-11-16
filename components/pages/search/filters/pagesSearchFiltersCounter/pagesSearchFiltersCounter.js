import MinusIcon from "@/assets/AppIcons/minus.vue";
import AddIcon from "@/assets/AppIcons/add.vue";
import {mapActions, mapGetters} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services";

export default {
  props: {
    filter: {
      type: Object,
      default() {
        return {};
      }
    },
    filterIndex: {
      type: Number
    }
  },
  components: {
    MinusIcon,
    AddIcon
  },
  data() {
    return {
      expand: 0
    };
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
    minusIconColorForCounterFilter(filterValue) {
      return filterValue === 0
        ? this.$vuetify.theme.themes.light.secondary
        : this.$vuetify.theme.themes.light.greenDark8;
    },
    minusIconColor(filterValue) {
      return filterValue === 0
        ? this.$vuetify.theme.themes.light.secondary
        : this.$vuetify.theme.themes.light.greenDark8;
    },
    addCounter(filter, filterIndex) {
      let value = filter.default;
      value += 1;
      //change default value
      this.setUpdateFilterDefault({
        default: value,
        filterIndex: this.filterIndex
      });
      this.filterCounter(filter, value, filterIndex);
    },
    minusCounter(filter, filterIndex) {
      let value = filter.default;
      if (value > 0) {
        value -= 1;
        //change default value
        this.setUpdateFilterDefault({
          default: value,
          filterIndex: this.filterIndex
        });
        this.filterCounter(filter, value, filterIndex);
      }
    },
    filterCounter(filter, count, filterIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      let appliedFilters = [...this.appliedFilter];
      let data = {...this.getRequestData};
      let currentFilter = {
        type: filter.type,
        slug: filter.slug,
        count: count,
        name: filter.name,
        filterIndex: this.filterIndex
      };

      if (count > 0) {
        //set in req data
        data[filter.slug] = count;
        this.setRequestData(data);

        //push in query
        this.$router.push({
          query: {...this.$route.query, [filter.slug]: count}
        });

        // add in applied filter
        let appliedFilterIndex = appliedFilters.findIndex(
          appliedFilter => appliedFilter.slug === filter.slug
        );
        // this.setAppliedFilter(appliedFilters);
        if (appliedFilterIndex >= 0) {
          this.setUpdateAppliedFilter({
            index: appliedFilterIndex,
            value: currentFilter
          });
        } else {
          // set in applied filter
          // appliedFilters.push(currentFilter)
          // this.setAppliedFilter(appliedFilters)
          this.setUpdateAppliedFilter({
            index: appliedFilters.length,
            value: currentFilter
          });
        }
      } else {
        //delete from req data
        delete data[filter.slug];
        this.setRequestData(data);

        //remove form query
        this.$router.push({
          query: {...this.$route.query, [filter.slug]: undefined}
        });

        //remove from applied filter
        let appliedFilterIndex = appliedFilters.findIndex(
          appliedFilter => appliedFilter.slug === filter.slug
        );
        appliedFilters.splice(appliedFilterIndex, 1);
        this.setAppliedFilter(appliedFilters);
      }

      return SearchServices.searchResults(data).then(res => {
        this.setSearchResult(res.data);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    addCounterList(filter, filterIndex, item, itemIndex) {
      let value = item.default;
      value += 1;
      //change default value
      this.setUpdateFilterDefault({
        default: value,
        filterIndex: this.filterIndex,
        itemIndex: itemIndex
      });
      this.filterCounterList(filter, item, value, filterIndex, itemIndex);
    },
    minusCounterList(filter, filterIndex, item, itemIndex) {
      let value = item.default;
      if (value > 0) {
        value -= 1;
        //change default value
        this.setUpdateFilterDefault({
          default: value,
          filterIndex: this.filterIndex,
          itemIndex: itemIndex
        });
        this.filterCounterList(filter, item, value, filterIndex, itemIndex);
      }
    },
    filterCounterList(filter, item, itemCount, filterIndex, itemIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      let appliedFilters = [...this.appliedFilter];
      let data = {...this.getRequestData};
      let currentFilter = {
        type: filter.type,
        slug: filter.slug,
        id: item.id,
        count: itemCount,
        name: item.name,
        filterIndex: this.filterIndex,
        itemIndex: itemIndex
      };

      if (itemCount > 0) {
        // set in req data
        data[filter.slug] = {...data[filter.slug]};
        data[filter.slug][item.id] = itemCount;
        this.setRequestData(data);

        //push in route query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${filter.slug}[${item.id}]`]: itemCount
          }
        });

        // set in applied filter
        let appliedFilterIndex = appliedFilters.findIndex(
          appliedFilter => appliedFilter.slug === filter.slug && appliedFilter.id === item.id
        );
        if (appliedFilterIndex >= 0) {
          this.setUpdateAppliedFilter({
            index: appliedFilterIndex,
            value: currentFilter
          });
        } else {
          this.setUpdateAppliedFilter({
            index: appliedFilters.length,
            value: currentFilter
          });
        }
      } else {
        // delete form requestData
        delete data[filter.slug][item.id]
        if (Object.entries(data[filter.slug]).length === 0) {
          delete data[filter.slug]
        }
        this.setRequestData(data)
        //remove from route query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${filter.slug}[${item.id}]`]: undefined
          }
        });

        //remove from applied filter
        let appliedFilterIndex = appliedFilters.findIndex(
          appliedFilter => appliedFilter.slug === filter.slug && appliedFilter.id === item.id
        );
        appliedFilters.splice(appliedFilterIndex, 1);
        this.setAppliedFilter(appliedFilters);
      }
      return SearchServices.searchResults(data).then((res) => {
        this.setSearchResult(res.data);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    }
  }
};
