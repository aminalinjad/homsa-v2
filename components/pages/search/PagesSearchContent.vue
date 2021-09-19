<template>
  <v-container class="px-md-0 pt-0">
    <!-- Top Section Start  -->
    <v-row class="mb-3 align-center">
      <v-col>
        <PagesSearchResultTitle />
      </v-col>
      <v-col>
        <div class="d-flex align-center justify-end">
          <div class="d-flex align-center">
            <span class="font-regular-12 secondary--text">
              {{ $t("search.main.sort-by") }}
            </span>
            <div class="sortByInput ms-3 mb-n7">
              <v-select
                :items="sortBy"
                v-model="sortBydefault"
                solo
                flat
                dense
                class="font-regular-12"
              ></v-select>
            </div>
          </div>
          <div class="white rounded ms-8">
            <v-btn
              elevation="0"
              fab
              small
              class="white me-n1"
              :class="$vuetify.rtl ? 'rounded-l-0' : 'rounded-r-0'"
              @click="listView"
            >
              <ListIcon
                :clr="
                  !ifGridView
                    ? $vuetify.theme.dark
                      ? $vuetify.theme.themes.dark.greenDark8
                      : $vuetify.theme.themes.light.greenDark8
                    : null
                "
              />
            </v-btn>
            <v-btn
              elevation="0"
              fab
              small
              class="white"
              :class="$vuetify.rtl ? 'rounded-r-0' : 'rounded-l-0'"
              @click="gridView"
            >
              <GridIcon
                :clr="
                  !ifGridView
                    ? $vuetify.theme.dark
                      ? $vuetify.theme.themes.dark.secondary
                      : $vuetify.theme.themes.light.secondary
                    : null
                "
              />
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- Top Section End  -->

    <!-- Main Section Start   -->
    <div class="white rounded-lg">
      <!-- Top Sec Start-->
      <div class="py-4 px-6">
        <v-row class="ma-0" align="center">
          <v-col cols="1" class="pa-0">
            <div>
              <span class="secondary--text font-regular-14">
                {{ $t("search.main.tags") }}
              </span>
            </div>
          </v-col>
          <v-col cols="11" class="pa-0">
            <div>
              <AppItemCarousel />
            </div>

            <!-- <v-tabs show-arrows>
                <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

                <v-tab v-for="i in 30" :key="i" :href="'#tab-' + i">
                  Item {{ i }}
                </v-tab>
              </v-tabs> -->
          </v-col>
        </v-row>
      </div>
      <v-divider class="greyLight4"></v-divider>
      <!-- Top Sec End -->

      <!-- Result Sec Start -->
      <v-row class="ma-0">
        <v-col
          cols="12"
          :md="ifGridView ? 4 : 12"
          v-for="(result, index) in results"
          :key="index"
          class="px-6 resultBorder cursorPointer"
          :class="[
            $vuetify.rtl ? 'resultSideBorderRtl' : 'resultSideBorderLtr',
            ifGridView ? 'py-10' : 'py-6',
          ]"
          @click="itemPage"
        >
          <!-- item component -->

            <PagesSearchResultItem :ifGridView="ifGridView" :index="index" />

        </v-col>
      </v-row>
      <!-- Result Sec End -->
    </div>
    <!-- Main Section End  -->

    <!-- Bottom Section Start  -->
    <PagesSearchPagination :page="page" :totalPages="totalPages" class="mt-6" />
    <PagesSearchRelatedSearch />
    <!-- Bottom Section End  -->
  </v-container>
</template>

<script>
import GridIcon from "@/assets/AppIcons/grid.vue";
import ListIcon from "@/assets/AppIcons/list.vue";
export default {
  components: {
    GridIcon,
    ListIcon,
  },
  data() {
    return {
      page: 1,
      totalPages: 15,
      gridViewResult: true,
      sortBydefault: "بهترین تجربه",
      sortBy: ["گران ترین", "بهترین تجربه"],
      breadcrumbs: [
        {
          text: "هومسا",
          disabled: false,
          href: "",
        },
        {
          text: "اقامتگاه های استان گیلان",
          disabled: false,
          href: "",
        },
        {
          text: "شهر رشت",
          disabled: true,
          href: "",
        },
      ],
      results: [
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
      ],
    };
  },
  computed: {
    ifGridView() {
      if (this.gridViewResult) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    listView() {
      this.gridViewResult = false;
    },
    gridView() {
      this.gridViewResult = true;
    },
    changed() {},
    updated() {},
    itemPage() {
      this.$router.push('/#')
    }
  },
};
</script>

<style lang="scss">
.sortByInput {
  width: 134px;
}
.resultBorder {
  border-bottom: var(--v-greyLight4-base) solid 1px;
}

.resultSideBorderRtl {
  border-left: var(--v-greyLight4-base) solid 1px;
}

.resultSideBorderLtr {
  border-right: var(--v-greyLight4-base) solid 1px;
}
</style>
