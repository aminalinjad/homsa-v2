<template>
  <div id="map-wrap" class="mapContainer rounded-lg">
    <client-only>
      <l-map
        @ready="mapInitials"
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="options"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <!--  close map icon -->
        <l-control position="topleft">
          <v-btn
            fab
            small
            @click="closeMapLayout"
          >
            <v-icon large> $close</v-icon>
          </v-btn>
        </l-control>
        <!--  zoom icon -->
        <l-control-zoom position="bottomright"></l-control-zoom>
        <!-- show marker on map marker -->
        <l-marker :z-index-offset="place.id === getHoveredItem ? 1000 : 100" v-for="(place , index) in places"
                  :key="`place${index}`" :lat-lng="place.coordinates">

          <l-icon class="someCustomClasses">
            <div class="custom-marker font-regular-12" :class="[place.id === getHoveredItem ? 'hoverOnItem': '']">
              <span>{{ place.price }} تومان</span>
              <v-icon v-if="place.like" class="heart-icon" small color="redOfferTime">mdi-heart</v-icon>
            </div>
          </l-icon>

          <l-popup :options="popupOption">
            <PagesSearchResultImg :index="1"/>
            <v-card-subtitle class="pt-3 pb-1 px-0">
              <div
                class="pb-2"
                :class="$vuetify.rtl ? 'text-left' : 'text-right'"
              >
            <span v-if="false">
              <span class="font-bold-14 secondary--text">جدید</span>
            </span>
                <span class="d-flex align-center justify-end" v-else>
              <span class="font-regular-10 secondary--text">(۳۶۰ نظر)</span>
              <span class="mx-1">۴.۲</span>
            </span>
              </div>
            </v-card-subtitle>
            <v-card-text class="pb-3 px-0 greenDark8--text">
              <p class="mb-1">آپارتمان مبله دوبلکس در خیابان ولیعصر</p>
            </v-card-text>

            <!-- bottom sec  -->
            <v-card-actions class="px-0">
              <!-- Price start -->
              <div class="font-regular-12">
                <!-- modification need : this v-if base of index should be removed after logic and api   -->
                <div class="secondary--text mb-n4" v-if="index % 2 === 0">
                  <span>قیمت کل</span>
                  <span>۲,۵۵۰,۰۰۰</span>
                  <span>تومان</span>
                </div>

                <!-- modification need : this v-if base of index should be removed after logic and api   -->
                <div
                  class="secondary--text mb-n4 text-center"
                  v-if="index % 3 === 0 && !(index % 2 === 0)"
                >
                  <span class="text-decoration-line-through">۲,۵۵۰,۰۰۰</span>
                </div>
                <div class="mt-4 greenDark8--text">
                  <span>هر شب</span>
                  <span class="font-bold-14">۸۵۰,۰۰۰</span>
                  <span>تومان</span>
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
      <v-checkbox v-model="dragMapCheckbox" :hide-details="true" class="ma-2 pt-0">
        <template v-slot:label>
          <div class="font-regular-14">{{ $t('search.map.drag-map') }}</div>
        </template>
      </v-checkbox>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import * as types from "@/store/types.js"

export default {
  data() {
    return {
      dragMapCheckbox: false,
      options: {
        zoomControl: false,
        maxZoom: 14,
        minZoom: 6,
      },
      popupOption: {
        closeButton: false,
        minWidth: 312,
        maxWidth: 312,
        className: 'justifyBox'
      },
      zoom: 5,
      center: [32.4279, 33.6880],
      bounds: null,
      places: [
        {
          price: '۱۸۵۰,۰۰۰',
          name: 'تهران',
          id: 1,
          like: true,
          coordinates: [32.4279, 53.6880]
        },
        {
          price: '۸۵۰,۰۰۰',
          name: 'تهران',
          id: 2,
          like: false,
          coordinates: [31.4279, 54.6880]
        },
        {
          price: '۱۲۵۰,۰۰۰',
          name: 'تهران',
          id: 3,
          like: false,
          coordinates: [31.4279, 56.6880]
        },
        {
          price: '۱۲۵۰,۰۰۰',
          name: 'تهران',
          id: 4,
          like: false,
          coordinates: [31.4279, 46.6880]
        },
        {
          price: '۱۲۵۰,۰۰۰',
          name: 'تهران',
          id: 5,
          like: false,
          coordinates: [20.4279, 58.6880]
        },
        {
          price: '۱۲۵۰,۰۰۰',
          name: 'تهران',
          id: 6,
          like: false,
          coordinates: [38.4279, 56.6880]
        }
      ]
    }
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
      setMapLayout: `modules/structure/${types.structure.actions.SET_MAP_LAYOUT}`,
      setHoveredItem: `modules/search/${types.search.actions.SET_HOVERED_ITEM}`,
    }),
    mapInitials() {
      console.log(this.$refs.map)
      this.$refs.map.mapObject.fitBounds(this.places.map(m => {
        return m.coordinates
      }), {padding: [20, 20]})
    },
    closeMapLayout() {
      this.setMapLayout(false);
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
      if (this.dragMapCheckbox) {
        alert('search mikonm')
      }
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
    background-color: var(--v-whiteColor-base);;
    border-radius: 15px;
    color: var(--v-primary-base);
    white-space: nowrap;
    padding: 5px 7px;
    transform: translateX(50%);
    font-weight: 700;
    font-size: 15px;
  }

  .custom-marker:hover, .hoverOnItem {
    background: var(--v-primary-base);
    color: var(--v-whiteColor-base);
  }

  .custom-marker::before, .hoverOnItem::before {
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

  .custom-marker:hover:before, .hoverOnItem:before {
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
    text-align: justify
  }
}
</style>
