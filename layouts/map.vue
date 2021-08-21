<template>
  <v-app class="iransans">
    <!-- <LayoutHeaderSearch2 :isRtl="isRtl"/> -->
    <LayoutHeaderSearch/>
    <!-- <v-app-bar class="ma-5" app :clipped-right="isRtl" :clipped-left="!isRtl">ff</v-app-bar> -->
    <v-navigation-drawer app clipped :right="isRtl">
          <!-- <PagesSearchFilters /> -->
    </v-navigation-drawer>
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