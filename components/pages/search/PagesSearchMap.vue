<template>
  <!-- <div class="mapContainer rounded-lg">
    <div class="mapContainer__top closeBtnleft">
      <v-btn fab small @click="closeMapLayout">
        <CloseIcon />
      </v-btn>
    </div>
    <div id="map-wrap" class="mapContainer__map">
      <client-only>
        <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
        </l-map>
      </client-only>
      
    </div>
  </div> -->
  <div id="map-wrap" class="mapContainer rounded-lg">
      <client-only>
        <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
        </l-map>
      </client-only>
      <v-btn class="mapClose" fab small @click="closeMapLayout">
        <CloseIcon />
      </v-btn>
    </div>
</template>

<script>
import CloseIcon from "~/assets/images/icons/ic-delete-large.svg?inline";
import{ mapGetters, mapActions } from 'vuex';
export default {
  components: {
    CloseIcon,
  },
  computed: {
    ...mapGetters({
      mapLayout: "modules/structure/GET_MAP_LAYOUT"
    }),
  },

  methods: {
      ...mapActions({
      setMapLayout: "modules/structure/SET_MAP_LAYOUT",
    }),
    closeMapLayout() {
      this.setMapLayout(false);
    },
  },
};
</script>

<style lang="scss">
// .mapContainer {
//   height: 100%;
//   // height: 80vh;
//   position: relative;

//   &__top {
//     position: absolute;
//     top: 16px;
//     z-index: 2 !important;
//   }

//   .closeBtnleft {
//     left: 16px;
//   }

//   #map-wrap {
//     // flex: 1;
//   }

//   &__map {
//     height: 100%;
//     // height: 80vh;
//     width: 100%;
//     position: absolute;
//     z-index: 1 !important;
//   }
// }
#map-wrap.mapContainer {
  // position: relative;
  height: 100%;
  width: 100%;
   z-index: 1 !important;
   

  .mapClose {
    position: absolute;
    top: 32px;
    left: 32px;
    z-index: 1000 !important;
  }

}
</style>zzz