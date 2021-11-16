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
    this.setFilterValueFromQueries();
    window.addEventListener("resize", this.checkSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkSize);
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
      setHistogramPrices: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`,
      setAppliedFilter: `modules/filters/${types.filters.actions.SET_APPLIED_FILTER}`,
      setUpdateFilterDefault: `modules/filters/${types.filters.actions.SET_UPDATE_FILTER_DEFAULT}`,
      setUpdateCheckboxFilterDefault: `modules/filters/${types.filters.actions.SET_UPDATE_FILTER_CHECKBOX_DEFAULT}`,
      setUpdateAppliedFilter: `modules/filters/${types.filters.actions.SET_UPDATE_APPLIED_FILTER}`,
    }),

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

    minusIconColorForCounterFilter(filterIndex) {
      return this.filterPanelSettings[filterIndex].count === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },
    minusIconColor(filterIndex, index) {
      return this.filterPanelSettings[filterIndex].ItemCounts[index].count === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },

    setFilterValueFromQueries() {
      let appliedFilters = [...this.appliedFilters]
      let data = {...this.getRequestData}
      for (let [routeQueryKey, routeQueryValue] of Object.entries(this.$route.query)) {
        if (routeQueryKey.match('\\[(.*?)\\]')) {
          data[routeQueryKey.split('[')[0]] = {...data[routeQueryKey.split('[')[0]], [routeQueryKey.match('\\[(.*?)\\]')[1]]: +routeQueryValue}
        } else {
          if (routeQueryValue) {
            // push it in appliedFilterList Array
            this.filters.forEach((filter, filterIndex) => {
              if(filter.slug === 'price_range' && routeQueryKey === 'min_price') {
                if(this.$route.query.min_price && this.$route.query.max_price) {
                  console.log('in price')
                  let currentFilter = {
                    slug: filter.slug,
                    minPrice: this.$route.query.min_price,
                    maxPrice: this.$route.query.max_price,
                    filterIndex: filterIndex
                  }
                  appliedFilters.push(currentFilter)
                  this.setAppliedFilter(appliedFilters)
                }
              } else if (filter.slug === routeQueryKey ) {
                console.log('route query', routeQueryValue)
                let currentFilter = {
                  type: filter.type,
                  slug: filter.slug,
                  name: filter.name,
                  value: routeQueryValue,
                  count: routeQueryValue,
                  filterIndex: filterIndex
                };
                this.setUpdateAppliedFilter({
                  index: appliedFilters.length,
                  value: currentFilter
                });
              }
              })
            // if (routeQueryValue === 'true') {
            //   data[routeQueryKey] = true
            // }else {
            //   data[routeQueryKey] = +routeQueryValue
            // }
          }
        }
      }
      // push it in appliedFilterList Array

      //set default value
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
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);

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
        if (appliedFilter.type === "list_counter") {
          this.setUpdateFilterDefault({
            default: 0,
            filterIndex: appliedFilter.filterIndex,
            itemIndex: appliedFilter.itemIndex
          });
        } else {
          this.setUpdateCheckboxFilterDefault({
            default: false,
            filterIndex: appliedFilter.filterIndex,
            childIndexInFilters: appliedFilter.childIndexInFilters,
            childItemIndexInFilters: appliedFilter.childItemIndexInFilters
          })
        }
      } else {
        // delete it from data send in api
        delete data[appliedFilter.slug]
        //remove it  from url query
        this.$router.push({
          query: {...this.$route.query, [appliedFilter.slug]: undefined},
        });

        // reset default value in filters
        this.setUpdateFilterDefault({
          default: appliedFilter.type === "counter" ? 0 : false,
          filterIndex: appliedFilter.filterIndex
        });

      }

      this.setRequestData(data)
      // remove it from applied filter
      appliedFilters.splice(appliedFilterIndex, 1);
      this.setAppliedFilter(appliedFilters);

      return SearchServices.searchResults(data)
        .then((res) => {
          this.setSearchResult(res.data);
          this.setHistogramPrices(res.data.histogram_prices.prices);
          this.$nuxt.$loading.finish();
        });
    },

    clearAllFilter(appliedFilterList) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      let appliedFilters = [...this.appliedFilters];
      let requestData = {...this.requestData}

      let routeQueries = Object.assign({}, this.$route.query);
      // let routeQueries = this.$route.query

      // create a data that doesn't delete from query
      let staticData = {
        page: routeQueries.page ? routeQueries.page : 1,
        sort: routeQueries.sort ? routeQueries.sort : 'popular',
        guests: routeQueries.guests ? routeQueries.guests : 1
      }
      if (routeQueries.q) {
        staticData.q = routeQueries.q
      }
      if (routeQueries.checkin) {
        staticData.checkin = routeQueries.checkin
      }
      if (routeQueries.checkout) {
        staticData.checkout = routeQueries.checkout
      }

      // push to query
      this.$router.push({
        query: staticData,
      });

      if (this.$route.params.slug) {
        let splitSlug = this.$route.params.slug.split('-')
        staticData.slugs = [{
          value: splitSlug[1],
          type: splitSlug[0]
        }]
      }

      // set in requestData
      this.setRequestData(staticData)

      // // clear all appliedFilterList
      this.setAppliedFilter([])

      return SearchServices.searchResults(staticData).then((res) => {
        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
  },
};
