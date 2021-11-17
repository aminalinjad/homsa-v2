import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services";
import MinusIcon from "@/assets/AppIcons/minus.vue";
import AddIcon from "@/assets/AppIcons/add.vue";

export default {
  components: {
    MinusIcon,
    AddIcon,
  },
  data() {
    return {
      resetPriceValue: false,
    };
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      appliedFilters: `modules/filters/${types.filters.getters.GET_APPLIED_FILTER}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`
    }),
  },
  mounted() {
    if (this.appliedFilters.length === 0) this.setFilterValueFromQueries();
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

    setFilterValueFromQueries() {
      let appliedFilters = [...this.appliedFilters]
      let currentFilter ={}

      for (let [routeQueryKey, routeQueryValue] of Object.entries(this.$route.query)) {
        this.filters.forEach((filter, filterIndex) => {
          if (routeQueryKey.match('\\[(.*?)\\]') && filter.children) {
            if (routeQueryKey.includes(filter.slug)) {
              // set in default filter value
              if(filter.type === 'list') {
                // search in children of this filter to find index of a child that it`s id is equal
                let childIndex = null;
                let childItemIndex = null;
                filter.children.forEach(
                  (child, index) => {
                    child.children.forEach((childItem, i) => {
                      if (childItem.id === +[routeQueryKey.match('\\[(.*?)\\]')[1]]) {
                        childIndex = index;
                        childItemIndex = i;

                        currentFilter = {
                          type: filter.type,
                          slug: filter.slug,
                          id: childItem.id,
                          name: childItem.name,
                          value: true,
                          filterIndex: filterIndex,
                          childIndexInFilters: index,
                          childItemIndexInFilters: i
                        }
                      }
                    });
                  }
                );

                setTimeout(() => {
                  this.setUpdateCheckboxFilterDefault({
                    default: true,
                    filterIndex: filterIndex,
                    childIndexInFilters: childIndex,
                    childItemIndexInFilters: childItemIndex,
                  })
                }, 1)

                //push in applied filter
                let appliedFilters = [...this.appliedFilters]
                this.setUpdateAppliedFilter({
                  index: appliedFilters.length,
                  value: currentFilter
                });
              } else if (filter.type === 'list_checkbox') {
                let childIndex;

                filter.children.forEach((child, index) => {
                  if(child.id === +[routeQueryKey.match('\\[(.*?)\\]')[1]] ) {
                    childIndex = index
                    currentFilter= {
                      type: filter.type,
                      slug: filter.slug,
                      id: child.id,
                      name: child.name,
                      value: true,
                      filterIndex: filterIndex,
                      childIndexInFilters: index,
                      childItemIndexInFilters: null
                    }
                  }
                })

                setTimeout(() => {
                  this.setUpdateCheckboxFilterDefault({
                    default: true,
                    filterIndex: filterIndex,
                    childIndexInFilters: childIndex,
                    childItemIndexInFilters: null,
                  })
                }, 1)

                //push in applied filter
                let appliedFilters = [...this.appliedFilters]
                this.setUpdateAppliedFilter({
                  index: appliedFilters.length,
                  value: currentFilter
                });
              } else {
                let childIndex;

                filter.children.forEach((child, index) => {
                  if(child.id === +[routeQueryKey.match('\\[(.*?)\\]')[1]] ) {
                    childIndex = index
                    currentFilter= {
                      type: filter.type,
                      slug: filter.slug,
                      id: child.id,
                      count: +routeQueryValue,
                      name: child.name,
                      filterIndex: filterIndex,
                      itemIndex: index
                    }
                  }
                })
                //push in applied filter
                let appliedFilters = [...this.appliedFilters]
                this.setUpdateAppliedFilter({
                  index: appliedFilters.length,
                  value: currentFilter
                });
                setTimeout(() => {
                  this.setUpdateFilterDefault({
                    default: +routeQueryValue,
                    filterIndex: filterIndex,
                    itemIndex: childIndex
                  });
                } , 1)
              }

            }
          }
          else {
            if (routeQueryValue) {
              // push it in appliedFilter Array
              // this.filters.forEach((filter, filterIndex) => {
              if (filter.slug === 'price_range' && routeQueryKey === 'min_price') {
                if (this.$route.query.min_price && this.$route.query.max_price) {
                  let currentFilter = {
                    slug: filter.slug,
                    minPrice: this.$route.query.min_price,
                    maxPrice: this.$route.query.max_price,
                    filterIndex: filterIndex
                  }

                  let appliedFilters = [...this.appliedFilters]
                  appliedFilters.push(currentFilter)
                  this.setAppliedFilter(appliedFilters)
                }
              } else if (filter.slug === routeQueryKey) {
                //push in applied filter
                let appliedFilters = [...this.appliedFilters]

                let currentFilter = {
                  type: filter.type,
                  slug: filter.slug,
                  name: filter.name,
                  filterIndex: filterIndex
                };
                if (filter.type === 'counter') {
                  currentFilter.count = routeQueryValue
                  //set in default filter value
                  this.setUpdateFilterDefault({
                    default: +routeQueryValue,
                    filterIndex: filterIndex
                  });
                } else {
                  currentFilter.value = routeQueryValue
                  //set in default filter value
                  setTimeout(() => {
                    //using set timeout is necessary couse default value of filter doesnt overwrite this change
                    this.setUpdateFilterDefault({
                      default: true,
                      filterIndex: filterIndex
                    });
                  }, 1)

                }

                this.setUpdateAppliedFilter({
                  index: appliedFilters.length,
                  value: currentFilter
                });

              }
            }
          }
        })
      }
      // push it in appliedFilter Array

      //set default value
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

    clearAllFilter() {
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

      // // clear all appliedFilter
      this.setAppliedFilter([])

      // reset min and max price values by changing props
      this.resetPriceValue = !this.resetPriceValue

      return SearchServices.searchResults(staticData).then((res) => {
        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
  },
};
