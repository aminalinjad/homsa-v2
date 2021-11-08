import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import arrowRotate from "@/assets/AppIcons/arrowLeft";
import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services"

export default {
  components: {arrowRotate, vueCustomScrollbar},
  props: {
    isRtl: {
      type: Boolean,
      default: true,
    },
    propsPagination: {
      type: Number
    }
  },
  data() {
    return {
      filter: false,
      test: {},
      filterAdded: false,
      ifGridView: false,
      page: 1,
      currentPage: Number(this.$route.query.page) || 1,
      settings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`,
    }),
    isFilter() {
      return this.filter;
    },
  },
  watch: {
    getSearchResult: {
      immediate: false,
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.currentPage = newValue.current_page
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setHoveredItem: `modules/search/${types.search.actions.SET_HOVERED_ITEM}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
    }),
    changePagination() {
      setTimeout(() => {
        this.$nuxt.$loading.start()
      }, 1)
      let qs = {}
      if (this.currentPage > 1) qs.page = this.currentPage

      this.$router.push({query: {...this.$route.query, page: qs.page}})

      let data = {...this.getRequestData}
      data.page = this.currentPage
      this.setRequestData(data)

      SearchServices.searchResults(data).then(res => {
        this.$nuxt.$loading.finish()
        this.setSearchResult(res.data)
      }).catch(err => {

      })
    },
    toggleFilter() {
      this.filter = !this.filter
    },
    itemHover(index) {
      if (index) {
        this.setHoveredItem(index);
      } else {
        this.setHoveredItem(null);
      }
    },
  },
};
