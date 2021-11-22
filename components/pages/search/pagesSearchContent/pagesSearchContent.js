import GridIcon from "@/assets/AppIcons/grid.vue"
import ListIcon from "@/assets/AppIcons/list.vue"
import {mapActions, mapGetters} from "vuex"
import * as types from "@/store/types.js"
import {SearchServices} from "@/services"

export default {
  components: {
    GridIcon,
    ListIcon,
  },
  data() {
    return {
      page: 1,
      currentPage: Number(this.$route.query.page) || 1,
      gridViewMode: true,
      sortByDefault: this.$route.query.sort? this.$route.query.sort : "popular",
    };
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
  computed: {
    ...mapGetters({
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`,
    }),
    sortBy() {
      return [
        {text: this.$t('sort.popular'), value: 'popular'},
        {text: this.$t('sort.cheapest'), value: 'cheapest'},
        {text: this.$t('sort.priciest'), value: 'priciest'},
        {text: this.$t('sort.discount'), value: 'discount'},
      ]
    },
    listIconClass() {
      if(!this.gridViewMode) {
        return this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.greenDark8 : this.$vuetify.theme.themes.light.greenDark8;
      } else {
        return null;
      }
    },
    gridIconClass() {
      if(!this.gridViewMode) {
        return this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.secondary : this.$vuetify.theme.themes.light.secondary;
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
    }),
    changeTheSortSelect() {
      setTimeout(() => {
        this.$nuxt.$loading.start()
      }, 1)

      this.$router.push({query: {...this.$route.query, sort: this.sortByDefault}})

      let data = {...this.getRequestData}
      data.sort = this.sortByDefault
      this.setRequestData(data)

      SearchServices.searchResults(data).then(res => {
        this.setSearchResult(res.data)
        this.$nuxt.$loading.finish()
      }).catch(err => {
      })
    },
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
        this.setSearchResult(res.data)
        this.$nuxt.$loading.finish()
      }).catch(err => {

      })
    },
    listView() {
      this.gridViewMode = false;
    },
    gridView() {
      this.gridViewMode = true;
    },
    itemPage(link) {
      window.open(
        link,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
  },
};
