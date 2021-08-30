<template>
  <v-app class="iransans">
    <!-- header  -->
    <LayoutHeaderSearch />

    <!-- main  -->
    <v-main class="pt-3">
      <v-container class="" :fluid="$vuetify.breakpoint.md">
        <v-row class="justify-center">
          <v-col class="filterContainer">
            <PagesSearchFilters />
          </v-col>
          <v-col class="resultContainer">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- footer  -->
    <PagesSearchFooter />
  </v-app>
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
.filterContainer {
  flex: 0 0 336px;
  height: max-content;
    position: sticky;
    top: 96px;
}

.resultContainer {
  // flex: 0 0 1008px;
  overflow: hidden;
  height: max-content;
    position: sticky;
    top: 96px;
}
</style>



