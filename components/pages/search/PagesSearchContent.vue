<template>
  <v-container class="px-md-0 pt-0">
    <!-- Top Section Start  -->
    <v-row class="mb-3 align-center">
      <v-col lg="7">
        <PagesSearchResultTitle/>
      </v-col>
      <v-col lg="5">
        <v-row justify="end" align="center" class="ma-0">
          <v-row align="center" class="ma-0">
            <span class="font-regular-12 secondary--text">
              {{ $t("search.main.sort-by") }}
            </span>
            <div class="sortByInput ms-3 mb-n7">
              <v-select
                :items="sortBy"
                @change="changeTheSortSelect"
                item-text="text"
                item-value="value"
                v-model="sortByDefault"
                solo
                flat
                dense
                class="font-regular-12"
              ></v-select>
            </div>
          </v-row>
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
        </v-row>
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
              <AppItemCarousel/>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider class="greyLight4"></v-divider>
      <!-- Top Sec End -->

      <!-- Result Sec Start -->
      <v-row v-if="getSearchResult.data.length !== 0" class="ma-0">
        <v-col
          cols="12"
          :md="ifGridView ? 4 : 12"
          v-for="(result, index) in getSearchResult.data"
          :key="index"
          class="px-6 resultBorder cursorPointer"
          :class="[
            $vuetify.rtl ? 'resultSideBorderRtl' : 'resultSideBorderLtr',
            ifGridView ? 'py-10' : 'py-6',
          ]"
          @click="itemPage"
        >
          <!-- item component -->

          <PagesSearchResultItem :place="result" :ifGridView="ifGridView" :index="index"/>

        </v-col>
      </v-row>

      <v-row style="min-height: 400px" v-else
             class="text-center justify-center align-content-center align-center fill-height flex-column">
        <v-icon size="126">$noResults</v-icon>
        <div class="font-regular-14 secondary--text>">اقامتگاهی یافت نشد!</div>
      </v-row>
      <!-- Result Sec End -->
    </div>
    <!-- Main Section End  -->

    <!-- Bottom Section Start  -->
    <v-row class="paginationContainer justify-center mt-6">
      <v-pagination
        v-if="getSearchResult.last_page > 1"
        @input="changePagination()"
        v-model="currentPage"
        class="paginationWidth46"
        :total-visible="7"
        :length="getSearchResult.last_page"
        :class="{ 'farsiFontPagination': $vuetify.rtl }"
      ></v-pagination>
    </v-row>

    <PagesSearchRelatedSearch/>
    <!-- Bottom Section End  -->
  </v-container>
</template>

<script>
import GridIcon from "@/assets/AppIcons/grid.vue"
import ListIcon from "@/assets/AppIcons/list.vue"
import {mapActions, mapGetters} from "vuex"
import * as types from "@/store/types.js"
import {SearchServices} from "@/services"

export default {
  components: {
    GridIcon,
    ListIcon,
  },
  data() {
    return {
      page: 1,
      currentPage: Number(this.$route.query.page) || 1,
      gridViewResult: true,
      sortByDefault: "popular",
      sortBy: [
        {text: 'بهترین تجربه', value: 'popular'},
        {text: 'ارزان ترین', value: 'cheapest'},
        {text: 'گران ترین', value: 'priciest'},
        {text: 'تخفیف دار', value: 'discount'},
      ],
    };
  },
  watch: {
    getSearchResult: {
      immediate: false,
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.currentPage = newValue.current_page
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`,
      getRequestData: `modules/requestData/${types.requestData.getters.GET_REQUEST_DATA}`,
    }),
    ifGridView() {
      if (this.gridViewResult) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setRequestData: `modules/requestData/${types.requestData.actions.SET_REQUEST_DATA}`,
    }),
    changeTheSortSelect() {
      setTimeout(() => {
        this.$nuxt.$loading.start()
      }, 1)

      this.$router.push({query: {...this.$route.query, sort: this.sortByDefault}})

      let data = {...this.getRequestData}
      data.sort = this.sortByDefault
      this.setRequestData(data)

      SearchServices.searchResults(data).then(res => {
        this.setSearchResult(res.data)
        this.$nuxt.$loading.finish()
      }).catch(err => {
      })
    },
    changePagination() {
      setTimeout(() => {
        this.$nuxt.$loading.start()
      }, 1)

      let qs = {}
      if (this.currentPage > 1) qs.page = this.currentPage

      this.$router.push({query: {...this.$route.query, page: qs.page}})

      let data = {...this.getRequestData}
      data.page = this.currentPage
      this.setRequestData(data)

      SearchServices.searchResults(data).then(res => {
        this.setSearchResult(res.data)
        this.$nuxt.$loading.finish()
      }).catch(err => {

      })
    },
    listView() {
      this.gridViewResult = false;
    },
    gridView() {
      this.gridViewResult = true;
    },
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
