<template>
  <div>
    <div v-for="(filter, index) in filters" :key="index" class="mb-3">
      <!-- map -->
      <div v-if="filter.type == 'map'">
        <PagesSearchMapThumbnail />
      </div>
      <!-- price -->
      <div v-if="filter.type == 'price'">
        <v-card flat class="rounded-lg py-3 px-5 histogramSectionCard">
          <div id="histogramSection">
            <div>
              <span class="font-regular-14">
                {{ priceTitle }}
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
                <div>از</div>
                <div class="mt-1 mb-n6 centeredInput">
                  <v-text-field
                    filled
                    dense
                    solo
                    flat
                    background-color="#F5F5F5"
                    v-model="rangeSliderFrom"
                    :value="filter.min"
                    class="font-regular-12"
                    @input="inputRange"
                  >
                  </v-text-field>
                </div>
                <div>تومان</div>
              </div>
              <div class="mx-5">
                <div>تا</div>
                <div class="mt-1 mb-n6">
                  <v-text-field
                    filled
                    dense
                    solo
                    flat
                    background-color="#F5F5F5"
                    v-model="rangeSliderTo"
                    class="font-regular-12"
                    @input="inputRange"
                  >
                  </v-text-field>
                </div>
                <div>تومان</div>
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
                {{ sliderBtnText }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
      <!-- count -->
      <div v-else-if="filter.type == 'count'">
        <!-- count with title -->
        <div v-if="filter.title">
          <v-expansion-panels v-model="filter.expand" multiple flat>
            <v-expansion-panel class="rounded-lg countTitle">
              <v-expansion-panel-header
                class="font-regular-14 navyDark--text"
                >{{ filter.title }}</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <div
                  v-for="(item, index) in filter.options"
                  :key="index"
                  class="d-flex justify-space-between mb-2 font-light-14"
                >
                  <div class="font-regular-12">{{ item }}</div>
                  <div class="font-medium-12">
                    <span>
                      <v-icon small>mdi-plus-circle-outline</v-icon>
                    </span>
                    <span class="px-4">۱</span>
                    <span>
                      <v-icon small>mdi-minus-circle-outline</v-icon>
                    </span>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <!-- count without title -->
        <div v-else>
          <v-card flat class="rounded-lg">
            <v-card-text>
              <div
                v-for="(item, index) in filter.options"
                :key="index"
                class="d-flex justify-space-between px-2"
              >
                <div>
                  <span class="black--text font-regular-14">{{ item }}</span>
                </div>
                <div>
                  <span>
                    <v-icon small>mdi-plus-circle-outline</v-icon>
                  </span>
                  <span class="px-4">۱</span>
                  <span>
                    <v-icon small>mdi-minus-circle-outline</v-icon>
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <!-- boolean -->
      <div v-else-if="filter.type == 'boolean'">
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
      <div v-else-if="filter.type == 'select'">
        <v-expansion-panels v-model="filter.expand" multiple flat>
          <v-expansion-panel class="rounded-lg filterSelect">
            <v-expansion-panel-header
              class="navyDark--text pt-3 pb-2 px-4 font-regular-14"
              >{{ filter.title }}</v-expansion-panel-header
            >
            <v-expansion-panel-content class="mx-n3">
              <div
                v-for="(item, index) in filter.options"
                :key="index"
                class="font-light-14"
              >
                <v-checkbox class="mt-0 mb-n5" :label="item"></v-checkbox>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- selectGroup -->
      <div v-else-if="filter.type == 'selectGroup'">
        <v-card flat class="rounded-t-lg mb-n1">
          <v-card-title class="pt-3 pb-0 font-medium-14 greenDark8--text">
            {{ filter.title }}</v-card-title
          >
        </v-card>
        <div v-for="(item, index) in filter.options" :key="index" class="mb-1">
          <v-expansion-panels v-model="item.expand" multiple flat>
            <v-expansion-panel
              class="filterSelect"
              :class="index == 0 ? 'rounded-0' : ''"
            >
              <v-expansion-panel-header
                class="px-4 pb-2 navyDark--text font-regular-14"
                >{{ item.title }}</v-expansion-panel-header
              >
              <v-expansion-panel-content class="mx-n3">
                <div
                  v-for="(value, index) in item.options"
                  :key="index"
                  class="font-light-14"
                >
                  <v-checkbox class="mt-0 mb-n5" :label="value"></v-checkbox>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // nextTick: true,
      expansionOpen: [0],
      expansionclose: [],
      sliderBtnText: "اعمال محدوده قیمت",
      priceTitle: "محدوده قیمت",
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
    histogramWidth() {
      return this.histogramSectionWidth;
    },
    histogramData() {
      let filters = this.filters;
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].type == "price") {
          let data = filters[i].options;
          let histogramArray = [];
          for (let j = 0; j < data.length; j++) {
            for (let x = 0; x < data[j].count; x++) {
              histogramArray.push(data[j].price);
            }
          }
          // console.log('here is hstgrm arr', histogramArray);
          return histogramArray;
        }
      }
      // console.log('no price');
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
      // console.log("drag result", e.from, e.to);
      this.rangeSliderFrom = e.from;
      this.rangeSliderTo = e.to;
      this.rangeBtnDisable = false;
    },
    calculateSectionWidth() {
      let width = document.getElementById("histogramSection");
      // console.log("here is width", width.offsetWidth);
      // console.log("here is clientWidth width", width.clientWidth);
      this.histogramSectionWidth = width.clientWidth;
      // this.nextTicker();
    },
    // nextTicker() {
    //   this.nextTick = false;
    //   this.$nextTick(() => {
    //     this.nextTick = true;
    //   });
    // },
    filterPrice() {
      console.log(
        "filter price action",
        this.rangeSliderFrom,
        this.rangeSliderTo
      );
    },
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
    // top: calc(67% - var(--handle-size)/2 + 5px)!important;
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
  color: #000022 !important;
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
}

.countTitle .v-expansion-panel-header .v-icon.v-icon {
  font-size: 18px !important;
}
</style>
