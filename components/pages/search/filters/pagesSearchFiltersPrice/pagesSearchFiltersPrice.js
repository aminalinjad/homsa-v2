import { mapGetters } from "vuex";
import * as types from "@/store/types.js";

export default {
  props: {
    filter: {
      type: Object,
      default : {}
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
    window.addEventListener("resize", this.checkSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkSize);
  },
  methods: {
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
    checkSize() {
      if (Object.entries(this.$refs.histogramParentDiv).length !== 0) {
        this.histogramWidth = this.$refs.histogramParentDiv[0].clientWidth;
      }
    },
    selectRange(e) {
      this.rangeSliderFrom = e.from;
      this.rangeSliderTo = e.to;
      this.rangeBtnDisable = false;
    },
  }
}
