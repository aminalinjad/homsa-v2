<template>
  <v-navigation-drawer
    class="ps-4 navigationClass background"
    :width="filter?344:504"
    app
    floating
    clipped
    :right="isRtl"
  >
    <template v-slot:prepend>
      <v-card flat color="background" class="my-3" v-if="isFilter">
        <v-row>
          <v-col cols="12" class="pt-0 pb-1">
            <PagesSearchResultTitle />
          </v-col>
          <v-col cols="12">
            <v-row class="align-center">
              <v-col class="pe-0">
                <v-btn text width="120" height="40" class="whiteColor" @click="closeFilter">
                  <CloseIcon /> 
                  <span class="greenDark8--text font-regular-14"> بستن فیلتر </span>
                </v-btn>
              </v-col>
              <v-col class="ps-0">
                <div class="d-flex align-center cursorPointer"  @click="closeFilter">
                  <span class="me-2 font-regular-12 secondary--text">مشاهده ۳۴ مورد اقامتگاه</span>
                  <ArrowLeftIcon />
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card
      flat
      class="mt-3 pb-4 rounded-t-lg rounded-b-0"
      v-else
      >
      <v-row class="mb-0">
        <v-col class="px-7 d-flex justify-space-between align-center">
          <PagesSearchResultTitle />
        <v-btn text width="86" height="40" class="greyLight1" @click="showFilter">
                  <FilterIcon /> 
                  <span class="greenDark8--text font-regular-14"> فیلتر </span>
                </v-btn>
        </v-col>

      </v-row>
      <v-divider></v-divider>
        
        
      </v-card>
    </template>
    <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
      <PagesSearchFilters v-if="isFilter"/>
    <v-card 
    flat
    tile
    v-else>
     <!-- <v-row class="ma-0">
          <v-col
            cols="12"
            :md="ifGridView ? 4 : 12"
            v-for="(result, index) in results"
            :key="index"
            class="pt-10 pb-11 px-6 resultBorder"
            :class="ifRtl ? 'resultSideBorderRtl' : 'resultSideBorderLtr'"
          >

            <PagesSearchResultItem :ifGridView="ifGridView" :index="index" />
          </v-col>
        </v-row> -->
    </v-card>
    
  </vue-custom-scrollbar>
    
  </v-navigation-drawer>
</template>

<script>
import CloseIcon from "~/assets/images/icons/ic-delete.svg?inline";
import FilterIcon from "~/assets/images/icons/ic-filter.svg?inline";
import ArrowLeftIcon from "~/assets/images/icons/ic-arrow-left.svg?inline";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
  components: { CloseIcon, ArrowLeftIcon, FilterIcon, vueCustomScrollbar},
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
      settings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false
      }
    }
  },
  computed: {
    isFilter() {
      return this.filter;
    }

  },
  methods: {
    showFilter() {
      this.filter = true;
    }, 
    closeFilter() {
      this.filter = false;
    },
    scrollHanle(evt) {
      console.log(evt)
    }
  }
};
</script>

<style lang="scss" scoped>
.navigationClass {
  padding-top: 112px !important;
}

.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>