<template>
  <v-navigation-drawer
    class="ps-4 navigationClass background"
    :width="filter ? 344 : 504"
    app
    floating
    clipped
    :right="isRtl"
  >
    <!-- top section -->
    <template v-slot:prepend>
      <v-card flat color="background" class="my-3" v-if="isFilter">
        <v-row>
          <v-col cols="12" class="pt-0 pb-1">
            <PagesSearchResultTitle :isFilter="isFilter" />
          </v-col>
          <v-col cols="12">
            <v-row class="align-center">
              <v-col class="pe-0">
                <v-btn
                  text
                  width="120"
                  height="40"
                  class="whiteColor"
                  @click="closeFilter"
                >
                  <CloseIcon />
                  <span class="greenDark8--text font-regular-14">
                    بستن فیلتر
                  </span>
                </v-btn>
              </v-col>
              <v-col class="ps-0">
                <div
                  class="d-flex align-center cursorPointer"
                  @click="closeFilter"
                >
                  <span class="me-2 font-regular-12 secondary--text"
                    >مشاهده ۳۴ مورد اقامتگاه</span
                  >
                  <ArrowLeftIcon />
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card flat class="mt-3 pb-4 rounded-t-lg rounded-b-0" v-else>
        <v-row class="mb-0">
          <v-col class="px-7 d-flex justify-space-between align-center">
            <PagesSearchResultTitle />
            <v-btn
              text
              width="86"
              height="40"
              class="greyLight1"
              @click="showFilter"
            >
              <FilterIcon />
              <span class="greenDark8--text font-regular-14"> فیلتر </span>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="greyLight4"></v-divider>
      </v-card>
    </template>

    <!-- content section  -->
    <vue-custom-scrollbar
      class="scroll-area"
      :settings="settings"
      scrollYMarginOffset="20"
    >
      <PagesSearchFilters v-if="isFilter" />
      <v-card flat class="rounded-0" v-else>
        <v-row class="ma-0">
          <v-col
            cols="12"
            v-for="(result, index) in results"
            :key="index"
            class="py-3 px-6 resultBorder"
          >
          <NuxtLink to="">
            <PagesSearchResultItemMap :index="index" />
            </NuxtLink>
          </v-col>
        </v-row>

        <!-- pagination  -->
        <PagesSearchPagination :page="page" :totalPages="totalPages" :mapLayout="true" class="mt-6"/>
      </v-card>
    </vue-custom-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import CloseIcon from "~/assets/images/icons/ic-delete.svg?inline";
import FilterIcon from "~/assets/images/icons/ic-filter.svg?inline";
import ArrowLeftIcon from "~/assets/images/icons/ic-arrow-left.svg?inline";
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
export default {
  components: { CloseIcon, ArrowLeftIcon, FilterIcon, vueCustomScrollbar },
  props: {
    isRtl: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      filter: false,
      ifGridView: false,
      results: [
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
        { name: "dfd" },
      ],
      page: 1,
      totalPages: 15,
      settings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false,
      },
    };
  },
  computed: {
    isFilter() {
      return this.filter;
    },
  },
  methods: {
    showFilter() {
      this.filter = true;
    },
    closeFilter() {
      this.filter = false;
    },
  },
};
</script>

<style lang="scss" >
.navigationClass {
  padding-top: 112px !important;
}

.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}

.ps {
  &__rail-y {
    opacity: 0 !important;
  }
}
</style>