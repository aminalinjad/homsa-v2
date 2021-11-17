import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import StarIcon from "@/assets/AppIcons/starFavorite.vue";
import {SearchServices} from "@/services"

export default {
  data() {
    return {
      rank: 4.2,
      dragMapCheckbox: false,
      options: {
        zoomControl: false,
        maxZoom: 14,
        minZoom: 6,
      },
      popupOption: {
        closeButton: false,
        minWidth: 270,
        maxWidth: 270,
        className: "justifyBox",
      },
      zoom: 5,
      center: [32.4279, 33.688],
      bounds: null,
    }
  },
  components: {
    StarIcon
  },
  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
      getHoveredItem: `modules/search/${types.search.getters.GET_HOVERED_ITEM}`,
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`,
    }),
  },
  watch: {
    // for fitBounds the map when change the pagination in map side component
    getSearchResult: {
      immediate: false,
      handler(newValue) {
        if (newValue) {
          this.$refs.map.mapObject.fitBounds(
            this.getSearchResult.data.map((m) => {
              return [m.latitude, m.longitude];
            }),
          )
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setHoveredItem: `modules/search/${types.search.actions.SET_HOVERED_ITEM}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setHistogram: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
    }),
    getData() {
      if (this.dragMapCheckbox && this.bounds) {
        this.$nuxt.$loading.start()

        this.$router.push({query: {...this.$route.query, page: undefined}})

        let data = {...this.getRequestData}
        data.page = 1

        data.boundaries = {
          "max_lat": this.bounds._northEast.lat,
          "max_long": this.bounds._northEast.lng,
          "min_lat": this.bounds._southWest.lat,
          "min_long": this.bounds._southWest.lng
        }
        this.setRequestData(data)

        SearchServices.searchResults(data).then(res => {
          this.$nuxt.$loading.finish()
          this.setSearchResult(res.data)
          this.setHistogram(res.data.histogram_prices.prices)
          this.setFilters(res.data.filters.filters)
        }).catch(err => {
          this.$nuxt.$loading.finish()
        })
      }
    },
    mapInitials() {
      if (this.getSearchResult.data.length !== 0) {
        this.$refs.map.mapObject.fitBounds(
          this.getSearchResult.data.map((m) => {
            return [m.latitude, m.longitude];
          }),
        )
      }

      setTimeout(() => {
        this.$refs.map.mapObject.invalidateSize()
      }, 100)
    },
    getUserLocation() {
      this.$refs.map.mapObject.locate()
    },
    closeMapLayout() {
      this.$router.push({query: {...this.$route.query, showMap: 'false'}})
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    rankColor(color) {
      if (color >= 4) {
        return "primary";
      } else if (color >= 3) {
        return "green2";
      } else {
        return "orangeBooking";
      }
    },
  },
};
