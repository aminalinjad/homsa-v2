<template>
  <div>
    <div v-for="(filter, filterIndex) in filters" :key="filterIndex">
      <!-- map -->
      <div
        v-if="filter.type === 'map' && $route.query.showMap !== 'true'"
        class="mb-3"
      >
        <PagesSearchMapThumbnail />
      </div>
      <!-- price -->
      <div v-if="filter.type === 'price'" class="mb-3">
        <v-card flat class="rounded-lg py-3 px-5 histogramSectionCard">
          <div id="histogramSection">
            <div>
              <span class="font-regular-14">
                {{ $t("search.filters.price.title") }}
              </span>
            </div>
            <div class="d-flex justify-center mt-2 rangeSlider">
              <client-only>
                <HistogramSlider
                  :width="histogramWidth"
                  :hideFromTo="true"
                  :dragInterval="true"
                  :grid="false"
                  :bar-height="26"
                  primaryColor="#3591384D"
                  holderColor="#35913826"
                  :handleColor="
                    $vuetify.theme.dark
                      ? $vuetify.theme.themes.dark.primary
                      : $vuetify.theme.themes.light.primary
                  "
                  :gridTextColor="
                    $vuetify.theme.dark
                      ? $vuetify.theme.themes.dark.primary
                      : $vuetify.theme.themes.light.primary
                  "
                  :handleSize="10"
                  :barGap="1"
                  :barRadius="0"
                  :histSliderGap="0"
                  :min="filter.min"
                  :max="filter.max"
                  :step="filter.step"
                  :data="histogramData"
                  :clip="false"
                  class="histogramStyle"
                  @finish="selectRange"
                />
              </client-only>
            </div>

            <div
              class="
                d-flex
                justify-space-around
                mt-4
                text-center
                font-regular-12
              "
            >
              <div class="mx-5">
                <div>{{ $t("search.filters.price.from") }}</div>
                <div class="mt-1 mb-n6 centeredInput">
                  <v-text-field
                    filled
                    dense
                    solo
                    flat
                    background-color="greyLight4"
                    v-model="rangeSliderFrom"
                    :value="filter.min"
                    class="font-regular-12"
                    @input="inputRange"
                  >
                  </v-text-field>
                </div>
                <div>{{ $t("search.filters.price.unit") }}</div>
              </div>
              <div class="mx-5">
                <div>{{ $t("search.filters.price.to") }}</div>
                <div class="mt-1 mb-n6">
                  <v-text-field
                    filled
                    dense
                    solo
                    flat
                    background-color="greyLight4"
                    v-model="rangeSliderTo"
                    class="font-regular-12"
                    @input="inputRange"
                  >
                  </v-text-field>
                </div>
                <div>{{ $t("search.filters.price.unit") }}</div>
              </div>
            </div>

            <div class="d-flex justify-center mt-5">
              <v-btn
                color="primary"
                class="font-medium-14"
                outlined
                :disabled="rangeBtnDisable"
                @click="filterPrice"
              >
                {{ $t("search.filters.price.btn") }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
      <!-- counter -->
      <div v-else-if="filter.type === 'counter'" class="mb-3">
        <v-card flat class="rounded-lg">
          <v-card-text class="py-3">
            <div class="d-flex justify-space-between px-2">
              <div>
                <span class="greenDark8--text font-regular-14">{{
                  filter.name
                }}</span>
              </div>
              <div v-if="filterPanelSettings[filterIndex]">
                <v-btn
                  small
                  icon
                  depressed
                  @click="addCounter(filter.slug, filterIndex)"
                >
                  <AddIcon
                    size="16"
                    :clr="$vuetify.theme.themes.light.greenDark8"
                  />
                </v-btn>
                <span
                  class="px-2 greenDark8--text"
                  :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
                  v-if="filterPanelSettings[filterIndex]"
                  >{{ filterPanelSettings[filterIndex].count }}</span
                >
                <v-btn
                  small
                  class="me-n3"
                  icon
                  depressed
                  @click="minusCounter(filter.slug, filterIndex)"
                >
                  <MinusIcon
                    size="16"
                    :clr="
                      filterPanelSettings[filterIndex].count === 0
                        ? $vuetify.theme.themes.light.secondary
                        : $vuetify.theme.themes.light.greenDark8
                    "
                  />
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- counter list-->
      <div v-else-if="filter.type === 'list_counter'" class="mb-3">
        <v-expansion-panels
          flat
          v-model="filterPanelSettings[filterIndex].expand"
          v-if="filterPanelSettings[filterIndex]"
        >
          <v-expansion-panel class="rounded-lg countTitle">
            <v-expansion-panel-header class="font-regular-14 navyDark--text">{{
              filter.name
            }}</v-expansion-panel-header>
            <v-expansion-panel-content
              :class="
                filterPanelSettings[filterIndex].expand === 0 ? 'mt-n4' : ''
              "
            >
              <v-row
                v-for="(item, index) in filter.children"
                :key="index"
                class="
                    ma-1
                    mb-n1
                    d-flex
                    justify-space-between
                    align-center
                    font-light-14
                  "
              >
                <div class="font-regular-12 greenDark8--text">
                  {{ item.name }}
                </div>
                <div class="font-medium-12">
                  <v-btn
                    small
                    icon
                    depressed
                    @click="
                      addCounterList(filter.slug, filterIndex, item, index)
                    "
                  >
                    <AddIcon
                      size="16"
                      :clr="$vuetify.theme.themes.dark.greenDark8"
                    />
                  </v-btn>
                  <span
                    class="px-2 greenDark8--text"
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
                    v-if="filterPanelSettings[filterIndex]"
                  >
                    {{
                      filterPanelSettings[filterIndex].ItemCounts[index].count
                    }}
                  </span>
                  <v-btn
                    small
                    class="me-n3"
                    icon
                    depressed
                    @click="
                      minusCounterList(filter.slug, filterIndex, item, index)
                    "
                  >
                    <MinusIcon
                      size="16"
                      :clr="
                        filterPanelSettings[filterIndex].ItemCounts[index]
                          .count === 0
                          ? $vuetify.theme.themes.light.secondary
                          : $vuetify.theme.themes.light.greenDark8
                      "
                    />
                  </v-btn>
                </div>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- boolean /switch -->
      <div v-else-if="filter.type === 'switch'" class="mb-3">
        <v-card flat class="rounded-lg" height="46">
          <v-card-text class="py-1 filterBoolean">
            <v-switch
              inset
              dense
              :label="filter.name"
              class="pt-0 mt-2"
              v-model="filterPanelSettings[filterIndex].value"
              @change="
                filterSwitch(
                  filter.slug,
                  filterPanelSettings[filterIndex].value
                )
              "
              v-if="filterPanelSettings[filterIndex]"
            ></v-switch>
          </v-card-text>
        </v-card>
      </div>

      <!-- select / checkbox -->
      <div v-else-if="filter.type === 'list_checkbox'" class="mb-3">
        <v-expansion-panels
          flat
          v-model="filterPanelSettings[filterIndex].expand"
          v-if="filterPanelSettings[filterIndex]"
        >
          <v-expansion-panel class="rounded-lg filterSelect">
            <v-expansion-panel-header
              class="navyDark--text py-3 px-4 font-regular-14"
              >{{ filter.name }}</v-expansion-panel-header
            >
            <v-expansion-panel-content
              class="mx-n2"
              :class="
                filterPanelSettings[filterIndex].expand === 0 ? 'mb-n3' : ''
              "
            >
              <v-row
                v-for="(item, index) in filter.children"
                :key="index"
                class="ma-0 mb-2 font-light-14"
              >
                <v-checkbox
                  off-icon="$checkBox"
                  on-icon="$checkBoxActive"
                  class="mt-0 mb-n5 pa-0 checkBoxClass"
                  :label="item.name"
                  v-model="
                    filterPanelSettings[filterIndex].listCheckBoxValues[index]
                      .value
                  "
                  @change="
                    filterCheckBox(
                      filter.slug,
                      item.id,
                      filterPanelSettings[filterIndex].listCheckBoxValues[index]
                        .value
                    )
                  "
                ></v-checkbox>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- selectGroup -->
      <div v-else-if="filter.type === 'list'" class="mb-3">
        <v-card flat class="rounded-t-lg mb-n1">
          <v-card-title class="pt-3 pb-0 font-medium-14 greenDark8--text">
            {{ filter.name }}</v-card-title
          >
        </v-card>
        <div
          v-for="(filterChild, filterChildIndex) in filter.children"
          :key="filterChildIndex"
          class="mb-1"
          v-if="filterPanelSettings[filterIndex]"
        >
          <v-expansion-panels
            flat
            v-model="filterPanelSettings[filterIndex][filterChildIndex].expand"
          >
            <v-expansion-panel
              class="filterSelect"
              :class="filterChildIndex === 0 ? 'rounded-0' : ''"
            >
              <v-expansion-panel-header
                class="px-4 navyDark--text font-regular-14"
                >{{ filterChild.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content
                class="mx-n2 "
                :class="
                  filterPanelSettings[filterIndex][filterChildIndex].expand ===
                  0
                    ? 'mb-n3'
                    : ''
                "
              >
                <v-row
                  v-for="(filterChildItem,
                  filterChildItemIndex) in filterChild.children"
                  :key="filterChildItemIndex"
                  class="ma-0 mb-2 font-light-14"
                >
                  <v-checkbox
                    off-icon="$checkBox"
                    on-icon="$checkBoxActive"
                    class="mt-0 mb-n5 pa-0 checkBoxClass"
                    :label="filterChildItem.name"
                    v-model="
                      filterPanelSettings[filterIndex][filterChildIndex]
                        .listCheckBoxValues[filterChildItemIndex].value
                    "
                    @change="
                      filterCheckBox(
                        filter.slug,
                        filterChildItem.id,
                        filterPanelSettings[filterIndex][filterChildIndex]
                          .listCheckBoxValues[filterChildItemIndex].value
                      )
                    "
                  ></v-checkbox>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as types from "@/store/types.js";
import { SearchServices } from "@/services";
import MinusIcon from "@/assets/AppIcons/minus.vue";
import AddIcon from "@/assets/AppIcons/add.vue";

export default {
  props: {},
  components: {
    MinusIcon,
    AddIcon
  },
  data() {
    return {
      filterPanelSettings: [],
      filterTypes: [],
      dataHistogram: [
        20012,
        33012,
        35012,
        44012,
        48012,
        49812,
        50012,
        50122,
        50212,
        51012,
        51412,
        56012,
        60012
      ],
      rangeSliderFrom: null,
      rangeSliderTo: null,
      histogramSectionWidth: null,
      rangeBtnDisable: true
    };
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`
    }),
    histogramWidth() {
      return this.histogramSectionWidth;
    },
    histogramData() {
      let filters = this.filters;
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].type === "price") {
          let data = filters[i].options;
          let histogramArray = [];
          for (let j = 0; j < data.length; j++) {
            for (let x = 0; x < data[j].count; x++) {
              histogramArray.push(data[j].price);
            }
          }
          return histogramArray;
        }
      }
    },
    setDataFromUrlQueries() {
      let routeQueries = this.$route.query;
      let filterTypes = this.filterTypes;
      for(let[routeQueryKey, routeQueryValue] of Object.entries(routeQueries)) {
        for(let filterTypeIndex; filterTypeIndex < filterTypes.length; filterTypeIndex ++ ) {
          if(routeQueryKey.includes(filterTypes[filterTypeIndex].slug)) {
            console.log('sahar nasri',routeQueryKey, filterTypes[filterTypeIndex].slug, filterTypes[filterTypeIndex].type)
          }
        }
      }
      return this.$route.query;
    }
  },
  mounted() {
    this.calculateSectionWidth();
    this.filterPanelSettingsHandler();
    window.addEventListener("resize", this.calculateSectionWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.calculateSectionWidth);
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`
    }),
    filterPanelSettingsHandler() {
      let filters = this.filters;
      let filtersLength = filters.length;
      for (let filterIndex = 0; filterIndex < filtersLength; filterIndex++) {
        this.filterTypes.push({
          slug: filters[filterIndex].slug,
          type: filters[filterIndex].type
        })
        if (filters[filterIndex].type === "counter") {
          this.filterPanelSettings.push({
            expand: 0,
            count: this.$route.query[this.filters[filterIndex].slug] ? this.$route.query[this.filters[filterIndex].slug] : 0
          });
        } else if (filters[filterIndex].type === "list_counter") {
          let listCounterItemCounts = [];
          for (
            let listCounterItemIndex = 0;
            listCounterItemIndex < filters[filterIndex].children.length;
            listCounterItemIndex++
          ) {
            listCounterItemCounts.push({
              count: this.$route.query[
                `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listCounterItemIndex].id}]`
              ]
                ? this.$route.query[
                    `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listCounterItemIndex].id}]`
                  ]
                : 0
            });
          }
          this.filterPanelSettings.push({
            expand: 0,
            ItemCounts: listCounterItemCounts
          });
        } else if (this.filters[filterIndex].type === "switch") {
          this.filterPanelSettings.push({
            expand: 0,
            value: this.$route.query[this.filters[filterIndex].slug] ? this.$route.query[this.filters[filterIndex].slug] : false
          });
        } else if (this.filters[filterIndex].type === "list_checkbox") {
          let listCheckBoxValue = [];
          for (
            let listItemIndex = 0;
            listItemIndex < this.filters[filterIndex].children.length;
            listItemIndex++
          ) {
            listCheckBoxValue.push({
              value: !!this.$route.query[
                `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listItemIndex].id}]`
                ]
            });
          }
          this.filterPanelSettings.push({
            expand: 0,
            listCheckBoxValues: listCheckBoxValue
          });
        } else if (this.filters[filterIndex].type === "list") {
          let openGroupExpansionPanels = [];
          for (
            let listItemIndex = 0;
            listItemIndex < this.filters[filterIndex].children.length;
            listItemIndex++
          ) {
            let listCheckBoxValue = [];
            for (
              let listItemChildIndex = 0;
              listItemChildIndex <
              this.filters[filterIndex].children[listItemIndex].children.length;
              listItemChildIndex++
            ) {
              listCheckBoxValue.push({
                value: !!this.$route.query[
                  `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listItemIndex].children[listItemChildIndex].id}]`
                  ]
              });
            }
            openGroupExpansionPanels.push({
              expand: 0,
              listCheckBoxValues: listCheckBoxValue
            });
          }
          this.filterPanelSettings.push(openGroupExpansionPanels);
        } else {
          this.filterPanelSettings.push({
            expand: 0
          });
        }
      }
    },
    inputRange() {
      if (this.rangeSliderFrom && this.rangeSliderTo) {
        this.rangeBtnDisable = false;
      } else {
        this.rangeBtnDisable = true;
      }
    },
    selectRange(e) {
      this.rangeSliderFrom = e.from;
      this.rangeSliderTo = e.to;
      this.rangeBtnDisable = false;
    },
    calculateSectionWidth() {
      let width = document.getElementById("histogramSection");
      if (width) {
        this.histogramSectionWidth = width.clientWidth;
      }
    },
    filterPrice() {},
    addCounter(filterSlug, filterIndex) {
      this.filterPanelSettings[filterIndex].count++;
      this.filterCounter(
        filterSlug,
        this.filterPanelSettings[filterIndex].count
      );
    },
    minusCounter(filterSlug, filterIndex) {
      if (this.filterPanelSettings[filterIndex].count > 0) {
        this.filterPanelSettings[filterIndex].count--;
        this.filterCounter(
          filterSlug,
          this.filterPanelSettings[filterIndex].count
        );
      }
    },
    addCounterList(filterSlug, filterIndex, item, itemIndex) {
      this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count++;
      this.filterCounterList(
        filterSlug,
        item.id,
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count
      );
    },
    minusCounterList(filterSlug, filterIndex, item, itemIndex) {
      if (
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count > 0
      ) {
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count--;
        this.filterCounterList(
          filterSlug,
          item.id,
          this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count
        );
      }
    },
    filterCounter(filterSlug, count) {
      this.$nuxt.$loading.start();
      let data = {
        q: "tehran",
        page: 1,
        sort: "popular",
        [filterSlug]: count
      };
      return SearchServices.searchResults(data).then(res => {
        if (count > 0) {
          this.$router.push({
            query: { ...this.$route.query, [filterSlug]: count }
          });
        } else {
          this.$router.push({
            query: { ...this.$route.query, [filterSlug]: undefined }
          });
        }
        this.setSearchResult(res.data);
        this.$nuxt.$loading.finish();
      });
    },
    filterCounterList(filterSlug, itemId, itemCount) {
      this.$nuxt.$loading.start();
      let filterCounterListItems = [];
      let routeQueryKeys = Object.keys(this.$route.query);
      for (
        let routeQueryKeyIndex = 0;
        routeQueryKeyIndex < routeQueryKeys.length;
        routeQueryKeyIndex++
      ) {
        if (routeQueryKeys[routeQueryKeyIndex].includes(filterSlug)) {
          let previousItemId = parseInt(
            routeQueryKeys[routeQueryKeyIndex].substring(
              filterSlug.length + 1,
              routeQueryKeys[routeQueryKeyIndex].length - 1
            )
          );
          if (previousItemId !== itemId) {
            let previousItemCount = this.$route.query[
              routeQueryKeys[routeQueryKeyIndex]
            ];
            filterCounterListItems.push({
              id: previousItemId,
              count: previousItemCount
            });
          }
        }
      }
      filterCounterListItems.push({
        id: itemId,
        count: itemCount
      });

      let data = {
        q: "tehran",
        page: 1,
        sort: "popular",
        [filterSlug]: filterCounterListItems
      };
      return SearchServices.searchResults(data).then(res => {
        if (itemCount > 0) {
          this.$router.push({
            query: {
              ...this.$route.query,
              [`${filterSlug}[${itemId}]`]: itemCount
            }
          });
        } else {
          this.$router.push({
            query: {
              ...this.$route.query,
              [`${filterSlug}[${itemId}]`]: undefined
            }
          });
        }
        this.setSearchResult(res.data);
        this.$nuxt.$loading.finish();
      });
    },
    filterSwitch(filterSlug, switchValue) {
      this.$nuxt.$loading.start();
      let data = {
        q: "tehran",
        page: 1,
        sort: "popular"
      };
      data[filterSlug] = switchValue;
      return SearchServices.searchResults(data).then(res => {
        if (switchValue) {
          this.$router.push({
            query: { ...this.$route.query, [filterSlug]: switchValue }
          });
        } else {
          this.$router.push({
            query: { ...this.$route.query, [filterSlug]: undefined }
          });
        }

        this.setSearchResult(res.data);
        this.$nuxt.$loading.finish();
      });
    },
    filterCheckBox(filterSlug, checkBoxItemId, checkBoxValue) {
      this.$nuxt.$loading.start();
      let data = {
        q: "tehran",
        page: 1,
        sort: "popular"
      };
      let filterCheckBoxItems = [];

      // if the value is true so the item should be add in array for adding to data later
      if (checkBoxValue) {
        filterCheckBoxItems.push(checkBoxItemId);
      }

      // get all queries
      let routeQueryKeys = Object.keys(this.$route.query);
      if (routeQueryKeys.length > 0) {
        for (
          let routeQueryKeyIndex = 0;
          routeQueryKeyIndex < routeQueryKeys.length;
          routeQueryKeyIndex++
        ) {
          let routeQueryValue = parseInt(
            this.$route.query[routeQueryKeys[routeQueryKeyIndex]]
          );
          // check if this filter slug exist in queries
          if (routeQueryKeys[routeQueryKeyIndex].includes(filterSlug)) {
            // check if this selected item in this filter added before, It should be removed from query
            if (routeQueryValue === checkBoxItemId) {
              this.$router.push({
                query: {
                  ...this.$route.query,
                  [routeQueryKeys[routeQueryKeyIndex]]: undefined
                }
              });
            } else {
              // add other previous item of this filter to array
              if (routeQueryValue) {
                filterCheckBoxItems.push(routeQueryValue);
              }
            }
          } else {
            // this filter slug does not exist in queries before
            filterCheckBoxItems.push(checkBoxItemId);
          }
        }
      }

      // check if this filter item array is not empty, so add it to data
      if (filterCheckBoxItems.length > 0) {
        data[filterSlug] = filterCheckBoxItems;
      }

      return SearchServices.searchResults(data).then(res => {
        if (checkBoxValue) {
          this.$router.push({
            query: {
              ...this.$route.query,
              [`${filterSlug}[${checkBoxItemId}]`]: checkBoxItemId
            }
          });
        }
        this.setSearchResult(res.data);
        this.$nuxt.$loading.finish();
      });
    }
  }
};
</script>

<style lang="scss">
//  histogram slider
.histogramSectionCard {
  height: 238px;

  .v-text-field {
    &--box {
      .v-input {
        &__slot {
          min-height: 24px !important;
        }
      }
    }
    &--solo {
      .v-input {
        &__control input {
          text-align: center !important;
        }
      }
    }
  }
  .v-input {
    &__slot {
      min-height: 24px !important;
    }
  }

  .irs {
    &--round {
      .irs-handle {
        margin-top: 8px !important;
      }

      .irs-line {
        height: 4px !important;
      }

      .irs-bar {
        height: 4px !important;
      }
    }
  }
}

.filterBoolean {
  .v-input {
    &--switch {
      &.v-input {
        &--dense {
          .v-input {
            &--switch {
              &__thumb {
                color: var(--v-whiteColor-base) !important;
              }
            }
          }
        }
      }
      &--inset {
        .v-input {
          &--switch {
            &__track {
              opacity: 1 !important;
            }
          }
        }
      }
    }
  }

  .v-label {
    font-size: 14px !important;
  }
}

.filterBoolean {
  .theme {
    &--light {
      .v-label {
        color: var(--v-navyDark-base) !important;
      }
    }
  }
}

.filterSelect {
  .v-expansion-panel-header {
    min-height: 46px !important;
    .v-icon {
      font-size: 18px !important;
    }
  }

  .theme {
    &--light {
      &.v-label {
        color: var(--v-greenDark8-base);
        font-size: 12px !important;
      }
    }
  }

  .checkBoxClass {
    .v-input {
      &--selection-controls {
        &__input {
          width: 18px !important;
        }
      }
    }
  }
}

.countTitle {
  .v-expansion-panel-header {
    .v-icon {
      font-size: 18px !important;
    }
  }
}
</style>
