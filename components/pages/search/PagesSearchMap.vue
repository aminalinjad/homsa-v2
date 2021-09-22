<template>
  <div id="map-wrap" class="mapContainer rounded-lg">
    <client-only>
      <l-map
        @ready="mapInitials"
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="options"
        @dragend="getData"
        @zoomend="getData"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <!--  close map icon -->
        <l-control position="topleft">
          <v-btn fab small @click="closeMapLayout">
            <v-icon large> $close</v-icon>
          </v-btn>
        </l-control>
        <!--  zoom icon -->
        <l-control-zoom position="topright"></l-control-zoom>

        <!--    get user location button    -->
        <l-control position="topright">
          <v-btn depressed fab small @click="getUserLocation">
            <v-icon x-large> $location</v-icon>
          </v-btn>
        </l-control>
        <!-- show marker on map marker -->
        <l-marker
          :z-index-offset="place.id === getHoveredItem ? 1000 : 100"
          v-for="(place, index) in getSearchResult.data"
          :key="`place${index}`"
          :lat-lng="[place.latitude , place.longitude]"
        >
          <l-icon class="someCustomClasses">
            <div
              class="custom-marker font-regular-12"
              :class="[place.id === getHoveredItem ? 'hoverOnItem' : '']"
            >
              <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''">{{ place.discount_night }}</span>
              <span>
                 {{ $t("search.main.item.unit") }}</span>
              <v-icon
                v-if="place.like"
                class="heart-icon"
                small
                color="redOfferTime"
              >mdi-heart
              </v-icon
              >
            </div>
          </l-icon>

          <l-popup :options="popupOption">
            <PagesSearchResultImg :images="place.photos" :index="1"/>
            <div class="pt-3 pb-1 px-0">
              <div
                class="pb-2"
                :class="$vuetify.rtl ? 'text-left' : 'text-right'"
              >
                <span v-if="false">
                  <span class="font-bold-14 secondary--text">جدید</span>
                </span>
                <span class="d-flex align-center justify-end" v-else>
                  <span class="font-regular-10 secondary--text">(۳۶۰ نظر)</span>
                  <span
                    class="mx-1"
                    :class="[
                  rankColor(rank) + '--text',$i18n.locale === 'fa' ? 'font-FaNumregular-14' : '',]">
                    {{ place.overall_rating }}
                  </span>
              <StarIcon
                :color="
                  rank >= 4
                    ? !$vuetify.theme.dark
                      ? $vuetify.theme.themes.light.primary
                      : $vuetify.theme.themes.dark.primary
                    : rank >= 3
                    ? !$vuetify.theme.dark
                      ? $vuetify.theme.themes.light.green2
                      : $vuetify.theme.themes.dark.green2
                    : !$vuetify.theme.dark
                    ? $vuetify.theme.themes.light.orangeBooking
                    : $vuetify.theme.themes.dark.orangeBooking
                "
              />
                </span>
              </div>
            </div>
            <div class="pb-3 px-0 greenDark8--text">
              <p class="mb-1 mt-0">{{ place.name }}</p>
            </div>

            <!-- bottom sec  -->
            <v-card-actions class="px-0">
              <!-- Price start -->
              <div class="font-regular-12">
                <!-- modification need : this v-if base of index should be removed after logic and api   -->
                <div class="secondary--text mb-n4" v-if="index % 2 === 0">
                  <span>{{ $t("search.main.item.total-price") }}</span>
                  <span
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
                  >2,550,000</span
                  >
                  <span>{{ $t("search.main.item.unit") }}</span>
                </div>

                <!-- modification need : this v-if base of index should be removed after logic and api   -->
                <div
                  class="secondary--text mb-n4 text-center"
                  v-if="index % 3 === 0 && !(index % 2 === 0)"
                >
                  <span
                    class="text-decoration-line-through"
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
                  >2,550,000</span
                  >
                </div>
                <div class="mt-4 greenDark8--text">
                  <span>{{ $t("search.main.item.per-night") }}</span>
                  <span
                    :class="
                $i18n.locale === 'fa' ? 'font-FaNumbold-14' : 'font-bold-14'
              "
                  >{{ place.discount_night }}</span
                  >
                  <span>{{ $t("search.main.item.unit") }}</span>
                </div>
              </div>
              <!-- Price end -->

              <v-spacer></v-spacer>

              <v-chip label color="orangeBookingBg">
                <v-icon color="orangeBooking" size="18">$lightning</v-icon>
              </v-chip>
            </v-card-actions>
          </l-popup>
        </l-marker>
      </l-map>
    </client-only>

    <div class="drag-search-div rounded-md">
      <v-checkbox
        v-model="dragMapCheckbox"
        :hide-details="true"
        class="ma-2 pt-0"
      >
        <template v-slot:label>
          <div class="font-regular-14">{{ $t("search.map.drag-map") }}</div>
        </template>
      </v-checkbox>
    </div>
  </div>
</template>

<script>
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
    }),
  },

  methods: {
    ...mapActions({
      setHoveredItem: `modules/search/${types.search.actions.SET_HOVERED_ITEM}`,
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
    }),
    getData() {
      if (this.dragMapCheckbox) {
        this.$nuxt.$loading.start()
        let data = {
          "Accept-Language": "fa",
          page: 1,
          sort: "popular",
          "boundaries": {
            "max_lat": this.bounds._northEast.lat,
            "max_long": this.bounds._northEast.lng,
            "min_lat": this.bounds._southWest.lat,
            "min_long": this.bounds._southWest.lng
          },
        }

        this.$router.push({query: {...this.$route.query, page: undefined}})
        SearchServices.searchResults(data).then(res => {
          this.$nuxt.$loading.finish()
          console.log(res.data)
          this.setSearchResult(res.data)
        }).catch(err => {
          this.$nuxt.$loading.finish()
          alert('err dare')
        })
      }
    },
    mapInitials() {
      this.$refs.map.mapObject.fitBounds(
        this.getSearchResult.data.map((m) => {
          return [m.latitude, m.longitude];
        }),
      )
      setTimeout(() => {
        this.$refs.map.mapObject.invalidateSize()
      }, 100)
    },
    getUserLocation() {
      this.$refs.map.mapObject.locate()
      console.log(this.$refs.map);
    },
    closeMapLayout() {
      this.$router.push({query: {...this.$route.query, showMap: 'false'}})
    },
    boundsUpdated(bounds) {

      this.bounds = bounds;
      console.log(this.bounds)
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
</script>

<style lang="scss">
#map-wrap.mapContainer {
  height: 100%;
  width: 100%;

  .custom-marker {
    display: inline-block;
    background-color: var(--v-whiteColor-base);
    border-radius: 15px;
    color: var(--v-primary-base);
    white-space: nowrap;
    padding: 5px 7px;
    transform: translateX(50%);
    font-weight: 700;
    font-size: 15px;
  }

  .custom-marker:hover,
  .hoverOnItem {
    background: var(--v-primary-base);
    color: var(--v-whiteColor-base);
  }

  .custom-marker::before,
  .hoverOnItem::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid var(--v-whiteColor-base);
    position: absolute;
    top: 26px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .custom-marker:hover:before,
  .hoverOnItem:before {
    border-top: 10px solid var(--v-primary-base);
  }

  .heart-icon {
    position: absolute;
    right: -6px;
    top: -6px;
  }

  .drag-search-div {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 9999;
    width: fit-content;
    bottom: 17px;
    background: var(--v-whiteColor-base);
  }

  .justifyBox > div {
    text-align: justify;
  }
}
</style>
