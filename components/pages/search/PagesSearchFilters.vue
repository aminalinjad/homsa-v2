<template>
  <div>
    <div v-for="(filter, index) in filters" :key="index">
      <!-- map -->
      <div v-if="filter.type === 'map' && !mapLayout" class="mb-3">
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
                  handleColor="#359138"
                  gridTextColor="#359138"
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
      <!-- count -->
      <div v-else-if="filter.type === 'count'" class="mb-3">
        <!-- count with title -->
        <div v-if="filter.title">
          <v-expansion-panels multiple flat>
            <v-expansion-panel class="rounded-lg countTitle">
              <v-expansion-panel-header
                class="font-regular-14 navyDark--text"
                >{{ filter.title }}</v-expansion-panel-header
              >
              <v-expansion-panel-content class="mt-n4">
                <v-row
                  v-for="(item, index) in filter.options"
                  :key="index"
                  class="ma-1 mb-n1 d-flex justify-space-between align-center font-light-14"
                >
                  <div class="font-regular-12  greenDark8--text">{{ item }}</div>
                  <div class="font-medium-12">
                    <v-btn small icon depressed>
                      <AddIcon 
                      size="16"
                      :clr="$vuetify.theme.themes.dark.greenDark8"
                       />
                    </v-btn>
                    <span class="px-2 greenDark8--text">۱</span>
                    <v-btn small class="me-n3" icon depressed>
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

        <!-- count without title -->
        <div v-else>
          <v-card flat class="rounded-lg">
            <v-card-text class="py-3">
              <div
                v-for="(item, index) in filter.options"
                :key="index"
                class="d-flex justify-space-between px-2"
              >
                <div>
                  <span class="greenDark8--text font-regular-14">{{ item }}</span>
                </div>
                <div>
                  <v-btn small icon depressed>
                    <AddIcon 
                    size="16"
                    :clr="$vuetify.theme.themes.light.greenDark8"
                     />
                  </v-btn>
                  <span class="px-2 greenDark8--text">۱</span>
                  <v-btn small class="me-n3" icon depressed>
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
      </div>

      <!-- boolean -->
      <div v-else-if="filter.type === 'boolean'" class="mb-3">
        <v-card flat class="rounded-lg" height="46">
          <v-card-text class="py-1 filterBoolean">
            <v-switch
              inset
              dense
              :label="filter.label"
              class="pt-0 mt-2"
            ></v-switch>
          </v-card-text>
        </v-card>
      </div>

      <!-- select -->
      <div v-else-if="filter.type === 'select'" class="mb-3">
        <v-expansion-panels multiple flat>
          <v-expansion-panel class="rounded-lg filterSelect">
            <v-expansion-panel-header
              class="navyDark--text py-3 px-4 font-regular-14"
              >{{ filter.title }}</v-expansion-panel-header
            >
            <v-expansion-panel-content class="mx-n2 mb-n3">
              <v-row
                v-for="(item, index) in filter.options"
                :key="index"
                class="ma-0 mb-2 font-light-14"
              >
                <v-checkbox off-icon="$checkBox" on-icon="$checkBoxActive"  class="mt-0 mb-n5 pa-0 checkBoxClass" :label="item"></v-checkbox>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- selectGroup -->
      <div v-else-if="filter.type === 'selectGroup'" class="mb-3">
        <v-card flat class="rounded-t-lg mb-n1">
          <v-card-title class="pt-3 pb-0 font-medium-14 greenDark8--text">
            {{ filter.title }}</v-card-title
          >
        </v-card>
        <div v-for="(item, index) in filter.options" :key="index" class="mb-1">
          <v-expansion-panels  multiple flat>
            <v-expansion-panel
              class="filterSelect"
              :class="index === 0 ? 'rounded-0' : ''"
            >
              <v-expansion-panel-header
                class="px-4  navyDark--text font-regular-14"
                >{{ item.title }}</v-expansion-panel-header
              >
              <v-expansion-panel-content class="mx-n2 mb-n3">
                <v-row
                  v-for="(value, index) in item.options"
                  :key="index"
                  class="ma-0 mb-2 font-light-14"
                >
                   <v-checkbox off-icon="$checkBox" on-icon="$checkBoxActive"  class="mt-0 mb-n5 pa-0 checkBoxClass" :label="value"></v-checkbox>
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
import { mapGetters } from "vuex";
import * as types from "@/store/types.js";
import MinusIcon from "@/assets/AppIcons/minus.vue";
import AddIcon from "@/assets/AppIcons/add.vue";

export default {
  props: {},
  components: {
    MinusIcon,
    AddIcon,
  },
  data() {
    return {
      expansionOpen: [0],
      expansionclose: [],
      data: [
        20012, 33012, 35012, 44012, 48012, 49812, 50012, 50122, 50212, 51012,
        51412, 56012, 60012,
      ],
      rangeSliderFrom: null,
      rangeSliderTo: null,
      histogramSectionWidth: null,
      rangeBtnDisable: true,
    };
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
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
  },
  mounted() {
    this.calculateSectionWidth();
    window.addEventListener("resize", this.calculateSectionWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.calculateSectionWidth);
  },
  methods: {
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
      this.histogramSectionWidth = width.clientWidth;
    },
    filterPrice() {},
  },
};
</script>

<style lang="scss">
//  histogram slider
.histogramSectionCard {
  height: 238px;
  .v-text-field--box .v-input__slot,
  .v-input__slot {
    min-height: 24px !important;
  }
  .v-text-field.v-text-field--solo .v-input__control input {
    text-align: center !important;
  }

  .irs--round .irs-handle {
    margin-top: 8px !important;
  }

  .irs--round .irs-line {
    height: 4px !important;
  }

  .irs--round .irs-bar {
    height: 4px !important;
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

.filterBoolean .theme--light.v-label {
  color: var(--v-navyDark-base) !important;
}

.filterSelect .v-expansion-panel-header {
  min-height: 46px !important;
  .v-icon.v-icon {
    font-size: 18px !important;
  }
}

.filterSelect {
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
          width: 18px!important;
        }

      }

    }
    
  }
}

.countTitle .v-expansion-panel-header .v-icon.v-icon {
  font-size: 18px !important;
}
</style>
