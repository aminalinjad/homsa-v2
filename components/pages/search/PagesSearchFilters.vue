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
      <!-- applied filters-->
      <div
        v-if="filterIndex === 0 && appliedFilterList.length > 0"
        class="mb-3"
      >
        <v-card flat class="pb-3 rounded-lg">
          <v-card-title class="py-3 justify-space-between">
            <span class="font-regular-14">{{
              $t("search.filters.all-filters.title")
            }}</span>
            <v-btn
              small
              text
              class="font-regular-12"
              @click="clearAllFilter(appliedFilterList)"
            >
              {{ $t("search.filters.all-filters.clear-all") }}
            </v-btn>
          </v-card-title>
          <v-card-text class="px-4">
            <v-chip
              small
              v-for="(appliedFilter, appliedFilterIndex) in appliedFilterList"
              :key="appliedFilterIndex"
              color="greyLight1"
              text-color="secondary"
              close-icon="$close"
              class="me-3 mb-3"
              close
              @click:close="clearFilter(appliedFilter, appliedFilterIndex)"
            >
              <span
                v-if="appliedFilter.count"
                class="pe-1"
                :class="{ 'font-FaNumregular-14': $i18n.locale === 'fa' }"
                >{{ appliedFilter.count }}</span
              >
              <span v-if="appliedFilter.name">{{ appliedFilter.name }}</span>
              <span v-if="appliedFilter.type === 'price_range'">
                <span>{{ $t("search.filters.price.from") }}</span>
                <span
                  :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
                  >{{ appliedFilter.minPrice | comma }}</span
                >
                <span>{{ $t("search.filters.price.to") }}</span>
                <span
                  :class="$i18n.locale === 'fa' ? 'font-FaNumregular-14' : ''"
                  >{{ appliedFilter.maxPrice | comma }}</span
                >
                <span>{{ $t("search.filters.price.unit") }}</span>
              </span>
            </v-chip>
          </v-card-text>
        </v-card>
      </div>
      <!-- price -->
      <div v-if="filter.type === 'price_range'" class="mb-3">
        <v-card flat class="rounded-lg py-3 px-5 histogramSectionCard">
          <div id="histogramSection">
            <div>
              <span class="font-regular-14">
                {{ $t("search.filters.price.title") }}
              </span>
            </div>
            <v-row justify="center" class="mt-2 rangeSlider">
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
                  :min="filter.min_price"
                  :max="filter.max_price"
                  :step="filter.step"
                  :data="histogramData"
                  :clip="false"
                  class="histogramStyle"
                  @finish="selectRange"
                />
              </client-only>
            </v-row>

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
                <div class="mt-1 mb-n6">
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
                @click="
                  filterPrice(
                    filter,
                    rangeSliderFrom,
                    rangeSliderTo,
                    filterIndex
                  )
                "
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
                  @click="addCounter(filter, filterIndex)"
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
                  @click="minusCounter(filter, filterIndex)"
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
                    @click="addCounterList(filter, filterIndex, item, index)"
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
                    @click="minusCounterList(filter, filterIndex, item, index)"
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
                  filter,
                  filterPanelSettings[filterIndex].value,
                  filterIndex
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
                v-for="(filterChild, filterChildIndex) in filter.children"
                :key="filterChildIndex"
                class="ma-0 mb-2 font-light-14"
              >
                <v-checkbox
                  off-icon="$checkBox"
                  on-icon="$checkBoxActive"
                  class="mt-0 mb-n5 pa-0 checkBoxClass"
                  :label="filterChild.name"
                  v-model="
                    filterPanelSettings[filterIndex].listCheckBoxValues[
                      filterChildIndex
                    ].value
                  "
                  @change="
                    filterCheckBox(
                      filter,
                      filterChild,
                      filterPanelSettings[filterIndex].listCheckBoxValues[
                        filterChildIndex
                      ].value,
                      filterIndex,
                      { filterChildIndex: filterChildIndex }
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
        >
          <v-expansion-panels
            v-if="filterPanelSettings[filterIndex]"
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
                class="mx-n2"
                :class="
                  filterPanelSettings[filterIndex][filterChildIndex].expand ===
                  0
                    ? 'mb-n3'
                    : ''
                "
              >
                <v-row
                  v-for="(
                    filterChildItem, filterChildItemIndex
                  ) in filterChild.children"
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
                        filter,
                        filterChildItem,
                        filterPanelSettings[filterIndex][filterChildIndex]
                          .listCheckBoxValues[filterChildItemIndex].value,
                        filterIndex,
                        {
                          filterChildIndex: filterChildIndex,
                          filterChildItemIndex: filterChildItemIndex,
                        }
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
    AddIcon,
  },
  data() {
    return {
      appliedFilterList: [],
      filterPanelSettings: [],
      filterTypes: [],
      data: {
        q: "tehran",
        page: 1,
        sort: "popular",
      },
      rangeSliderFrom: this.$route.query.min_price
        ? this.$route.query.min_price
        : null,
      rangeSliderTo: this.$route.query.max_price
        ? this.$route.query.max_price
        : null,
      histogramSectionWidth: null,
      rangeBtnDisable: true,
    };
  },
  computed: {
    ...mapGetters({
      filters: `modules/filters/${types.filters.getters.GET_FILTERS}`,
      histogramPrices: `modules/filters/${types.filters.getters.GET_HISTOGRAM_PRICES}`,
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
    }),
    histogramWidth() {
      return this.histogramSectionWidth;
    },
    histogramData() {
      let filterHistogramPrices = this.histogramPrices;
      let histogramData = [];

      filterHistogramPrices.forEach(
        (histogramPriceObject, histogramPriceIndex) => {
          for (
            let priceCount = 0;
            priceCount < histogramPriceObject.doc_count;
            priceCount++
          ) {
            histogramData.push(histogramPriceObject.key);
          }
        }
      );

      return histogramData;
    },
  },
  mounted() {
    this.calculateSectionWidth();
    this.filterPanelSettingsHandler();

    //get and set previous filter
    this.setDataFromUrlQueries();
    window.addEventListener("resize", this.calculateSectionWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.calculateSectionWidth);
  },
  methods: {
    ...mapActions({
      setSearchResult: `modules/search/${types.search.actions.SET_SEARCH_RESULTS}`,
      setFilters: `modules/filters/${types.filters.actions.SET_FILTERS}`,
      setHistogramPrices: `modules/filters/${types.filters.actions.SET_HISTOGRAM_PRICES}`,
    }),
    filterPanelSettingsHandler() {
      let filters = this.filters;
      let filtersLength = filters.length;
      for (let filterIndex = 0; filterIndex < filtersLength; filterIndex++) {
        this.filterTypes.push({
          slug: filters[filterIndex].slug,
          type: filters[filterIndex].type,
        });
        if (filters[filterIndex].type === "counter") {
          this.filterPanelSettings.push({
            expand: 0,
            count: this.$route.query[this.filters[filterIndex].slug]
              ? this.$route.query[this.filters[filterIndex].slug]
              : 0,
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
                : 0,
            });
          }
          this.filterPanelSettings.push({
            expand: 0,
            ItemCounts: listCounterItemCounts,
          });
        } else if (this.filters[filterIndex].type === "switch") {
          this.filterPanelSettings.push({
            expand: 0,
            value: this.$route.query[this.filters[filterIndex].slug]
              ? this.$route.query[this.filters[filterIndex].slug]
              : false,
          });
        } else if (this.filters[filterIndex].type === "list_checkbox") {
          let listCheckBoxValue = [];
          for (
            let listItemIndex = 0;
            listItemIndex < this.filters[filterIndex].children.length;
            listItemIndex++
          ) {
            listCheckBoxValue.push({
              value:
                !!this.$route.query[
                  `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listItemIndex].id}]`
                ],
            });
          }
          this.filterPanelSettings.push({
            expand: 0,
            listCheckBoxValues: listCheckBoxValue,
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
                value:
                  !!this.$route.query[
                    `${this.filters[filterIndex].slug}[${this.filters[filterIndex].children[listItemIndex].children[listItemChildIndex].id}]`
                  ],
              });
            }
            openGroupExpansionPanels.push({
              expand: 0,
              listCheckBoxValues: listCheckBoxValue,
            });
          }
          this.filterPanelSettings.push(openGroupExpansionPanels);
        } else {
          this.filterPanelSettings.push({
            expand: 0,
          });
        }
      }
    },
    setDataFromUrlQueries() {
      let routeQueries = this.$route.query;
      let filterTypes = this.filterTypes;

      filterTypes.forEach((filterType, filterTypeIndex) => {
        if (filterType.type === "price_range") {
          if (routeQueries.min_price) {
            this.data.min_price = parseInt(routeQueries.min_price);
          }
          if (routeQueries.max_price) {
            this.data.max_price = parseInt(routeQueries.max_price);
          }

          // push it in appliedFilterList Array
          let filterIndex = this.filters
            .map(function (filter) {
              return filter.slug;
            })
            .indexOf(filterType.slug);
          let appliedFilterExist;
          this.appliedFilterList.forEach(
            (appliedFilter, appliedFilterIndex) => {
              if (appliedFilter.slug === this.filters[filterIndex].slug) {
                appliedFilterExist = true;
              }
            }
          );
          if (!appliedFilterExist && routeQueries.min_price) {
            this.appliedFilterList.push({
              type: this.filters[filterIndex].type,
              slug: this.filters[filterIndex].slug,
              minPrice: routeQueries.min_price,
              maxPrice: routeQueries.max_price,
              indexInFilterPanelSettings: filterIndex,
            });
          }
        } else if (filterType.type === "counter") {
          for (let [routeQueryKey, routeQueryValue] of Object.entries(
            routeQueries
          )) {
            if (routeQueryKey.includes(filterType.slug)) {
              this.data[filterType.slug] = routeQueryValue
                ? parseInt(routeQueryValue)
                : 0;

              // push it in appliedFilterList Array
              let filterIndex = this.filters
                .map(function (filter) {
                  return filter.slug;
                })
                .indexOf(filterType.slug);
              let appliedFilterExist;
              this.appliedFilterList.forEach(
                (appliedFilter, appliedFilterIndex) => {
                  if (appliedFilter.slug === this.filters[filterIndex].slug) {
                    appliedFilterExist = true;
                    parseInt(routeQueryValue) > 0
                      ? (this.appliedFilterList[appliedFilterIndex].count =
                          parseInt(routeQueryValue))
                      : this.clearFilter(appliedFilter, appliedFilterIndex);
                  }
                }
              );
              if (!appliedFilterExist && routeQueryValue) {
                this.appliedFilterList.push({
                  type: this.filters[filterIndex].type,
                  slug: this.filters[filterIndex].slug,
                  name: this.filters[filterIndex].name,
                  count: parseInt(routeQueryValue),
                  indexInFilterPanelSettings: filterIndex,
                });
              }
            }
          }
        } else if (filterTypes[filterTypeIndex].type === "list_counter") {
          let filterListCounterItems = [];
          for (let [routeQueryKey, routeQueryValue] of Object.entries(
            routeQueries
          )) {
            if (routeQueryKey.includes(filterType.slug)) {
              let routeQueryId = parseInt(
                routeQueryKey.substring(
                  filterType.slug.length + 1,
                  routeQueryKey.length - 1
                )
              );
              if (routeQueryValue) {
                filterListCounterItems.push({
                  id: routeQueryId,
                  count: parseInt(routeQueryValue),
                });
              }

              // push it in appliedFilterList Array
              let filterIndex = this.filters
                .map(function (filter) {
                  return filter.slug;
                })
                .indexOf(filterType.slug);
              let appliedFilterExist;
              this.appliedFilterList.forEach(
                (appliedFilter, appliedFilterIndex) => {
                  if (
                    appliedFilter.slug === this.filters[filterIndex].slug &&
                    appliedFilter.id === routeQueryId
                  ) {
                    appliedFilterExist = true;
                    parseInt(routeQueryValue) > 0
                      ? (this.appliedFilterList[appliedFilterIndex].count =
                          parseInt(routeQueryValue))
                      : this.clearFilter(appliedFilter, appliedFilterIndex);
                  }
                }
              );
              if (!appliedFilterExist && routeQueryValue) {
                // search in children of this filter to find index of a child that it`s id is equal to routeQueryId
                let itemIndex = this.filters[filterIndex].children
                  .map(function (child) {
                    return child.id;
                  })
                  .indexOf(routeQueryId);

                //so I have all needed values to push them fo applied filter list
                this.appliedFilterList.push({
                  type: this.filters[filterIndex].type,
                  slug: this.filters[filterIndex].slug,
                  id: routeQueryId,
                  name: this.filters[filterIndex].children[itemIndex].name,
                  count: parseInt(routeQueryValue),
                  indexInFilterPanelSettings: filterIndex,
                  itemIndexInFilterPanelSettings: itemIndex,
                });
              }
            }
          }
          if (filterListCounterItems.length > 0) {
            this.data[filterType.slug] = filterListCounterItems;
          }
        } else if (filterTypes[filterTypeIndex].type === "switch") {
          for (let [routeQueryKey, routeQueryValue] of Object.entries(
            routeQueries
          )) {
            if (routeQueryKey.includes(filterType.slug)) {
              this.data[filterType.slug] = routeQueryValue === "true";

              // push it in appliedFilterList Array
              let filterIndex = this.filters
                .map(function (filter) {
                  return filter.slug;
                })
                .indexOf(filterType.slug);
              let appliedFilterExist;
              this.appliedFilterList.forEach(
                (appliedFilter, appliedFilterIndex) => {
                  if (appliedFilter.slug === this.filters[filterIndex].slug) {
                    appliedFilterExist = true;
                    routeQueryValue
                      ? (this.appliedFilterList[appliedFilterIndex].value =
                          routeQueryValue)
                      : this.clearFilter(appliedFilter, appliedFilterIndex);
                  }
                }
              );
              if (!appliedFilterExist && routeQueryValue) {
                this.appliedFilterList.push({
                  type: this.filters[filterIndex].type,
                  slug: this.filters[filterIndex].slug,
                  name: this.filters[filterIndex].name,
                  value: routeQueryValue,
                  indexInFilterPanelSettings: filterIndex,
                });
              }
            }
          }
        } else if (
          filterTypes[filterTypeIndex].type === "list" ||
          filterTypes[filterTypeIndex].type === "list_checkbox"
        ) {
          let filterCheckBoxItems = [];
          for (let [routeQueryKey, routeQueryValue] of Object.entries(
            routeQueries
          )) {
            if (routeQueryKey.includes(filterType.slug)) {
              if (routeQueryValue) {
                filterCheckBoxItems.push(parseInt(routeQueryValue));

                // push it in appliedFilterList Array
                let routeQueryId = parseInt(
                  routeQueryKey.substring(
                    filterType.slug.length + 1,
                    routeQueryKey.length - 1
                  )
                );

                let filterIndex = this.filters
                  .map(function (filter) {
                    return filter.slug;
                  })
                  .indexOf(filterType.slug);
                let appliedFilterExist;
                this.appliedFilterList.forEach(
                  (appliedFilter, appliedFilterIndex) => {
                    if (
                      appliedFilter.slug === this.filters[filterIndex].slug &&
                      appliedFilter.id === routeQueryId
                    ) {
                      appliedFilterExist = true;
                      routeQueryValue
                        ? (this.appliedFilterList[appliedFilterIndex].value =
                            routeQueryValue)
                        : this.clearFilter(appliedFilter, appliedFilterIndex);
                    }
                  }
                );
                if (!appliedFilterExist) {
                  if (filterTypes[filterTypeIndex].type === "list") {
                    // search in children of this filter to find index of a child that it`s id is equal to routeQueryId
                    let childIndex = null;
                    let childItemIndex = null;

                    this.filters[filterIndex].children.forEach(
                      (child, index) => {
                        child.children.forEach((childItem, i) => {
                          if (childItem.id === routeQueryId) {
                            childItemIndex = i;
                            childIndex = index;
                          }
                        });
                      }
                    );

                    console.log("i wanna test", childIndex, childItemIndex);

                    //so I have all needed values to push them fo applied filter list
                    this.appliedFilterList.push({
                      type: this.filters[filterIndex].type,
                      slug: this.filters[filterIndex].slug,
                      id: routeQueryId,
                      name: this.filters[filterIndex].children[childIndex]
                        .children[childItemIndex].name,
                      value: routeQueryValue,
                      indexInFilterPanelSettings: filterIndex,
                      childIndexInFilterPanelSettings: childIndex,
                      childItemIndexInFilterPanelSettings: childItemIndex,
                    });
                  } else {
                    // search in children of this filter to find index of a child that it`s id is equal to routeQueryId
                    let childIndex = this.filters[filterIndex].children
                      .map(function (child) {
                        return child.id;
                      })
                      .indexOf(routeQueryId);

                    //so I have all needed values to push them fo applied filter list
                    this.appliedFilterList.push({
                      type: this.filters[filterIndex].type,
                      slug: this.filters[filterIndex].slug,
                      id: routeQueryId,
                      name: this.filters[filterIndex].children[childIndex].name,
                      value: routeQueryValue,
                      indexInFilterPanelSettings: filterIndex,
                      childIndexInFilterPanelSettings: childIndex,
                    });
                  }
                }
              }
            }
            SearchServices;
          }
          if (filterCheckBoxItems.length > 0) {
            this.data[filterType.slug] = filterCheckBoxItems;
          }
        }
      });
    },
    inputRange() {
      if (this.rangeSliderFrom && this.rangeSliderTo) {
        this.rangeBtnDisable = false;
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            min_price: undefined,
            max_price: undefined,
          },
        });
        this.data.min_price = null;
        this.data.max_price = null;
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
    filterPrice(filter, rangeSliderFrom, rangeSliderTo, filterIndex) {
      if (rangeSliderFrom >= 0 && rangeSliderTo > 0) {
        setTimeout(() => {
          this.$nuxt.$loading.start();
        }, 1);

        //get and set previous filter
        this.setDataFromUrlQueries();
        this.$router.push({
          query: {
            ...this.$route.query,
            min_price: rangeSliderFrom,
            max_price: rangeSliderTo,
          },
        });
        this.data.min_price = rangeSliderFrom;
        this.data.max_price = rangeSliderTo;

        return SearchServices.searchResults(this.data).then((res) => {
          // add this filter to applied filter list
          let appliedFilterExist;
          this.appliedFilterList.forEach(
            (appliedFilter, appliedFilterIndex) => {
              if (appliedFilter.slug === filter.slug) {
                appliedFilterExist = true;
                appliedFilter.minPrice = rangeSliderFrom;
                appliedFilter.maxPrice = rangeSliderTo;
                console.log("here when its ", rangeSliderFrom, rangeSliderTo);
              }
            }
          );
          if (!appliedFilterExist) {
            console.log("here before push", rangeSliderFrom, rangeSliderTo);
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              minPrice: rangeSliderFrom,
              maxPrice: rangeSliderTo,
              indexInFilterPanelSettings: filterIndex,
            });
          }
          this.setSearchResult(res.data);
          this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
          this.$nuxt.$loading.finish();
        });
      } 
    },
    addCounter(filter, filterIndex) {
      this.filterPanelSettings[filterIndex].count++;
      this.filterCounter(
        filter,
        this.filterPanelSettings[filterIndex].count,
        filterIndex
      );
    },
    minusCounter(filter, filterIndex) {
      if (this.filterPanelSettings[filterIndex].count > 0) {
        this.filterPanelSettings[filterIndex].count--;
        this.filterCounter(
          filter,
          this.filterPanelSettings[filterIndex].count,
          filterIndex
        );
      }
    },
    addCounterList(filter, filterIndex, item, itemIndex) {
      this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count++;
      this.filterCounterList(
        filter,
        item,
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count,
        filterIndex,
        itemIndex
      );
    },
    minusCounterList(filter, filterIndex, item, itemIndex) {
      if (
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count > 0
      ) {
        this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count--;
        this.filterCounterList(
          filter,
          item,
          this.filterPanelSettings[filterIndex].ItemCounts[itemIndex].count,
          filterIndex,
          itemIndex
        );
      }
    },
    filterCounter(filter, count, filterIndex) {
      this.$nuxt.$loading.start();

      //get and set previous filter
      this.setDataFromUrlQueries();
      if (count > 0) {
        this.data[filter.slug] = count;
      } else {
        delete this.data[filter.slug];
      }
      return SearchServices.searchResults(this.data).then((res) => {
        if (count > 0) {
          this.$router.push({
            query: { ...this.$route.query, [filter.slug]: count },
          });
        } else {
          this.$router.push({
            query: { ...this.$route.query, [filter.slug]: undefined },
          });
        }

        // add this filter to applied filter list
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (appliedFilter.slug === filter.slug) {
            appliedFilterExist = true;
            count > 0
              ? (this.appliedFilterList[appliedFilterIndex].count = count)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist) {
          this.appliedFilterList.push({
            type: filter.type,
            slug: filter.slug,
            name: filter.name,
            count: count,
            indexInFilterPanelSettings: filterIndex,
          });
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    filterCounterList(filter, item, itemCount, filterIndex, itemIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);

      //get and set previous filter
      this.setDataFromUrlQueries();
      if (itemCount > 0) {
        if (this.data[filter.slug]) {
          let selectedItemExist = false;
          this.data[filter.slug].forEach((itemObject, itemObjectIndex) => {
            if (itemObject.id === item.id) {
              selectedItemExist = true;
              this.data[filter.slug][itemObjectIndex].count = itemCount;
            }
          });
          if (!selectedItemExist) {
            this.data[filter.slug].push({
              id: item.id,
              count: itemCount,
            });
          }
        } else {
          this.data[filter.slug] = [
            {
              id: item.id,
              count: itemCount,
            },
          ];
        }
      } else {
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${filter.slug}[${item.id}]`]: undefined,
          },
        });
        this.data[filter.slug].forEach((itemObject, itemObjectIndex) => {
          if (itemObject.id === item.id) {
            this.data[filter.slug].splice(itemObjectIndex, 1);
          }
        });
      }
      return SearchServices.searchResults(this.data).then((res) => {
        if (itemCount > 0) {
          this.$router.push({
            query: {
              ...this.$route.query,
              [`${filter.slug}[${item.id}]`]: itemCount,
            },
          });
        }

        // add this filter to applied filter
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (
            appliedFilter.slug === filter.slug &&
            appliedFilter.id === item.id
          ) {
            appliedFilterExist = true;
            itemCount > 0
              ? (this.appliedFilterList[appliedFilterIndex].count = itemCount)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist) {
          this.appliedFilterList.push({
            type: filter.type,
            slug: filter.slug,
            id: item.id,
            name: item.name,
            count: itemCount,
            indexInFilterPanelSettings: filterIndex,
            itemIndexInFilterPanelSettings: itemIndex,
          });
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    filterSwitch(filter, switchValue, filterIndex) {
      this.$nuxt.$loading.start();

      //get and set previous filter
      this.setDataFromUrlQueries();

      this.data[filter.slug] = switchValue;
      return SearchServices.searchResults(this.data).then((res) => {
        if (switchValue) {
          this.$router.push({
            query: { ...this.$route.query, [filter.slug]: switchValue },
          });
        } else {
          this.$router.push({
            query: { ...this.$route.query, [filter.slug]: undefined },
          });
        }

        // add this filter to applied filter list
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (appliedFilter.slug === filter.slug) {
            appliedFilterExist = true;
            switchValue
              ? (this.appliedFilterList[appliedFilterIndex].value = switchValue)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist && switchValue) {
          this.appliedFilterList.push({
            type: filter.type,
            slug: filter.slug,
            name: filter.name,
            value: switchValue,
            indexInFilterPanelSettings: filterIndex,
          });
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    filterCheckBox(
      filter,
      checkBoxItem,
      checkBoxValue,
      filterIndex,
      filterChildIndexObject
    ) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);

      //get and set previous filter
      this.setDataFromUrlQueries();

      if (!checkBoxValue) {
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${filter.slug}[${checkBoxItem.id}]`]: undefined,
          },
        });
        this.data[filter.slug].splice(
          this.data[filter.slug].indexOf(checkBoxItem.id),
          1
        );
      } else {
        // if the value is true so the item should be add in array for adding to data
        if (this.data[filter.slug]) {
          this.data[filter.slug].push(checkBoxItem.id);
        } else {
          this.data[filter.slug] = [checkBoxItem.id];
        }
      }

      return SearchServices.searchResults(this.data).then((res) => {
        if (checkBoxValue) {
          this.$router.push({
            query: {
              ...this.$route.query,
              [`${filter.slug}[${checkBoxItem.id}]`]: checkBoxItem.id,
            },
          });
        }

        // add this filter to applied filter
        let appliedFilterExist;
        this.appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
          if (
            appliedFilter.slug === filter.slug &&
            appliedFilter.id === checkBoxItem.id
          ) {
            appliedFilterExist = true;
            checkBoxValue
              ? (this.appliedFilterList[appliedFilterIndex].value =
                  checkBoxValue)
              : this.clearFilter(appliedFilter, appliedFilterIndex);
          }
        });
        if (!appliedFilterExist && checkBoxValue) {
          if (filter.type === "list") {
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              id: checkBoxItem.id,
              name: checkBoxItem.name,
              value: checkBoxValue,
              indexInFilterPanelSettings: filterIndex,
              childIndexInFilterPanelSettings:
                filterChildIndexObject.filterChildIndex,
              childItemIndexInFilterPanelSettings:
                filterChildIndexObject.filterChildItemIndex,
            });
          } else {
            this.appliedFilterList.push({
              type: filter.type,
              slug: filter.slug,
              id: checkBoxItem.id,
              name: checkBoxItem.name,
              value: checkBoxValue,
              indexInFilterPanelSettings: filterIndex,
              childIndexInFilterPanelSettings:
                filterChildIndexObject.filterChildIndex,
            });
          }
        }

        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    clearFilter(appliedFilter, appliedFilterIndex) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      if (appliedFilter.type === "price_range") {
        // delete it from data send in api
        delete this.data.min_price;
        delete this.data.max_price;

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its values
        this.rangeSliderFrom = null;
        this.rangeSliderTo = null;

        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            min_price: undefined,
            max_price: undefined,
          },
        });

        this.rangeBtnDisable = true;
      } else if (appliedFilter.type === "counter") {
        // delete it from data send in api
        delete this.data[appliedFilter.slug];

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        this.filterPanelSettings[
          appliedFilter.indexInFilterPanelSettings
        ].count = 0;

        //remove it  from url query
        this.$router.push({
          query: { ...this.$route.query, [appliedFilter.slug]: undefined },
        });
      } else if (appliedFilter.type === "list_counter") {
        // delete it from data send in api
        this.data[appliedFilter.slug].forEach((itemObject, itemObjectIndex) => {
          if (itemObject.id === appliedFilter.id) {
            this.data[appliedFilter.slug].splice(itemObjectIndex, 1);
          }
        });
        if(this.data[appliedFilter.slug].length === 0) delete this.data[appliedFilter.slug];
        

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        this.filterPanelSettings[
          appliedFilter.indexInFilterPanelSettings
        ].ItemCounts[appliedFilter.itemIndexInFilterPanelSettings].count = 0;

        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${appliedFilter.slug}[${appliedFilter.id}]`]: undefined,
          },
        });
      } else if (appliedFilter.type === "switch") {
        // delete it from data send in api
        delete this.data[appliedFilter.slug];

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        this.filterPanelSettings[
          appliedFilter.indexInFilterPanelSettings
        ].value = false;

        //remove it from url query
        this.$router.push({
          query: { ...this.$route.query, [appliedFilter.slug]: undefined },
        });
      } else if (
        appliedFilter.type === "list_checkbox" ||
        appliedFilter.type === "list"
      ) {
        // delete it from data send in api
        this.data[appliedFilter.slug].forEach((item, itemIndex) => {
          if (item === appliedFilter.id) {
            this.data[appliedFilter.slug].splice(itemIndex, 1);
          }
        });
        if(this.data[appliedFilter.slug].length === 0) delete this.data[appliedFilter.slug];

        // remove it from applied filter list
        this.appliedFilterList.splice(appliedFilterIndex, 1);

        // reset its value in filterpanelsetting array
        if (appliedFilter.type === "list_checkbox") {
          this.filterPanelSettings[
            appliedFilter.indexInFilterPanelSettings
          ].listCheckBoxValues[
            appliedFilter.childIndexInFilterPanelSettings
          ].value = false;
        } else {
          this.filterPanelSettings[appliedFilter.indexInFilterPanelSettings][
            appliedFilter.childIndexInFilterPanelSettings
          ].listCheckBoxValues[
            appliedFilter.childItemIndexInFilterPanelSettings
          ].value = false;
        }

        //remove it  from url query
        this.$router.push({
          query: {
            ...this.$route.query,
            [`${appliedFilter.slug}[${appliedFilter.id}]`]: undefined,
          },
        });
      }

      return SearchServices.searchResults(this.data).then((res) => {
        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
    clearAllFilter(appliedFilterList) {
      setTimeout(() => {
        this.$nuxt.$loading.start();
      }, 1);
      const routeQueries = Object.assign({}, this.$route.query);

      // clear add applied filter from data
      appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
        if (appliedFilter.slug === "price_range") {
          delete this.data.min_price;
          delete this.data.max_price;

          // reset its values
          this.rangeSliderFrom = null;
          this.rangeSliderTo = null;
        } else {
          delete this.data[appliedFilter.slug];

          // reset its values
          if (appliedFilter.type === "counter") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
            ].count = 0;
          } else if (appliedFilter.type === "list_counter") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
            ].ItemCounts[
              appliedFilter.itemIndexInFilterPanelSettings
            ].count = 0;
          } else if (appliedFilter.type === "switch") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
            ].value = false;
          } else if (appliedFilter.type === "list_checkbox") {
            this.filterPanelSettings[
              appliedFilter.indexInFilterPanelSettings
            ].listCheckBoxValues[
              appliedFilter.childIndexInFilterPanelSettings
            ].value = false;
          } else if (appliedFilter.type === "list") {
            this.filterPanelSettings[appliedFilter.indexInFilterPanelSettings][
              appliedFilter.childIndexInFilterPanelSettings
            ].listCheckBoxValues[
              appliedFilter.childItemIndexInFilterPanelSettings
            ].value = false;
          }
        }
      });

      // clear all appliedFilterList
      this.appliedFilterList = [];

      // clear all filter form query
      appliedFilterList.forEach((appliedFilter, appliedFilterIndex) => {
        for (let [routeQueryKey, routeQueryValue] of Object.entries(
          routeQueries
        )) {
          if (routeQueryKey.includes(appliedFilter.slug)) {
            delete routeQueries[routeQueryKey];
          } else if (
            routeQueryKey === "min_price" ||
            routeQueryKey === "max_price"
          ) {
            delete routeQueries[routeQueryKey];
          }
        }
      });
      this.$router.push({
        query: routeQueries,
      });
      // this.$router.replace({ query: routeQueries });

      return SearchServices.searchResults(this.data).then((res) => {
        this.setSearchResult(res.data);
        this.setFilters(res.data.filters.filters);
          this.setHistogramPrices(res.data.histogram_prices.prices);
        this.$nuxt.$loading.finish();
      });
    },
  },
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
