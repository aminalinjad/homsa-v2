<template>
  <div>
    <div v-for="(filter, index) in filters" :key="index" class="mb-3">
      <div v-if="filter.type =='map'">
        <PagesSearchMapThumbnail />
      </div>
      <div v-if="filter.type == 'price'">
        <v-card flat class="rounded-lg py-4 px-5">
          <div id="histogramSection">
            <div>
              <span class="font-regular-14">
                {{ priceTitle }}
              </span>
            </div>
            <div class="d-flex justify-center rangeSlider">
              <client-only>
                <HistogramSlider
                v-if="nextTick"
                  :width="histogramWidth"
                  :hideFromTo="true"
                  :dragInterval="true"
                  :grid="false"
                  :bar-height="70"
                  primaryColor="#3591384D"
                  holderColor="#35913826"
                  handleColor="#359138"
                  gridTextColor="#359138"
                  :handleSize="12"
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
              class="d-flex justify-space-around mt-7 text-center text-caption"
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
                    readonly
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
                    readonly
                  >
                  </v-text-field>
                </div>
                <div>تومان</div>
              </div>
            </div>

            <div class="d-flex justify-center mt-5">
              <v-btn color="primary" class="font-medium-14" outlined :disabled="rangeBtnDisable">
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
            <v-expansion-panel class="rounded-lg">
              <v-expansion-panel-header class="font-weight-bold">{{
                filter.title
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div
                  v-for="(item, index) in filter.options"
                  :key="index"
                  class="d-flex justify-space-between mb-2 font-light-14"
                >
                  <div>{{ item }}</div>
                  <div>
                    <span>
                      <v-icon>mdi-plus-circle-outline</v-icon>
                    </span>
                    <span>1</span>
                    <span>
                      <v-icon>mdi-minus-circle-outline</v-icon>
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
                  <span class="black--text">{{ item }}</span>
                </div>
                <div>
                  <span>
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </span>
                  <span>1</span>
                  <span>
                    <v-icon>mdi-minus-circle-outline</v-icon>
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <!-- boolean -->
      <div v-else-if="filter.type == 'boolean'">
        <v-card flat class="rounded-lg">
          <v-card-text class="py-1">
            <v-switch
              inset
              :label="filter.label"
              class="pt-0 mt-3 mb-n2"
            ></v-switch>
          </v-card-text>
        </v-card>
      </div>

      <!-- select -->
      <div v-else-if="filter.type == 'select'">
        <v-expansion-panels v-model="filter.expand" multiple flat>
          <v-expansion-panel class="rounded-lg">
            <v-expansion-panel-header>{{
              filter.title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
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
        <v-card flat class="rounded-t-lg">
          <v-card-title class="pb-0"> {{ filter.title }}</v-card-title>
        </v-card>
        <div v-for="(item, index) in filter.options" :key="index" class="mb-1">
          <v-expansion-panels v-model="item.expand" multiple flat>
            <v-expansion-panel>
              <v-expansion-panel-header>{{
                item.title
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
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
      nextTick: true,
      expansionOpen: [0],
      expansionclose: [],
      sliderBtnText: "اعمال محدوده قیمت",
      priceTitle: "محدوده قیمت",
      data: [
        20012, 33012, 35012, 44012, 48012, 49812, 50012, 50122, 50212,
        51012, 51412, 56012, 60012,
      ],
      rangeSliderFrom: null,
      rangeSliderTo: null,
      histogramSectionWidth: null,
      rangeBtnDisable: true
    };
  },
  computed: {
    histogramWidth() {
      return this.histogramSectionWidth;
    },
    histogramData() {
      let filters = this.filters
      for (let i=0; i < filters.length; i++) {
        if(filters[i].type == 'price') {
          let data = filters[i].options;
          let histogramArray = []
          for(let j=0; j< data.length; j++) {
            for(let x=0; x< data[j].count; x++) {
              histogramArray.push(data[j].price)
            }
          }
          // console.log('here is hstgrm arr', histogramArray);
          return histogramArray;
        } 
      }
      // console.log('no price');

    }
  },
  mounted() {
    this.calculateSectionWidth();
    window.addEventListener("resize", this.calculateSectionWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.calculateSectionWidth);
  },
  methods: {
    selectRange(e) {
      // console.log("drag result", e.from, e.to);
      this.rangeSliderFrom = e.from;
      this.rangeSliderTo = e.to;
      this.rangeBtnDisable= false;
    },
    calculateSectionWidth() {
      let width = document.getElementById("histogramSection");
      // console.log("here is width", width.offsetWidth);
      // console.log("here is clientWidth width", width.clientWidth);
      this.histogramSectionWidth = width.clientWidth;
      this.nextTicker();
    },
    nextTicker() {
      this.nextTick = false;
      this.$nextTick(() => {
        this.nextTick = true;
      });
    },
  },
};
</script>

<style lang="scss">

//  histogram slider
.v-text-field.v-text-field--solo .v-input__control input {
  text-align: center!important;
}

.irs--round .irs-handle {
  // top: calc(67% - var(--handle-size)/2 + 5px)!important;
  margin-top: 8px!important;
}
</style>
