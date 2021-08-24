<template>
  <v-app class="iransans">
    <LayoutHeaderSearch />
    <v-main class="pt-3">
      <v-container class="px-0">
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
  </v-app>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped lang="scss">
.filterContainer {
  flex: 0 0 336px;
}

.resultContainer {
  // flex: 0 0 1008px;
  overflow: hidden;
}
</style>



