<template>
  <v-card flat class="rounded-lg">
    <!--list view  -->
      <v-row>
        <!-- image sec -->
        <v-col  class="px-0">
          <PagesSearchResultImgMap />
        </v-col>

        <!-- info sec -->
        <v-col class="pe-0 searchResultInfo d-flex flex-column">
          <v-card-subtitle class="pt-3">
            <v-row>
              <v-col class="pa-0 pb-2">
                <span class="font-regular-14 greenDark8--text">
                  {{ title.substring(0, 33) }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0 pb-2 text-left">
                <span class="font-regular-12 secondary--text opacity6">(۳۶۰ نظر)</span>
                <span class="font-bold-16" :class="rankColor(3.8) + '--text'"
                  >۳.۸</span
                >
                <!-- <v-icon :color="rankColor(3.8)" class="mb-1">mdi-star</v-icon> -->
                <StarIcon />
              </v-col>
            </v-row>
          </v-card-subtitle>

          <!-- bottom sec  -->
          <div class="mt-auto">
            <v-card-actions class="pa-0 align-center">
            <!-- Price start -->
            <div class="font-regular-12">
              <div class="secondary--text" v-if="index % 2 == 0">
                <span>قیمت کل</span>
                <span>۲,۵۵۰,۰۰۰</span>
                <span>تومان</span>
              </div>
              <div
                class="secondary--text text-center"
                v-if="index % 3 == 0 && !(index % 2 == 0)"
              >
                <span class="text-decoration-line-through">۲,۵۵۰,۰۰۰</span>
              </div>
              <div class="greenDark8--text">
                <span>هر شب</span>
                <span class="font-bold-14">۸۵۰,۰۰۰</span>
                <span class="">تومان</span>
              </div>
            </div>
            <!-- Price end -->
            <v-spacer></v-spacer>
            <v-chip label small color="orangeBookingBg" class="px-0 align-self-end">
              <LightningIcon />
            </v-chip>
          </v-card-actions>
          <v-card-text class="px-0 pt-2 pb-0 black--text" v-if="index % 2 == 0">
            <!-- modification need: in v-if o v-else ro bad az set kardane data bardaram -->
                <!-- <v-chip
                  label
                  color="#EC484A0D"
                  text-color="redOffer"
                  v-if="index % 2 == 0"
                >
                  <span class="mt-n1 font-regular-14">تخفیف دار</span>
                </v-chip> -->
                <div
                  class="px-2 redOpacity redOfferTime--text rounded-sm font-regular-12 d-flex justify-space-between"
                >
                  <span
                    >مانده زمان تخفیف</span
                  >
                  <span>
                    ۰۲:۵۵:۴۰
                  </span>
                </div>
            
          </v-card-text>
          </div>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
import LightningIcon from '~/assets/images/icons/ic-thunder-lightning-small.svg?inline';
import StarIcon from '~/assets/images/icons/ic-star-favorite.svg?inline';
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    LightningIcon,
    StarIcon
  },
  data() {
    return {
      title: " آپارتمان مبله دوبلکس در خیابان ولیعصر",
    };
  },

  computed: {},
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

.offerSec {
  margin-top: -33px;
  border-bottom: 1px #ec484a solid;
}
</style>