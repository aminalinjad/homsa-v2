<template>
  <v-card flat class="rounded-lg">
    <!--list view  -->
    <div>
      <v-row>
        <!-- image sec -->
        <v-col >
          <PagesSearchResultImgMap />
        </v-col>

        <!-- info sec -->
        <v-col >
          <v-card-subtitle class="pt-3">
            <v-row>
              <v-col class="pa-0 pb-2">
                <p class="mb-1 font-regular-14">
                  آپارتمان مبله دوبلکس در خیابان ولیعصر
                </p>
              </v-col>
            </v-row>
            <v-row>
                <v-col class="pa-0 pb-2 text-left">
                <span class="font-regular-12 secondary--text">(۳۶۰ نظر)</span>
                <span class="font-bold-16" :class="rankColor(3.8) + '--text'"
                  >۳.۸</span
                >
                <v-icon :color="rankColor(3.8)" class="mb-1">mdi-star</v-icon>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text class="black--text">
            <v-row>
              <v-col class="text-left">
                <v-chip label color="orangeBookingBg">
                  <v-icon color="orangeBooking">mdi-flash</v-icon>
                  <span class="orangeBooking--text mt-n1 font-medium-14"
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
          <div class="secondary--text mb-n4"  v-if="index % 2 == 0" >
            <span>قیمت کل</span>
            <span>۲,۵۵۰,۰۰۰</span>
            <span>تومان</span>
          </div>
          <div class="secondary--text mb-n4 text-center"  v-if="(index % 3 == 0)&&!(index % 2 == 0)" >
           
            <span class="text-decoration-line-through">۲,۵۵۰,۰۰۰</span>
            
          </div>
          <div class="mt-4">
            <span>هر شب</span>
            <span class="font-bold-14">۸۵۰,۰۰۰</span>
            <span class="font-bold-14">تومان</span>
          </div>
        </div>
        <!-- Price end -->
            <v-spacer></v-spacer>

            <!-- modification need: in v-if o v-else ro bad az set kardane data bardaram -->
            <v-chip
              label
              color="#EC484A0D"
              text-color="redOffer"
              v-if="index % 2 == 0"
            >
              <span class="mt-n1 font-regular-14">تخفیف دار</span>
            </v-chip>
            <v-chip label color="#EC484A0D" text-color="redOfferTime" v-else>
              <span class="mt-n1 me-12 font-regular-14">مانده زمان تخفیف</span>
              <span>
                <span>۰۲:۵۵:۴۰</span>
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
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {

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
  border-bottom: 1px #EC484A solid;
}
</style>