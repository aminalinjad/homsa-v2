import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services";
import MinusIcon from "@/assets/AppIcons/minus.vue";
import AddIcon from "@/assets/AppIcons/add.vue";

export default {
  props: {},
  components: {
    MinusIcon,
    AddIcon,
  },
  data() {
    return {
      appliedFilterList: [],
      filterPanelSettings: [],
      filterTypes: [],
      data: {
        q: "tehran",
        page: 1,
        sort: "popular",
      },
      resetPriceValue: false,
      histogramSectionWidth: null,
      rangeBtnDisable: true,
    };
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      appliedFilters: `modules/filters/${types.filters.getters.GET_APPLIED_FILTER}`,
      histogramPrices: `modules/filters/${types.filters.getters.GET_HISTOGRAM_PRICES}`,
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`
    }),
    histogramData() {
      let filterHistogramPrices = this.histogramPrices;
      let histogramData = [];

      filterHistogramPrices.forEach(
        (histogramPriceObject, histogramPriceIndex) => {
          for (
            let priceCount = 0;
            priceCount < histogramPriceObject.doc_count;
            priceCount++
          ) {
            histogramData.push(histogramPriceObject.key);
          }
        }
      );
      return histogramData;
    }
  },
  mounted() {
    // this.setDataFromUrlQueries();
    window.addEventListener("resize", this.checkSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkSize);
  },
  methods: {
    submitFilter(data, index) {
      console.log(data)
      console.log(index)
    },
    componentName(filterType) {
      switch (filterType) {
        case 'price_range':
          return 'pagesSearchFiltersPrice'
        case 'counter':
        case 'list_counter':
          return 'pagesSearchFiltersCounter';
        case 'switch':
          return 'pagesSearchFiltersSwitch';
        case 'list_checkbox':
          return 'pagesSearchFiltersCheckbox';
        case 'list':
          return 'pagesSearchFiltersCheckboxGroup';
      }
    },

    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
      setHistogramPrices: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`,
      setAppliedFilter: `modules/filters/${types.filters.actions.SET_APPLIED_FILTER}`,
      setUpdateCounterFilterDefault: `modules/filters/${types.filters.actions.SET_UPDATE_FILTER_COUNTER_DEFAULT}`,
      setUpdateCheckboxFilterDefault: `modules/filters/${types.filters.actions.SET_UPDATE_FILTER_CHECKBOX_DEFAULT}`,
    }),
    minusIconColorForCounterFilter(filterIndex) {
      return this.filterPanelSettings[filterIndex].count === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },
    minusIconColor(filterIndex, index) {
      return this.filterPanelSettings[filterIndex].ItemCounts[index].count === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },

    setDataFromUrlQueries() {
      let routeQueries = this.$route.query;

      this.filterTypes.forEach((filterType, filterTypeIndex) => {
        if (filterType.type === "price_range") {
          if (routeQueries.min_price && routeQueries.max_price) {
            this.rangeSliderFrom = this.$route.query.min_price;
            this.data.min_price = parseInt(routeQueries.min_price);

            this.rangeSliderTo = this.$route.query.max_price;
            this.data.max_price = parseInt(routeQueries.max_price);
          }

          // push it in appliedFilterList Array
          let filterIndex = this.filters
            .map(filter => {
              return filter.slug;
            })
            .indexOf(filterType.slug);
          let appliedFilterExist;
          this.appliedFilterList.forEach(
            (appliedFilter, appliedFilterIndex) => {
              if (appliedFilter.slug === this.filters[filterIndex].slug) {
                appliedFilterExist = true;
              }
            }
          );
          if (!appliedFilterExist && routeQueries.min_price && routeQueries.max_price) {
            this.appliedFilterList.push({
              type: this.filters[filterIndex].type,
              slug: this.filters[filterIndex].slug,
              minPrice: routeQueries.min_price,
              maxPrice: routeQueries.max_price,
              indexInFilterPanelSettings: filterIndex,
            });
          }
        } else if (filterType.type === "counter") {
          for (let [routeQueryKey, routeQueryValue] of Object.entries(
            routeQueries
          )) {
            if (routeQueryKey.includes(filterType.slug)) {
              this.data[filterType.slug] = routeQueryValue
                ? parseInt(routeQueryValue)
                : 0;

              // push it in appliedFilterList Array
              let filterIndex = this.filters
                .map(filter => {
                  return filter.slug;
                })
                .indexOf(filterType.slug);
              let appliedFilterExist;
              this.appliedFilterList.forEach(
                (appliedFilter, appliedFilterIndex) => {
                  if (appliedFilter.slug === this.filters[filterIndex].slug) {
                    appliedFilterExist = true;
                    parseInt(routeQueryValue) > 0
                      ? (this.appliedFilterList[appliedFilterIndex].count =
                        parseInt(routeQueryValue))
                      : this.clearFilter(appliedFilter, appliedFilterIndex);
                  }
                }
              );
              if (!appliedFilterExist && routeQueryValue) {
                this.appliedFilterList.push({
                  type: this.filters[filterIndex].type,
                  slug: this.filters[filterIndex].slug,
                  name: this.filters[filterIndex].name,
                  count: parseInt(routeQueryValue),
                  indexInFilterPanelSettings: filterIndex,
                });
              }
            }
          }
        } else if (this.filterTypes[filterTypeIndex].type === "list_counter") {
          let filterListCounterItems = [];
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
                this.data[filterType.slug] = {
                  [routeQueryId]: parseInt(routeQueryValue)
                };
                console.log('data', this.data[filterType.slug]);
              }


              // push it in appliedFilterList Array
              let filterIndex = this.filters
                .map(filter => {
                  return filter.slug;
                })
                .indexOf(filterType.slug);
              let appliedFilterExist;
              this.appliedFilterList.forEach(
                (appliedFilter, appliedFilterIndex) => {
                  if (
                    appliedFilter.slug === this.filters[filterIndex].slug &&
                    appliedFilter.id === routeQueryId
                  ) {
                    appliedFilterExist = true;
                    parseInt(routeQueryValue) > 0
                      ? (this.appliedFilterList[appliedFilterIndex].count =
                        parseInt(routeQueryValue))
                      : this.clearFilter(appliedFilter, appliedFilterIndex);
                  }
                }
              );
              if (!appliedFilterExist && routeQueryValue) {
                // search in children of this filter to find index of a child that it`s id is equal to routeQueryId
                let itemIndex = this.filters[filterIndex].children
                  .map(child => {
                    return child.id;
                  })
                  .indexOf(routeQueryId);

                //so I have all needed values to push them fo applied filter list
                this.appliedFilterList.push({
                  type: this.filters[filterIndex].type,
                  slug: this.filters[filterIndex].slug,
                  id: routeQueryId,
                  name: this.filters[filterIndex].children[itemIndex].name,
                  count: parseInt(routeQueryValue),
                  indexInFilterPanelSettings: filterIndex,
                  itemIndexInFilterPanelSettings: itemIndex,
                });
              }
            }
          }
          if (filterListCounterItems.length > 0) {
            this.data[filterType.slug] = filterListCounterItems;
          }
        } else if (this.filterTypes[filterTypeIndex].type === "switch") {
          for (let [routeQueryKey, routeQueryValue] of Object.entries(
            routeQueries
          )) {
            if (routeQueryKey.includes(filterType.slug)) {
              this.data[filterType.slug] = routeQueryValue === "true";

              // push it in appliedFilterList Array
              let filterIndex = this.filters
                .map(filter => {
                  return filter.slug;
                })
                .indexOf(filterType.slug);
              let appliedFilterExist;
              this.appliedFilterList.forEach(
                (appliedFilter, appliedFilterIndex) => {
                  if (appliedFilter.slug === this.filters[filterIndex].slug) {
                    appliedFilterExist = true;
                    routeQueryValue
                      ? (this.appliedFilterList[appliedFilterIndex].value =
                        routeQueryValue)
                      : this.clearFilter(appliedFilter, appliedFilterIndex);
                  }
                }
              );
              if (!appliedFilterExist && routeQueryValue) {
                this.appliedFilterList.push({
                  type: this.filters[filterIndex].type,
                  slug: this.filters[filterIndex].slug,
                  name: this.filters[filterIndex].name,
                  value: routeQueryValue,
                  indexInFilterPanelSettings: filterIndex,
                });
              }
            }
          }
        } else if (
          this.filterTypes[filterTypeIndex].type === "list" ||
          this.filterTypes[filterTypeIndex].type === "list_checkbox"
        ) {
          let filterCheckBoxItems = [];
          for (let [routeQueryKey, routeQueryValue] of Object.entries(
            routeQueries
          )) {
            if (routeQueryKey.includes(filterType.slug)) {
              if (routeQueryValue) {
                filterCheckBoxItems.push(parseInt(routeQueryValue));

                // push it in appliedFilterList Array
                let routeQueryId = parseInt(
                  routeQueryKey.substring(
                    filterType.slug.length + 1,
                    routeQueryKey.length - 1
                  )
                );

                let filterIndex = this.filters
                  .map(filter => {
                    return filter.slug;
                  })
                  .indexOf(filterType.slug);
                let appliedFilterExist;
                this.appliedFilterList.forEach(
                  (appliedFilter, appliedFilterIndex) => {
                    if (
                      appliedFilter.slug === this.filters[filterIndex].slug &&
                      appliedFilter.id === routeQueryId
                    ) {
                      appliedFilterExist = true;
                      routeQueryValue
                        ? (this.appliedFilterList[appliedFilterIndex].value =
                          routeQueryValue)
                        : this.clearFilter(appliedFilter, appliedFilterIndex);
                    }
                  }
                );
                if (!appliedFilterExist) {
                  if (this.filterTypes[filterTypeIndex].type === "list") {
                    // search in children of this filter to find index of a child that it`s id is equal to routeQueryId
                    let childIndex = null;
                    let childItemIndex = null;

                    this.filters[filterIndex].children.forEach(
                      (child, index) => {
                        child.children.forEach((childItem, i) => {
                          if (childItem.id === routeQueryId) {
                            childItemIndex = i;
                            childIndex = index;
                          }
                        });
                      }
                    );
                    //so I have all needed values to push them fo applied filter list
                    this.appliedFilterList.push({
                      type: this.filters[filterIndex].type,
                      slug: this.filters[filterIndex].slug,
                      id: routeQueryId,
                      name: this.filters[filterIndex].children[childIndex]
                        .children[childItemIndex].name,
                      value: routeQueryValue,
                      indexInFilterPanelSettings: filterIndex,
                      childIndexInFilterPanelSettings: childIndex,
                      childItemIndexInFilterPanelSettings: childItemIndex,
                    });
                  } else {
                    // search in children of this filter to find index of a child that it`s id is equal to routeQueryId
                    let childIndex = this.filters[filterIndex].children
                      .map(child => {
                        return child.id;
                      })
                      .indexOf(routeQueryId);

                    //so I have all needed values to push them fo applied filter list
                    this.appliedFilterList.push({
                      type: this.filters[filterIndex].type,
                      slug: this.filters[filterIndex].slug,
                      id: routeQueryId,
                      name: this.filters[filterIndex].children[childIndex].name,
                      value: routeQueryValue,
                      indexInFilterPanelSettings: filterIndex,
                      childIndexInFilterPanelSettings: childIndex,
                    });
                  }
                }
              }
            }
          }
          if (filterCheckBoxItems.length > 0) {
            this.data[filterType.slug] = filterCheckBoxItems;
          }
        }
      });
    },
    checkSize() {
      if (Object.entries(this.$refs.histogramParentDiv).length !== 0) {
        this.histogramWidth = this.$refs.histogramParentDiv[0].clientWidth;
      }
    },

    clearFilter(appliedFilter, appliedFilterIndex) {
      // setTimeout(() => {
      //   this.$nuxt.$loading.start();
      // }, 1);

      let appliedFilters = [...this.appliedFilters];
      let data = {...this.getRequestData};
      if (appliedFilter.minPrice) {
        // delete it from data send in api
        delete data.min_price;
        delete data.max_price;
        // reset min and max price values by changing props
        this.resetPriceValue = !this.resetPriceValue

        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            min_price: undefined,
            max_price: undefined,
          },
        });
      } else if (typeof (data[appliedFilter.slug]) === 'object') {
        // delete it from data send in api
        delete data[appliedFilter.slug][appliedFilter.id]
        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${appliedFilter.slug}[${appliedFilter.id}]`]: undefined,
          },
        });
      } else {
        // if (appliedFilter.type === "list_counter") {
        //   this.setUpdateCounterFilterDefault({
        //     default: appliedFilter.value,
        //     filterIndex: appliedFilter.filterIndex,
        //     itemIndex: appliedFilter.itemIndex
        //   });
        // } else {
        //   this.setUpdateCheckboxFilterDefault()
        // }
        // delete it from data send in api
        delete data[appliedFilter.slug]
        //remove it  from url query
        this.$router.push({
          query: {...this.$route.query, [appliedFilter.slug]: undefined},
        });
      }

      this.setRequestData(data)
      // remove it from applied filter
      appliedFilters.splice(appliedFilterIndex, 1);
      this.setAppliedFilter(appliedFilters);
      //
      // if (appliedFilter.type === "price_range") {

      // } else if (appliedFilter.type === "counter") {
      //
      //
      //   // remove it from applied filter list
      //   this.appliedFilterList.splice(appliedFilterIndex, 1);
      //
      //   // reset its value in filterpanelsetting array
      //   this.filterPanelSettings[
      //     appliedFilter.indexInFilterPanelSettings
      //     ].count = 0;
      //
      //   //remove it  from url query
      //   this.$router.push({
      //     query: {...this.$route.query, [appliedFilter.slug]: undefined},
      //   });
      // } else if (appliedFilter.type === "list_counter") {
      //   // delete it from data send in api
      //   this.data[appliedFilter.slug].forEach((itemObject, itemObjectIndex) => {
      //     if (itemObject.id === appliedFilter.id) {
      //       this.data[appliedFilter.slug].splice(itemObjectIndex, 1);
      //     }
      //   });
      //   if(this.data[appliedFilter.slug].length === 0) delete this.data[appliedFilter.slug];
      //
      //
      //   // remove it from applied filter list
      //   this.appliedFilterList.splice(appliedFilterIndex, 1);
      //
      //   // reset its value in filterpanelsetting array
      //   this.filterPanelSettings[
      //     appliedFilter.indexInFilterPanelSettings
      //     ].ItemCounts[appliedFilter.itemIndexInFilterPanelSettings].count = 0;
      //
      //   //remove it  from url query
      //   this.$router.push({
      //     query: {
      //       ...this.$route.query,
      //       [`${appliedFilter.slug}[${appliedFilter.id}]`]: undefined,
      //     },
      //   });
      // } else if (appliedFilter.type === "switch") {
      //   // delete it from data send in api
      //   delete this.data[appliedFilter.slug];
      //
      //   // remove it from applied filter list
      //   this.appliedFilterList.splice(appliedFilterIndex, 1);
      //
      //   // reset its value in filterpanelsetting array
      //   this.filterPanelSettings[
      //     appliedFilter.indexInFilterPanelSettings
      //     ].value = false;
      //
      //   //remove it from url query
      //   this.$router.push({
      //     query: { ...this.$route.query, [appliedFilter.slug]: undefined },
      //   });
      // } else if (
      //   appliedFilter.type === "list_checkbox" ||
      //   appliedFilter.type === "list"
      // ) {
      //   // delete it from data send in api
      //   this.data[appliedFilter.slug].forEach((item, itemIndex) => {
      //     if (item === appliedFilter.id) {
      //       this.data[appliedFilter.slug].splice(itemIndex, 1);
      //     }
      //   });
      //   if(this.data[appliedFilter.slug].length === 0) delete this.data[appliedFilter.slug];
      //
      //   // remove it from applied filter list
      //   this.appliedFilterList.splice(appliedFilterIndex, 1);
      //
      //   // reset its value in filterpanelsetting array
      //   if (appliedFilter.type === "list_checkbox") {
      //     this.filterPanelSettings[
      //       appliedFilter.indexInFilterPanelSettings
      //       ].listCheckBoxValues[
      //       appliedFilter.childIndexInFilterPanelSettings
      //       ].value = false;
      //   } else {
      //     this.filterPanelSettings[appliedFilter.indexInFilterPanelSettings][
      //       appliedFilter.childIndexInFilterPanelSettings
      //       ].listCheckBoxValues[
      //       appliedFilter.childItemIndexInFilterPanelSettings
      //       ].value = false;
      //   }
      //
      //   //remove it  from url query
      //   this.$router.push({
      //     query: {
      //       ...this.$route.query,
      //       [`${appliedFilter.slug}[${appliedFilter.id}]`]: undefined,
      //     },
      //   });
      // }
      //
      // return SearchServices.searchResults(this.data).then((res) => {
      //   this.setSearchResult(res.data);
      //   this.setFilters(res.data.filters.filters);
      //   this.setHistogramPrices(res.data.histogram_prices.prices);
      //   this.$nuxt.$loading.finish();
      // });
    },
    clearAllFilter(appliedFilterList) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      const routeQueries = Object.assign({}, this.$route.query);

      // clear add applied filter from data
      appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
        if (appliedFilter.slug === "price_range") {
          delete this.data.min_price;
          delete this.data.max_price;

          // reset its values
          this.rangeSliderFrom = null;
          this.rangeSliderTo = null;
        } else {
          delete this.data[appliedFilter.slug];

          // reset its values
          if (appliedFilter.type === "counter") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
              ].count = 0;
          } else if (appliedFilter.type === "list_counter") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
              ].ItemCounts[
              appliedFilter.itemIndexInFilterPanelSettings
              ].count = 0;
          } else if (appliedFilter.type === "switch") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
              ].value = false;
          } else if (appliedFilter.type === "list_checkbox") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
              ].listCheckBoxValues[
              appliedFilter.childIndexInFilterPanelSettings
              ].value = false;
          } else if (appliedFilter.type === "list") {
            this.filterPanelSettings[appliedFilter.indexInFilterPanelSettings][
              appliedFilter.childIndexInFilterPanelSettings
              ].listCheckBoxValues[
              appliedFilter.childItemIndexInFilterPanelSettings
              ].value = false;
          }
        }
      });

      // clear all appliedFilterList
      this.appliedFilterList = [];

      // clear all filter form query
      appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
        for (let [routeQueryKey, routeQueryValue] of Object.entries(
          routeQueries
        )) {
          if (routeQueryKey.includes(appliedFilter.slug)) {
            delete routeQueries[routeQueryKey];
          } else if (
            routeQueryKey === "min_price" ||
            routeQueryKey === "max_price"
          ) {
            delete routeQueries[routeQueryKey];
          }
        }
      });
      this.$router.push({
        query: routeQueries,
      });
      // this.$router.replace({ query: routeQueries });

      return SearchServices.searchResults(this.data).then((res) => {
        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
  },
};
