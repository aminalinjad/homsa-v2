<template>
  <v-app class="iransans">
    <LayoutHeaderSearch />
    <!-- <v-app-bar height="100" class="ma-5" app :clipped-right="isRtl" :clipped-left="!isRtl">ff</v-app-bar> -->
    <LayoutMapSide class="pb-4" :isRtl="isRtl" />
    <v-main>
      <v-container class="fill-height" fluid> 
        
        <Nuxt class="mapLayoutContainer px-1" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    isRtl() {
      if(this.$vuetify.rtl) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mapLayoutContainer {
  flex: 1;
  height: 100%;
}

</style>