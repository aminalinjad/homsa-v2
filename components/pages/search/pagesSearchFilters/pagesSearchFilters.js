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
      histogramWidth: 272,
      appliedFilterList: [],
      filterPanelSettings: [],
      filterTypes: [],
      data: {
        q: "tehran",
        page: 1,
        sort: "popular",
      },
      rangeSliderFrom: null,
      rangeSliderTo: null,
      histogramSectionWidth: null,
      rangeBtnDisable: true,
    };
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      histogramPrices: `modules/filters/${types.filters.getters.GET_HISTOGRAM_PRICES}`,
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
    }),
    histogramHandleColor() {
      return this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.primary : this.$vuetify.theme.themes.light.primary;
    },
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
    this.$nextTick(() => {
      if (this.$route.query.min_price && this.$route.query.max_price) {
        this.$refs.histogram[0].update({ from: this.$route.query.min_price , to: this.$route.query.max_price })
      }
    })

    // it is for test
    this.manipulateFilters();

    this.filterPanelSettingsHandler();
    this.setDataFromUrlQueries();
    window.addEventListener("resize", this.checkSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkSize);
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setHistogramPrices: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`,
    }),
    minusIconColorForCounterFilter(filterIndex) {
      return this.filterPanelSettings[filterIndex].count === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },
    minusIconColor(filterIndex, index) {
      return this.filterPanelSettings[filterIndex].ItemCounts[index].count === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },
    manipulateFilters() {
      let filters = this.filters;
      let filtersLength = filters.length;

      this.filters.map(filter => {
        if(filter.type === "price_range") {
          filter.min_value = null;
          filter.max_value = null;
        } else {
          if(filter.children === null) {
            filter.value = filter.type === "counter" ? 0 : false;
          } else {
            filter.expand = 0;
            filter.children.map(filterChild => {
              if(filterChild.children === null) {
                filterChild.value = filter.type === "list_counter" ? 0 : false;
              } else {
                filterChild.expand = 0;
                filterChild.children.map(filterChildItem => {
                  filterChildItem.value = false;
                })
              }
            })

          }
        }
      })
    },
    filterPanelSettingsHandler() {
      let filters = this.filters;
      let filtersLength = filters.length;
      for (let filterIndex = 0; filterIndex < filtersLength; filterIndex++) {
        this.filterTypes.push({
          slug: filters[filterIndex].slug,
          type: filters[filterIndex].type,
        });
        if (filters[filterIndex].type === "counter") {
          this.filterPanelSettings.push({
            expand: 0,
            count: this.$route.query[this.filters[filterIndex].slug]
              ? this.$route.query[this.filters[filterIndex].slug]
              : 0,
          });
        } else if (filters[filterIndex].type === "list_counter") {
          let listCounterItemCounts = [];
          for (
            let listCounterItemIndex = 0;
            listCounterItemIndex < filters[filterIndex].children.length;
            listCounterItemIndex++
          ) {
            listCounterItemCounts.push({
              count: this.$route.query[
                `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listCounterItemIndex].id}]`
                ]
                ? this.$route.query[
                  `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listCounterItemIndex].id}]`
                  ]
                : 0,
            });
          }
          this.filterPanelSettings.push({
            expand: 0,
            ItemCounts: listCounterItemCounts,
          });
        } else if (this.filters[filterIndex].type === "switch") {
          this.filterPanelSettings.push({
            expand: 0,
            value: this.$route.query[this.filters[filterIndex].slug]
              ? this.$route.query[this.filters[filterIndex].slug]
              : false,
          });
        } else if (this.filters[filterIndex].type === "list_checkbox") {
          let listCheckBoxValue = [];
          for (
            let listItemIndex = 0;
            listItemIndex < this.filters[filterIndex].children.length;
            listItemIndex++
          ) {
            listCheckBoxValue.push({
              value:
                !!this.$route.query[
                  `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listItemIndex].id}]`
                  ],
            });
          }
          this.filterPanelSettings.push({
            expand: 0,
            listCheckBoxValues: listCheckBoxValue,
          });
        } else if (this.filters[filterIndex].type === "list") {
          let openGroupExpansionPanels = [];
          for (
            let listItemIndex = 0;
            listItemIndex < this.filters[filterIndex].children.length;
            listItemIndex++
          ) {
            let listCheckBoxValue = [];
            for (
              let listItemChildIndex = 0;
              listItemChildIndex <
              this.filters[filterIndex].children[listItemIndex].children.length;
              listItemChildIndex++
            ) {
              listCheckBoxValue.push({
                value:
                  !!this.$route.query[
                    `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listItemIndex].children[listItemChildIndex].id}]`
                    ],
              });
            }
            openGroupExpansionPanels.push({
              expand: 0,
              listCheckBoxValues: listCheckBoxValue,
            });
          }
          this.filterPanelSettings.push(openGroupExpansionPanels);
        } else {
          this.filterPanelSettings.push({
            expand: 0,
          });
        }
      }
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
    inputRange() {
      if (this.rangeSliderFrom && this.rangeSliderTo) {
        this.rangeBtnDisable = false;
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            min_price: undefined,
            max_price: undefined,
          },
        });
        this.data.min_price = null;
        this.data.max_price = null;
        this.rangeBtnDisable = true;
      }
    },
    selectRange(e) {
      this.rangeSliderFrom = e.from;
      this.rangeSliderTo = e.to;
      this.rangeBtnDisable = false;
    },
    checkSize() {
      if (Object.entries(this.$refs.histogramParentDiv).length !== 0) {
        this.histogramWidth = this.$refs.histogramParentDiv[0].clientWidth;
      }
    },
    filterPrice(filter, rangeSliderFrom, rangeSliderTo, filterIndex) {
      if (rangeSliderFrom >= 0 && rangeSliderTo > 0) {
        setTimeout(() => {
          this.$nuxt.$loading.start();
        }, 1);

        //get and set previous filter
        this.setDataFromUrlQueries();
        this.$router.push({
          query: {
            ...this.$route.query,
            min_price: rangeSliderFrom,
            max_price: rangeSliderTo,
          },
        });
        this.data.min_price = rangeSliderFrom;
        this.data.max_price = rangeSliderTo;

        return SearchServices.searchResults(this.data).then((res) => {
          // add this filter to applied filter list
          let appliedFilterExist;
          this.appliedFilterList.forEach(
            (appliedFilter, appliedFilterIndex) => {
              if (appliedFilter.slug === filter.slug) {
                appliedFilterExist = true;
                appliedFilter.minPrice = rangeSliderFrom;
                appliedFilter.maxPrice = rangeSliderTo;
              }
            }
          );
          if (!appliedFilterExist) {
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              minPrice: rangeSliderFrom,
              maxPrice: rangeSliderTo,
              indexInFilterPanelSettings: filterIndex,
            });
          }
          this.setSearchResult(res.data);
          this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
          this.$nuxt.$loading.finish();
        });
      }
    },
    addCounter(filter, filterIndex) {
      this.filterPanelSettings[filterIndex].count++;
      this.filterCounter(
        filter,
        this.filterPanelSettings[filterIndex].count,
        filterIndex
      );
    },
    minusCounter(filter, filterIndex) {
      if (this.filterPanelSettings[filterIndex].count > 0) {
        this.filterPanelSettings[filterIndex].count--;
        this.filterCounter(
          filter,
          this.filterPanelSettings[filterIndex].count,
          filterIndex
        );
      }
    },
    addCounterList(filter, filterIndex, item, itemIndex) {
      this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count++;
      this.filterCounterList(
        filter,
        item,
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count,
        filterIndex,
        itemIndex
      );
    },
    minusCounterList(filter, filterIndex, item, itemIndex) {
      if (
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count > 0
      ) {
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count--;
        this.filterCounterList(
          filter,
          item,
          this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count,
          filterIndex,
          itemIndex
        );
      }
    },
    filterCounter(filter, count, filterIndex) {
      this.$nuxt.$loading.start();

      //get and set previous filter
      this.setDataFromUrlQueries();
      if (count > 0) {
        this.data[filter.slug] = count;
      } else {
        delete this.data[filter.slug];
      }
      return SearchServices.searchResults(this.data).then((res) => {
        if (count > 0) {
          this.$router.push({
            query: {...this.$route.query, [filter.slug]: count},
          });
        } else {
          this.$router.push({
            query: {...this.$route.query, [filter.slug]: undefined},
          });
        }

        // add this filter to applied filter list
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (appliedFilter.slug === filter.slug) {
            appliedFilterExist = true;
            count > 0
              ? (this.appliedFilterList[appliedFilterIndex].count = count)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist) {
          this.appliedFilterList.push({
            type: filter.type,
            slug: filter.slug,
            name: filter.name,
            count: count,
            indexInFilterPanelSettings: filterIndex,
          });
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    filterCounterList(filter, item, itemCount, filterIndex, itemIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);

      //get and set previous filter
      this.setDataFromUrlQueries();
      if (itemCount > 0) {
        if (this.data[filter.slug]) {
          let selectedItemExist = false;
          this.data[filter.slug].forEach((itemObject, itemObjectIndex) => {
            if (itemObject.id === item.id) {
              selectedItemExist = true;
              this.data[filter.slug][itemObjectIndex].count = itemCount;
            }
          });
          if (!selectedItemExist) {
            this.data[filter.slug].push({
              id: item.id,
              count: itemCount,
            });
          }
        } else {
          this.data[filter.slug] = [
            {
              id: item.id,
              count: itemCount,
            },
          ];
        }
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${filter.slug}[${item.id}]`]: undefined,
          },
        });
        this.data[filter.slug].forEach((itemObject, itemObjectIndex) => {
          if (itemObject.id === item.id) {
            this.data[filter.slug].splice(itemObjectIndex, 1);
          }
        });
      }
      return SearchServices.searchResults(this.data).then((res) => {
        if (itemCount > 0) {
          this.$router.push({
            query: {
              ...this.$route.query,
              [`${filter.slug}[${item.id}]`]: itemCount,
            },
          });
        }

        // add this filter to applied filter
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (
            appliedFilter.slug === filter.slug &&
            appliedFilter.id === item.id
          ) {
            appliedFilterExist = true;
            itemCount > 0
              ? (this.appliedFilterList[appliedFilterIndex].count = itemCount)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist) {
          this.appliedFilterList.push({
            type: filter.type,
            slug: filter.slug,
            id: item.id,
            name: item.name,
            count: itemCount,
            indexInFilterPanelSettings: filterIndex,
            itemIndexInFilterPanelSettings: itemIndex,
          });
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    filterSwitch(filter, switchValue, filterIndex) {
      this.$nuxt.$loading.start();

      //get and set previous filter
      this.setDataFromUrlQueries();

      this.data[filter.slug] = switchValue;
      return SearchServices.searchResults(this.data).then((res) => {
        if (switchValue) {
          this.$router.push({
            query: { ...this.$route.query, [filter.slug]: switchValue },
          });
        } else {
          this.$router.push({
            query: { ...this.$route.query, [filter.slug]: undefined },
          });
        }

        // add this filter to applied filter list
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (appliedFilter.slug === filter.slug) {
            appliedFilterExist = true;
            switchValue
              ? (this.appliedFilterList[appliedFilterIndex].value = switchValue)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist && switchValue) {
          this.appliedFilterList.push({
            type: filter.type,
            slug: filter.slug,
            name: filter.name,
            value: switchValue,
            indexInFilterPanelSettings: filterIndex,
          });
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    filterCheckBox(
      filter,
      checkBoxItem,
      checkBoxValue,
      filterIndex,
      filterChildIndexObject
    ) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);

      //get and set previous filter
      this.setDataFromUrlQueries();

      if (!checkBoxValue) {
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
        if (this.data[filter.slug]) {
          this.data[filter.slug].push(checkBoxItem.id);
        } else {
          this.data[filter.slug] = [checkBoxItem.id];
        }
      }

      return SearchServices.searchResults(this.data).then((res) => {
        if (checkBoxValue) {
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
            appliedFilterExist = true;
            checkBoxValue
              ? (this.appliedFilterList[appliedFilterIndex].value =
                checkBoxValue)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist && checkBoxValue) {
          if (filter.type === "list") {
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              id: checkBoxItem.id,
              name: checkBoxItem.name,
              value: checkBoxValue,
              indexInFilterPanelSettings: filterIndex,
              childIndexInFilterPanelSettings:
              filterChildIndexObject.filterChildIndex,
              childItemIndexInFilterPanelSettings:
              filterChildIndexObject.filterChildItemIndex,
            });
          } else {
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              id: checkBoxItem.id,
              name: checkBoxItem.name,
              value: checkBoxValue,
              indexInFilterPanelSettings: filterIndex,
              childIndexInFilterPanelSettings:
              filterChildIndexObject.filterChildIndex,
            });
          }
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    clearFilter(appliedFilter, appliedFilterIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      if (appliedFilter.type === "price_range") {
        // delete it from data send in api
        delete this.data.min_price;
        delete this.data.max_price;

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its values
        this.rangeSliderFrom = null;
        this.rangeSliderTo = null;

        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            min_price: undefined,
            max_price: undefined,
          },
        });

        this.rangeBtnDisable = true;
      } else if (appliedFilter.type === "counter") {
        // delete it from data send in api
        delete this.data[appliedFilter.slug];

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        this.filterPanelSettings[
          appliedFilter.indexInFilterPanelSettings
          ].count = 0;

        //remove it  from url query
        this.$router.push({
          query: {...this.$route.query, [appliedFilter.slug]: undefined},
        });
      } else if (appliedFilter.type === "list_counter") {
        // delete it from data send in api
        this.data[appliedFilter.slug].forEach((itemObject, itemObjectIndex) => {
          if (itemObject.id === appliedFilter.id) {
            this.data[appliedFilter.slug].splice(itemObjectIndex, 1);
          }
        });
        if(this.data[appliedFilter.slug].length === 0) delete this.data[appliedFilter.slug];


        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        this.filterPanelSettings[
          appliedFilter.indexInFilterPanelSettings
          ].ItemCounts[appliedFilter.itemIndexInFilterPanelSettings].count = 0;

        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${appliedFilter.slug}[${appliedFilter.id}]`]: undefined,
          },
        });
      } else if (appliedFilter.type === "switch") {
        // delete it from data send in api
        delete this.data[appliedFilter.slug];

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        this.filterPanelSettings[
          appliedFilter.indexInFilterPanelSettings
          ].value = false;

        //remove it from url query
        this.$router.push({
          query: { ...this.$route.query, [appliedFilter.slug]: undefined },
        });
      } else if (
        appliedFilter.type === "list_checkbox" ||
        appliedFilter.type === "list"
      ) {
        // delete it from data send in api
        this.data[appliedFilter.slug].forEach((item, itemIndex) => {
          if (item === appliedFilter.id) {
            this.data[appliedFilter.slug].splice(itemIndex, 1);
          }
        });
        if(this.data[appliedFilter.slug].length === 0) delete this.data[appliedFilter.slug];

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        if (appliedFilter.type === "list_checkbox") {
          this.filterPanelSettings[
            appliedFilter.indexInFilterPanelSettings
            ].listCheckBoxValues[
            appliedFilter.childIndexInFilterPanelSettings
            ].value = false;
        } else {
          this.filterPanelSettings[appliedFilter.indexInFilterPanelSettings][
            appliedFilter.childIndexInFilterPanelSettings
            ].listCheckBoxValues[
            appliedFilter.childItemIndexInFilterPanelSettings
            ].value = false;
        }

        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${appliedFilter.slug}[${appliedFilter.id}]`]: undefined,
          },
        });
      }

      return SearchServices.searchResults(this.data).then((res) => {
        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
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
