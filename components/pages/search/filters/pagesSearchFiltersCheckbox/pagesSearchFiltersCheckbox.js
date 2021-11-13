import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";

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
      setUpdateAppliedFilter: `modules/filters/${types.filters.actions.SET_UPDATE_APPLIED_FILTER}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
      setUpdateFilterDefault: `modules/filters/${types.filters.actions.SET_UPDATE_FILTER_DEFAULT}`,
    }),
    filterCheckBox(filter, filterChild, filterChildIndex) {
      // setTimeout(() => {
      //   this.$nuxt.$loading.start();
      // }, 1);
      let value = !filterChild.default;
      // change default value
      let type = this.filterParent ? this.filterParent.type : filter.type
      let slug = this.filterParent ? this.filterParent.slug : filter.slug



      let data = {...this.getRequestData}

      console.log('value jjjjjj', value)

      if (!value) {
        this.setUpdateFilterDefault({
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
        delete data[`${slug}[${filterChild.id}]`]
        this.setRequestData(data)
      } else {
        this.setUpdateFilterDefault({
          default: true,
          filterIndex: this.filterParentIndex ? this.filterParentIndex : this.filterIndex,
          childIndexInFilters: this.filterParentIndex ? this.filterIndex : filterChildIndex,
          childItemIndexInFilters: this.filterParentIndex ? filterChildIndex : null,
        })
        // if the value is true so the item should be add in array for adding to data

        // set in applied filter
        let appliedFilters = [...this.appliedFilter]
        let appliedFilterIndex = appliedFilters.findIndex(appliedFilter => appliedFilter.slug === filter.slug)
        this.setUpdateAppliedFilter(
          {
            index: appliedFilterIndex,
            value: {
              type: type,
              slug: slug,
              id: filterChild.id,
              name: filterChild.name,
              value: filterChild.default,
              filterIndex: this.filterParentIndex ? this.filterParentIndex : this.filterIndex,
              childIndexInFilters: this.filterParentIndex ? this.filterIndex : filterChildIndex,
              childItemIndexInFilters: this.filterParentIndex ? filterChildIndex : null,
            }
          })

        // push in query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${slug}[${filterChild.id}]`]: filterChild.id,
          },
        });

        // set in req data
        data[`${slug}[${filterChild.id}]`] = filterChild.id
        this.setRequestData(data)
      }

      // return SearchServices.searchResults(this.data).then((res) => {
      //   if (checkBoxItem.default) {
      //     this.$router.push({
      //       query: {
      //         ...this.$route.query,
      //         [`${filter.slug}[${checkBoxItem.id}]`]: checkBoxItem.id,
      //       },
      //     });
      //   }
      //
      //   // add this filter to applied filter
      //   let appliedFilterExist;
      //   this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
      //     if (
      //       appliedFilter.slug === filter.slug &&
      //       appliedFilter.id === checkBoxItem.id
      //     ) {
      //       // appliedFilterExist = true;
      //       // checkBoxItem.default
      //       //   ? (this.appliedFilterList[appliedFilterIndex].value =
      //       //     checkBoxItem.default
      //       //   : this.clearFilter(appliedFilter, appliedFilterIndex);
      //     }
      //   });
      //   if (!appliedFilterExist && checkBoxItem.default) {
      //     if (filter.type === "list") {
      //       this.appliedFilterList.push({
      //         type: filter.type,
      //         slug: filter.slug,
      //         id: checkBoxItem.id,
      //         name: checkBoxItem.name,
      //         value: checkBoxItem.default,
      //         indexInFilterPanelSettings: this.filterIndex,
      //         childIndexInFilterPanelSettings:
      //         filterChildIndexObject.filterChildIndex,
      //         childItemIndexInFilterPanelSettings:
      //         filterChildIndexObject.filterChildItemIndex
      //       });
      //     } else {
      //       this.appliedFilterList.push({
      //         type: filter.type,
      //         slug: filter.slug,
      //         id: checkBoxItem.id,
      //         name: checkBoxItem.name,
      //         value: checkBoxItem.default,
      //         indexInFilterPanelSettings: this.filterIndex,
      //         childIndexInFilterPanelSettings:
      //         filterChildIndexObject.filterChildIndex
      //       });
      //     }
      //   }
      //
      //   this.setSearchResult(res.data);
      //   this.setFilters(res.data.filters.filters);
      //   this.setHistogramPrices(res.data.histogram_prices.prices);
      //   this.$nuxt.$loading.finish();
      // });
    },
  }

}
