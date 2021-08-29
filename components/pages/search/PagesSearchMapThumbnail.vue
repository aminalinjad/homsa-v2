<template>
  <div>
    <div class="thumbnailMapContainer">
      <div id="map-wrap" class="thumbnailMapContainer__map">
        <client-only>
          <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
            <l-tile-layer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
          </l-map>
        </client-only>
      </div>
      <div class="thumbnailMapContainer__text text-center py-5 rounded-b-lg cursorPointer" @click="mapLayoutMode">
        <span>
          {{ mapThumbnailText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      mapThumbnailText: "نمایش روی نقشه",
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      setMapLayout: "modules/structure/SET_MAP_LAYOUT"
    }),
    mapLayoutMode() {
      this.setMapLayout(true);
    }

  },
};
</script>

<style lang="scss">
.thumbnailMapContainer {
  height: 138px;
  position: relative;
  border-radius: 12px;

  &__map {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 1 !important;
    .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
      border-radius: 12px !important;
    }
  }
  &__text {
    position: absolute;
    width: 100%;
    z-index: 2 !important;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>