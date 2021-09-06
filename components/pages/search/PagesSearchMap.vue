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
        <l-marker :z-index-offset="[place.id === propsId?1000 : 100]" v-for="(place , index) in places" :key="`place${index}`" :lat-lng="place.coordinates">

          <l-icon class="someCustomClasses">

            <div class="custom-marker font-regular-12" :class="[place.id === propsId ? 'hoverOnItem': '']">
              <span>{{ place.price }} تومان</span>
              <v-icon v-if="place.like" class="heart-icon" small color="redOfferTime">mdi-heart</v-icon>
            </div>
          </l-icon>
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
  props: {
    propsId: {
      required: true,
      default: 3,
    }
  },
  data() {
    return {
      dragMapCheckbox: false,
      options: {
        zoomControl: false,
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
    }),
  },

  methods: {
    ...mapActions({
      setMapLayout: `modules/structure/${types.structure.actions.SET_MAP_LAYOUT}`,
    }),
    mapInitials() {
      console.log(this.$refs.map)
      this.$refs.map.mapObject.fitBounds(this.places.map(m => { return m.coordinates }) ,{ padding: [20, 20] })
    },
    closeMapLayout() {
      this.setMapLayout(false);
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
      if (this.dragMapCheckbox) {
        alert('search mikonm')
      }
    }
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

  .custom-marker:hover , .hoverOnItem {
    background: var(--v-primary-base);
    color: var(--v-whiteColor-base);
  }

  .custom-marker::before , .hoverOnItem::before {
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

  .custom-marker:hover:before  , .hoverOnItem:before{
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
}
</style>
