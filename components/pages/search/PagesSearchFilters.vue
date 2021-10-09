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
              <div>
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
                    :clr="$vuetify.theme.themes.light.greenDark8"
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
            <v-expansion-panel-content class="mt-n4">
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
                      :clr="$vuetify.theme.themes.dark.greenDark8"
                    />
                  </v-btn>
                </div>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- boolean -->
      <div v-else-if="filter.type === 'switch'" class="mb-3">
        <v-card flat class="rounded-lg" height="46">
          <v-card-text class="py-1 filterBoolean">
            <v-switch
              inset
              dense
              :label="filter.name"
              class="pt-0 mt-2"
            ></v-switch>
          </v-card-text>
        </v-card>
      </div>

      <!-- select -->
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
            <v-expansion-panel-content class="mx-n2 mb-n3">
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
                  @change="filterCheckBox(filter.name, item)"
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
          v-for="(item, index) in filter.children"
          :key="index"
          class="mb-1"
          v-if="filterPanelSettings[filterIndex]"
        >
          <v-expansion-panels
            flat
            v-model="filterPanelSettings[filterIndex][index].expand"
          >
            <v-expansion-panel
              class="filterSelect"
              :class="index === 0 ? 'rounded-0' : ''"
            >
              <v-expansion-panel-header
                class="px-4 navyDark--text font-regular-14"
                >{{ item.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mx-n2 mb-n3">
                <v-row
                  v-for="(value, index) in item.children"
                  :key="index"
                  class="ma-0 mb-2 font-light-14"
                >
                  <v-checkbox
                    off-icon="$checkBox"
                    on-icon="$checkBoxActive"
                    class="mt-0 mb-n5 pa-0 checkBoxClass"
                    :label="value.name"
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
import {mapGetters, mapActions} from "vuex";
import * as types from "@/store/types.js";
import {SearchServices} from "@/services";
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
      data: [
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
    }
  },
  mounted() {
    this.calculateSectionWidth();
    this.filterPanelSettingsHandler();
    window.addEventListener("resize", this.calculateSectionWidth);
    console.log("filters", this.filters);
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
        if (filters[filterIndex].type === "counter") {
          this.filterPanelSettings.push({
            expand: 0,
            count: 1
          });
        } else if (filters[filterIndex].type === "list_counter") {
          let listCounterItemCounts = [];
          for (
            let listCounterItemIndex = 0;
            listCounterItemIndex < filters[filterIndex].children.length;
            listCounterItemIndex++
          ) {
            listCounterItemCounts.push({ count: 1 });
          }
          this.filterPanelSettings.push({
            expand: 0,
            ItemCounts: listCounterItemCounts
          });
        } else if (this.filters[filterIndex].type === "list") {
          let openGroupExpansionPanels = [];
          for (
            let listItemIndex = 0;
            listItemIndex < this.filters[filterIndex].children.length;
            listItemIndex++
          ) {
            openGroupExpansionPanels.push({
              expand: 0
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
      this.filterCounter(filterSlug, this.filterPanelSettings[filterIndex].count)
    },
    minusCounter(filterSlug, filterIndex) {
      if (this.filterPanelSettings[filterIndex].count > 0) {
        this.filterPanelSettings[filterIndex].count--;
      }
    },
    addCounterList(filterSlug, filterIndex, item, itemIndex) {
      this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count++;
    },
    minusCounterList(filterSlug, filterIndex, item, itemIndex) {
      if (this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count > 0) {
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count--;
      }
    },
    filterCounter(filterSlug, value) {
      console.log(filterSlug)
      let data = {
        q: "tehran",
        page: 1,
        sort: "popular",
        [filterSlug]: value
      }
      return SearchServices.searchResults(data).then(res => {
        console.log(res.data)
        this.setSearchResult(res.data);
      })
    },
    filterCounterList(filter, option) {
      console.log("filterTitle, checkBoxItem", filterTitle, checkBoxItem);
    },
    filterCheckBox(filterTitle, checkBoxItem) {
      console.log("filterTitle, checkBoxItem", filterTitle, checkBoxItem);
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
