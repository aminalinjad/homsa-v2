<template>
  <div>
    <div class="thumbnailMapContainer">
      <div id="map-wrap" class="thumbnailMapContainer__map">
        <img :src="require('@/assets/images/map.svg')" />
      </div>
      <div class="thumbnailMapContainer__text text-center py-5 rounded-b-lg cursorPointer" @click="mapLayoutMode">
        <span class="greenDark8--text">
          {{ $t('search.filters.map-thumbnail') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
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