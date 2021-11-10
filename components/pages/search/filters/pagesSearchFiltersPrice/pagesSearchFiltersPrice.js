import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {set} from "core-js/internals/task";

export default {
  props: {
    filter: {
      type: Object,
      default: {}
    },
    filterIndex: {
      type: Number
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
  computed: {
    ...mapGetters({
      histogramPrices: `modules/filters/${types.filters.getters.GET_HISTOGRAM_PRICES}`,
      appliedFilter: `modules/filters/${types.filters.getters.GET_APPLIED_FILTER}`,
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
        this.$refs.histogram[0].update({from: this.$route.query.min_price, to: this.$route.query.max_price})
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
      setUpdateAppliedFilter: `modules/filters/${types.filters.actions.SET_UPDATE_APPLIED_FILTER}`
    }),
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
        // this.data.min_price = null;
        // this.data.max_price = null;

        this.rangeBtnDisable = true;
      }
    },
    checkSize() {
      if (this.$refs.histogramParentDiv && Object.entries(this.$refs.histogramParentDiv).length !== 0) {
        this.histogramWidth = this.$refs.histogramParentDiv[0].clientWidth;
      }
    },
    selectRange(e) {
      this.rangeSliderFrom = e.from;
      this.rangeSliderTo = e.to;
      this.rangeBtnDisable = false;
    },
    filterPrice(filter, minPrice, maxPrice) {
      this.$router.push({
        query: {
          ...this.$route.query,
          min_price: minPrice,
          max_price: maxPrice,
        },
      });
      let currentFilter = {
        slug: filter.slug,
        minPrice: minPrice,
        maxPrice: maxPrice,
        filterIndex: this.filterIndex
      }
      let appliedFilters = [...this.appliedFilter]
      console.log("appliedFilters" , appliedFilters)

      let appliedFilterIndex =  appliedFilters.findIndex(appliedFilter => appliedFilter.slug === filter.slug)
      console.log(appliedFilterIndex)
      this.setUpdateAppliedFilter({index: appliedFilterIndex, value: {
          slug: filter.slug,
          minPrice: minPrice,
          maxPrice: maxPrice,
          filterIndex: this.filterIndex
        }})
      if (appliedFilters.length === 0 || appliedFilterIndex < 0) {
        appliedFilters.push(currentFilter)
      }
      console.log("appliedFilters" , appliedFilters)


    }
  }
}
