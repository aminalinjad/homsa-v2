<template>
  <div id="map-wrap" class="mapContainer rounded-lg">
    <client-only>
      <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
      </l-map>
    </client-only>
    <v-btn
      fab
      small
      class="mapClose"
      :class="{ mapCloseRight: !$vuetify.rtl }"
      @click="closeMapLayout"
    >
      <v-icon large> $close </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "@/store/types.js";
export default {
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
  },
};
</script>

<style lang="scss">
#map-wrap.mapContainer {
  height: 100%;
  width: 100%;

  .mapClose {
    position: absolute;
    top: 32px;
    left: 32px;
    z-index: 1100 !important;
  }

  .mapCloseRight {
    left: auto !important;
    right: 32px !important;
  }
}
</style>