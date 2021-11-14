import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services"

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
    },
    filterParent: {
      type: Object,
      default: null
    },
    filterParentIndex: {
      type: Number,
      default: null
    }

  },
  data() {
    return {
      expand: 0
    }
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      appliedFilter: `modules/filters/${types.filters.getters.GET_APPLIED_FILTER}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`,
    }),
  },
  methods: {
    ...mapActions({
      setAppliedFilter: `modules/filters/${types.filters.actions.SET_APPLIED_FILTER}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
      setUpdateCheckboxFilterDefault: `modules/filters/${types.filters.actions.SET_UPDATE_FILTER_CHECKBOX_DEFAULT}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setHistogramPrices: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`
    }),
    filterCheckBox(filter, filterChild, filterChildIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      let appliedFilters = [...this.appliedFilter]
      let value = !filterChild.default;
      // change default value
      let type = this.filterParent ? this.filterParent.type : filter.type
      let slug = this.filterParent ? this.filterParent.slug : filter.slug

      let data = {...this.getRequestData}
      if (!value) {
        this.setUpdateCheckboxFilterDefault({
          default: false,
          filterIndex: this.filterParentIndex ? this.filterParentIndex : this.filterIndex,
          childIndexInFilters: this.filterParentIndex ? this.filterIndex : filterChildIndex,
          childItemIndexInFilters: this.filterParentIndex ? filterChildIndex : null,
        })
        // remove form query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${slug}[${filterChild.id}]`]: undefined,
          },
        });
        // delete form requestData

        delete data[slug][filterChild.id]
        if(Object.entries( data[slug]).length ===0) {
           delete data[slug]
        }
        this.setRequestData(data)

        //remove from applied filter
        let appliedFilterIndex = appliedFilters.findIndex(appliedFilter => appliedFilter.slug === filter.slug)
        appliedFilters.splice(appliedFilterIndex, 1);
        this.setAppliedFilter(appliedFilters)
      } else {
        // if the value is true so the item should be add in array for adding to data
        this.setUpdateCheckboxFilterDefault({
          default: true,
          filterIndex: this.filterParentIndex ? this.filterParentIndex : this.filterIndex,
          childIndexInFilters: this.filterParentIndex ? this.filterIndex : filterChildIndex,
          childItemIndexInFilters: this.filterParentIndex ? filterChildIndex : null,
        })

        // set in applied filter
        appliedFilters.push({
          type: type,
          slug: slug,
          id: filterChild.id,
          name: filterChild.name,
          value: filterChild.default,
          filterIndex: this.filterParentIndex ? this.filterParentIndex : this.filterIndex,
          childIndexInFilters: this.filterParentIndex ? this.filterIndex : filterChildIndex,
          childItemIndexInFilters: this.filterParentIndex ? filterChildIndex : null
        })
        this.setAppliedFilter(appliedFilters)

        // push in query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${slug}[${filterChild.id}]`]: filterChild.id,
          },
        });

        // set in req data
        // data[`${slug}[${filterChild.id}]`] = filterChild.id
        data[slug] = {...data[slug]}
        data[slug][filterChild.id] = filterChild.id
        this.setRequestData(data)
      }
      return SearchServices.searchResults(data)
        .then((res) => {
          this.$nuxt.$loading.finish();
          this.setSearchResult(res.data);
          this.setHistogramPrices(res.data.histogram_prices.prices);

        })
        .catch(err => {

        })
    },
  }

}
