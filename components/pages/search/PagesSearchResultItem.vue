<template>
  <v-card flat class="rounded-lg">
    <!--If Grid view  -->
    <div v-if="gridViewMode">
      <!-- offer sec  -->
      <div
        class="redOffer--text text-center offerSec mx-3 mb-2"
        v-if="index % 3 === 0 || index % 2 === 0"
      >
        <!-- modification need: in v-if o v-else ro bad az set kardane data bardaram -->
        <span v-if="index % 2 === 0" class="font-regular-12">تخفیف دار</span>
        <div class="d-flex justify-space-between" v-else-if="index % 3 === 0">
          <span class="font-regular-12">مانده زمان تخفیف</span>

          <span>
            <span
              :class="
                $i18n.locale === 'fa'
                  ? 'font-FaNumregular-12'
                  : 'font-regular-12'
              "
              >۰2:55:40</span
            >
            <v-icon small color="redOffer">mdi-clock-outline</v-icon>
          </span>
        </div>
      </div>

      <!-- image sec  -->
      <PagesSearchResultImg :images="place.photos" :index="index" />
      <!-- text sec  -->
      <v-card-subtitle class="pt-3 pb-1 px-0">
        <v-row>
          <v-col class="pb-2">
            <span class="font-regular-12 secondary--text">{{ place.city }} - {{ place.province }}</span>
          </v-col>
          <v-col
            class="pb-2"
            :class="$vuetify.rtl ? 'text-left' : 'text-right'"
          >
            <span v-if="false">
              <span class="font-bold-14 secondary--text">جدید</span>
            </span>
            <span class="d-flex align-center justify-end" v-else>
              <span class="font-regular-10 secondary--text"
                >(
                <span
                  :class="$i18n.locale === 'fa' ? 'font-FaNumregular-10' : ''"
                  >360</span
                >
                <span>{{ $t("search.main.item.comments") }}</span>
                )</span
              >
              <span
                class="mx-1"
                :class="[
                  rankColor(rank) + '--text',
                  $i18n.locale === 'fa' ? 'font-FaNumregular-14' : '',
                ]"
                >{{ place.overall_rating }}</span
              >
              <StarIcon
                :color="
                  rank >= 4
                    ? !$vuetify.theme.dark
                      ? $vuetify.theme.themes.light.primary
                      : $vuetify.theme.themes.dark.primary
                    : rank >= 3
                    ? !$vuetify.theme.dark
                      ? $vuetify.theme.themes.light.green2
                      : $vuetify.theme.themes.dark.green2
                    : !$vuetify.theme.dark
                    ? $vuetify.theme.themes.light.orangeBooking
                    : $vuetify.theme.themes.dark.orangeBooking
                "
              />
            </span>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-text class="pb-3 px-0 greenDark8--text">
        <p class="mb-1">{{ place.name }}</p>
        <p class="font-regular-12">
          <span>{{ place.bedrooms }}</span> خوابه - ظرفیت <span>{{ place.accommodates }}</span> نفره
        </p>
      </v-card-text>

      <!-- bottom sec  -->
      <v-card-actions class="px-0">
        <!-- Price start -->
        <div class="font-regular-12">
          <!-- modification need : this v-if base of index should be removed after logic and api   -->
          <div class="secondary--text mb-n4" v-if="place.total_price !== 0">
            <span>{{ $t("search.main.item.total-price") }}</span>
            <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
              >{{ place.total_price }}</span
            >
            <span>{{ $t("search.main.item.unit") }}</span>
          </div>

          <!-- modification need : this v-if base of index should be removed after logic and api   -->
          <div
            class="secondary--text mb-n4 text-center"
            v-if="index % 3 === 0 && !(index % 2 === 0)"
          >
            <span
              class="text-decoration-line-through"
              :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
              >2,550,000</span
            >
          </div>
          <div class="mt-4 greenDark8--text">
            <span>{{ $t("search.main.item.per-night") }}</span>
            <span
              :class="
                $i18n.locale === 'fa' ? 'font-FaNumbold-14' : 'font-bold-14'
              "
              >{{ place.night | comma }}</span
            >
            <span>{{ $t("search.main.item.unit") }}</span>
          </div>
        </div>
        <!-- Price end -->

        <v-spacer></v-spacer>

        <v-chip label color="orangeBookingBg">
          <v-icon color="orangeBooking" size="18">$lightning</v-icon>
          <span class="orangeBooking--text mt-n1 font-regular-12"
            >رزرو آنی</span
          >
        </v-chip>
      </v-card-actions>
    </div>

    <!--If list view  -->
    <div v-else>
      <v-row>
        <!-- image sec -->
        <v-col cols="4">
          <PagesSearchResultImg :images="place.photos" :gridViewMode="gridViewMode" />
        </v-col>

        <!-- info sec -->
        <v-col cols="8 px-0">
          <v-card-subtitle class="pt-3 pb-0">
            <v-row>
              <v-col class="pb-0">
                <span class="font-regular-12 secondary--text">{{ place.city }} - {{ place.province }}</span>
              </v-col>
              <v-col class="pb-0 d-flex align-center justify-end">
                <span class="font-regular-12 secondary--text"
                  >(
                  <span
                    :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
                    >460</span
                  >
                  <span>{{ $t("search.main.item.comments") }}</span>
                  )</span
                >
                <span
                  class="mx-1 font-bold-16"
                  :class="[
                    rankColor(rank) + '--text',
                    $i18n.locale === 'fa' ? 'font-FaNumbold-16' : '',
                  ]"
                  >{{ place.overall_rating }}</span
                >
                <StarIcon
                  :color="
                    rank >= 4
                      ? !$vuetify.theme.dark
                        ? $vuetify.theme.themes.light.primary
                        : $vuetify.theme.themes.dark.primary
                      : rank >= 3
                      ? !$vuetify.theme.dark
                        ? $vuetify.theme.themes.light.green2
                        : $vuetify.theme.themes.dark.green2
                      : !$vuetify.theme.dark
                      ? $vuetify.theme.themes.light.orangeBooking
                      : $vuetify.theme.themes.dark.orangeBooking
                  "
                />
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text class="black--text">
            <v-row>
              <v-col class="pt-1">
                <p class="mb-4 font-medium-14 greenDark8--text">{{ place.name }}</p>
                <p class="mb-3 secondary--text font-regular-12">
                  دو خوابه - ظرفیت ۸ نفره - استخر - ماشین لباسشویی
                </p>
                <v-chip
                  small
                  label
                  outlined
                  color="#7575754D"
                  text-color="black"
                >
                  <v-icon color="primary">mdi-shield-check-outline</v-icon>
                  <span class="ms-1 font-regular-12">گارانتی شده</span>
                </v-chip>
              </v-col>
              <v-col :class="$vuetify.rtl ? 'text-left' : 'text-right'">
                <v-chip label color="orangeBookingBg" class="mt-6">
                  <v-icon color="orangeBooking" size="18">$lightning</v-icon>
                  <span class="mt-n1 orangeBooking--text font-medium-14"
                    >رزرو آنی</span
                  >
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- bottom sec  -->
          <v-card-actions class="px-4">
            <!-- Price start -->
            <div class="font-regular-12">
              <div class="secondary--text mb-n4" v-if="index % 2 === 0">
                <span>{{ $t("search.main.item.total-price") }}</span>
                <span
                  :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
                  >2,550,000</span
                >
                <span>{{ $t("search.main.item.unit") }}</span>
              </div>
              <div
                class="secondary--text mb-n4 text-center"
                v-if="index % 3 === 0 && !(index % 2 === 0)"
              >
                <span
              class="text-decoration-line-through"
              :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''"
              >2,550,000</span
            >
              </div>
              <div class="mt-4 greenDark8--text">
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

            <!-- modification need: in v-if o v-else ro bad az set kardane data bardaram -->
            <v-chip
              label
              color="#EC484A0D"
              text-color="redOffer"
              v-if="index % 2 === 0"
            >
              <span class="mt-n1 font-regular-14">تخفیف دار</span>
            </v-chip>
            <v-chip label color="#EC484A0D" text-color="redOfferTime" v-else>
              <span class="mt-n1 me-12 font-regular-14">مانده زمان تخفیف</span>
              <span>
                <span
              :class="
                $i18n.locale === 'fa'
                  ? 'font-FaNumregular-14'
                  : ''
              "
              >۰2:55:40</span
            >
                <v-icon>mdi-clock-outline</v-icon>
              </span>
            </v-chip>
          </v-card-actions>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import StarIcon from "@/assets/AppIcons/starFavorite.vue";
export default {
  props: {
    place: {
      type: Object
    },
    gridViewMode: {
      type: Boolean,
      default: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  components: { StarIcon },
  data() {
    return {
      rank: 4.2,
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
.offerSec {
  margin-top: -33px;
  border-bottom: 1px var(--v-redOfferTime-base) solid;
}
</style>
