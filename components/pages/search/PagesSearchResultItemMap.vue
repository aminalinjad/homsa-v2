<template>
  <v-card flat class="rounded-lg">
    <!--list view  -->
    <v-row>
      <!-- image sec -->
      <v-col class="px-0">
        <PagesSearchResultImgMap :images="place.photos" />
      </v-col>

      <!-- info sec -->
      <v-col class="pe-0 searchResultInfo d-flex flex-column">
        <v-card-subtitle class="pt-3">
          <v-row>
            <v-col class="pa-0 pb-2">
              <span class="font-regular-14 greenDark8--text">
                {{ place.name.substring(0, 33) }}
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0 pb-2 d-flex align-center justify-end">
              <span class="font-regular-12 secondary--text opacity6"
                >(
                  <span
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
                    >260</span
                  >
                  <span>{{ $t("search.main.item.comments") }}</span>
                  )
                </span
              >
              <span
                class="mx-1 font-bold-16"
                :class="[rankColor(rank) + '--text', $i18n.locale === 'fa' ? 'font-FaNumbold-16' : '']"
                >3.9</span
              >
              <StarIcon
              :color="
              rank>=4? (!$vuetify.theme.dark ? $vuetify.theme.themes.light.primary : $vuetify.theme.themes.dark.primary)
              :rank >= 3 ? (!$vuetify.theme.dark ? $vuetify.theme.themes.light.green2 : $vuetify.theme.themes.dark.green2)
              : (!$vuetify.theme.dark ? $vuetify.theme.themes.light.orangeBooking : $vuetify.theme.themes.dark.orangeBooking)
              "/>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <!-- bottom sec  -->
        <div class="mt-auto">
          <v-card-actions class="pa-0 align-center">
            <!-- Price start -->
            <div class="font-regular-12">
              <!-- modification need: remove this v-if base on index  -->
              <div class="secondary--text" v-if="index % 2 === 0">
                <span>{{ $t("search.main.item.total-price") }}</span>
            <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
              >2,550,000</span
            >
            <span>{{ $t("search.main.item.unit") }}</span>
              </div>

              <!-- modification need: remove this v-if base on index  -->
              <div
                class="secondary--text text-center"
                v-if="index % 3 === 0 && !(index % 2 === 0)"
              >
                <span
              class="text-decoration-line-through"
              :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
              >2,550,000</span
            >
              </div>
              <div class="greenDark8--text">
                <span>{{ $t("search.main.item.per-night") }}</span>
            <span
              :class="
                $i18n.locale === 'fa' ? 'font-FaNumbold-14' : 'font-bold-14'
              "
              >850,000</span
            >
            <span>{{ $t("search.main.item.unit") }}</span>
              </div>
            </div>
            <!-- Price end -->
            <v-spacer></v-spacer>
            <v-chip
              label
              small
              color="orangeBookingBg"
              class="px-0 align-self-end"
            >
              <LightningIcon />
            </v-chip>
          </v-card-actions>
          <v-card-text
            class="px-0 pt-2 pb-0 black--text"
            v-if="index % 2 === 0"
          >
            <!-- modification need: in v-if o v-else ro bad az set kardane data bardaram -->
            <div
              class="
                px-2
                redOpacity
                redOfferTime--text
                rounded-sm
                font-regular-12
                d-flex
                justify-space-between
              "
            >
              <span>مانده زمان تخفیف</span>
              <span
              :class="
                $i18n.locale === 'fa'
                  ? 'font-FaNumregular-12'
                  : 'font-regular-12'
              "
              >۰2:55:40</span
            >
            </div>
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import LightningIcon from "@/assets/AppIcons/thunderLightning.vue";
import StarIcon from "@/assets/AppIcons/starFavorite.vue";
export default {
  props: {
    place: {
      type: Object
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    LightningIcon,
    StarIcon,
  },
  data() {
    return {
      title: " آپارتمان مبله دوبلکس در خیابان ولیعصر",
      rank: 3.8,
    };
  },
  methods: {
    rankColor(color) {
      if (color >= 4) {
        return "primary";
      } else if (color >= 3) {
        return "green2";
      } else {
        return "orangeBooking";
      }
    },
  },
};
</script>

<style lang="scss">
.searchResultInfo {
  height: 174px;
}
</style>
