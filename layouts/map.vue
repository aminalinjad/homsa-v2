<template>
  <v-app class="iransans">
    <LayoutHeaderSearch />
    <!-- <v-app-bar height="100" class="ma-5" app :clipped-right="isRtl" :clipped-left="!isRtl">ff</v-app-bar> -->
    <LayoutMapSide :isRtl="isRtl" />
    <v-main>
      <v-container fluid> 
        <Nuxt />
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

</style>