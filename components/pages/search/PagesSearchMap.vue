<template>
  <div id="map-wrap" class="mapContainer rounded-lg">
    <client-only>
      <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="options"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
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
        <l-marker :lat-lng="[32.4279, 53.6880]">
          <l-icon class="someCustomClasses">

            <div class="custom-marker font-regular-12">
              <span>۱۲۵۰,۰۰۰ تومان</span>
              <v-icon class="heart-icon" small color="redOfferTime">mdi-heart</v-icon>
            </div>
          </l-icon>
        </l-marker>
        <l-marker :lat-lng="[31.4279, 53.6880]">
          <l-icon class="someCustomClasses">
            <div class="custom-marker font-regular-12">
              <span>۱۲۵۰,۰۰۰ تومان</span>
              <v-icon class="heart-icon" small color="redOfferTime">mdi-heart</v-icon>
            </div>
          </l-icon>
        </l-marker>
        <l-marker :lat-lng="[32.4279, 53.9880]">
          <l-icon class="someCustomClasses">
            <div class="custom-marker font-regular-12">۸۵۰,۰۰۰ تومان</div>
          </l-icon>
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import * as types from "@/store/types.js"

export default {
  data() {
    return {
      options: {
        zoomControl: false,
        zoom: 6,
        center: [32.4279, 53.6880]
      },
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
    closeMapLayout() {
      this.setMapLayout(false);
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(zoom)
    },
    centerUpdated(center) {
      this.center = center;
      console.log(center)
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
      console.log(bounds)
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

  .custom-marker:hover {
    background: var(--v-primary-base);
    color: var(--v-whiteColor-base);
  }

  .custom-marker::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid var(--v-whiteColor-base);;
    position: absolute;
    top: 26px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .custom-marker:hover:before {
    border-top: 10px solid var(--v-primary-base);
  }
  .heart-icon {
    position: absolute;
    right: -6px;
    top: -6px;
  }
}
</style>
