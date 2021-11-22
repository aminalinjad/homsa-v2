import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services"

export default {
  props: {
    filter: {
      type: Object,
      default: {}
    },
    filterIndex: {
      type: Number
    },
    resetPriceValue: {
      type: Boolean
    }
  },
  data() {
    return {
      histogramWidth: 272,
      rangeSliderFrom: null,
      rangeSliderTo: null,
      histogramSectionWidth: null,
      rangeBtnDisable: true,
    }
  },
  watch: {
    resetPriceValue() {
      this.rangeBtnDisable = true;
      this.rangeSliderFrom= null
      this.rangeSliderTo= null
      this.$refs.histogram.update({from: this.filter.price_range.min_price, to: this.filter.price_range.max_price})
    }
  },
  computed: {
    ...mapGetters({
      histogramPrices: `modules/filters/${types.filters.getters.GET_HISTOGRAM_PRICES}`,
      appliedFilter: `modules/filters/${types.filters.getters.GET_APPLIED_FILTER}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`,
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
        this.$refs.histogram.update({from: this.$route.query.min_price, to: this.$route.query.max_price})
        this.rangeSliderFrom = this.$route.query.min_price;
        this.rangeSliderTo = this.$route.query.max_price;
      }
    })
    window.addEventListener("resize", this.checkSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkSize);
  },
  methods: {
    ...mapActions({
      setAppliedFilter: `modules/filters/${types.filters.actions.SET_APPLIED_FILTER}`,
      setUpdateAppliedFilter: `modules/filters/${types.filters.actions.SET_UPDATE_APPLIED_FILTER}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setHistogramPrices: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`
    }),
    inputRange() {
      if (this.rangeSliderFrom && this.rangeSliderTo) {
        this.rangeBtnDisable = false;
      } else {
        // this.$router.push({
        //   query: {
        //     ...this.$route.query,
        //     min_price: undefined,
        //     max_price: undefined,
        //   },
        // });
        // this.data.min_price = null;
        // this.data.max_price = null;

        this.rangeBtnDisable = true;
      }
    },
    checkSize() {
      if (this.$refs.histogramParentDiv && Object.entries(this.$refs.histogramParentDiv).length !== 0) {
        this.histogramWidth = this.$refs.histogramParentDiv.clientWidth;
      }
    },
    selectRange(e) {
      this.rangeSliderFrom = e.from;
      this.rangeSliderTo = e.to;
      this.rangeBtnDisable = false;
    },
    filterPrice(filter, minPrice, maxPrice) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      //push in router
      this.$router.push({
        query: {
          ...this.$route.query,
          min_price: minPrice,
          max_price: maxPrice,
        },
      });

      //set in applied filter
      let currentFilter = {
        slug: filter.slug,
        minPrice: minPrice,
        maxPrice: maxPrice,
        filterIndex: this.filterIndex
      }
      let appliedFilters = [...this.appliedFilter]

      let appliedFilterIndex = appliedFilters.findIndex(appliedFilter => appliedFilter.slug === filter.slug)
      if (appliedFilterIndex >= 0) {
        this.setUpdateAppliedFilter({
          index: appliedFilterIndex,
          value: currentFilter
        })
      } else {
        appliedFilters.push(currentFilter)
        this.setAppliedFilter(appliedFilters)
      }


      //set in req data
      let data = {...this.getRequestData}
      data.max_price = maxPrice
      data.min_price = minPrice
      this.setRequestData(data)

      //call service
      return SearchServices.searchResults(data).then((res) => {
        this.setSearchResult(res.data);
        this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });


    }
  }
}
