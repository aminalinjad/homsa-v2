import {mapActions} from "vuex";

export default {
  props: {
    filter: {
      type: Object,
      default() {
        return{}
      }
    },
    filterIndex: {
      type: Number
    }
  },
  data() {
    return {
      expand: 0
    }
  },
  methods: {
    ...mapActions({
      setAppliedFilter: `modules/filters/${types.filters.actions.SET_APPLIED_FILTER}`,
      setUpdateAppliedFilter: `modules/filters/${types.filters.actions.SET_UPDATE_APPLIED_FILTER}`
    }),
    filterCheckBox(
      filter,
      checkBoxItem,
      filterChildIndexObject
    ) {
      // setTimeout(() => {
      //   this.$nuxt.$loading.start();
      // }, 1);

      if (!checkBoxItem.default) {
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${filter.slug}[${checkBoxItem.id}]`]: undefined,
          },
        });
        this.data[filter.slug].splice(
          this.data[filter.slug].indexOf(checkBoxItem.id),
          1
        );
      } else {
        // if the value is true so the item should be add in array for adding to data
        this.setUpdateAppliedFilter({index: appliedFilterIndex, value: {
            slug: filter.slug,
            minPrice: minPrice,
            maxPrice: maxPrice,
            filterIndex: this.filterIndex
          }})
      }

      return SearchServices.searchResults(this.data).then((res) => {
        if (checkBoxItem.default) {
          this.$router.push({
            query: {
              ...this.$route.query,
              [`${filter.slug}[${checkBoxItem.id}]`]: checkBoxItem.id,
            },
          });
        }

        // add this filter to applied filter
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (
            appliedFilter.slug === filter.slug &&
            appliedFilter.id === checkBoxItem.id
          ) {
            // appliedFilterExist = true;
            // checkBoxItem.default
            //   ? (this.appliedFilterList[appliedFilterIndex].value =
            //     checkBoxItem.default
            //   : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist && checkBoxItem.default) {
          if (filter.type === "list") {
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              id: checkBoxItem.id,
              name: checkBoxItem.name,
              value: checkBoxItem.default,
              indexInFilterPanelSettings: this.filterIndex,
              childIndexInFilterPanelSettings:
              filterChildIndexObject.filterChildIndex,
              childItemIndexInFilterPanelSettings:
              filterChildIndexObject.filterChildItemIndex
            });
          } else {
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              id: checkBoxItem.id,
              name: checkBoxItem.name,
              value: checkBoxItem.default,
              indexInFilterPanelSettings: this.filterIndex,
              childIndexInFilterPanelSettings:
              filterChildIndexObject.filterChildIndex
            });
          }
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
  }

}
