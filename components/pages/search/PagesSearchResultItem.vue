<template>
  <v-card flat class="rounded-lg">
    <!--If Grid view  -->
    <div v-if="ifGridView">
      <!-- image sec  -->
      <PagesSearchResultImg />
      <!-- text sec  -->
      <v-card-subtitle class="pt-3">
        <v-row>
          <v-col>
            <span class="font-regular-12 secondary--text">رشت - گیلان</span>
          </v-col>
          <v-col class="text-left">
            <span class="font-regular-10 secondary--text">(۳۶۰ نظر)</span>
            <span>۳.۸</span>
            <v-icon small class="mb-1">mdi-star</v-icon>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-text class="black--text">
        <p class="mb-1">آپارتمان مبله دوبلکس در خیابان ولیعصر</p>
        <p class="font-regular-12">دو خوابه - ظرفیت ۸ نفره</p>
      </v-card-text>

      <!-- bottom sec  -->
      <v-card-actions>
        <div class="font-regular-12">
          <div class="secondary--text">
            <span>قیمت کل</span>
            <span>۲,۵۵۰,۰۰۰</span>
            <span>تومان</span>
          </div>
          <div>
            <span>هر شب</span>
            <span class="font-bold-14">۸۵۰,۰۰۰</span>
            <span class="font-bold-14">تومان</span>
          </div>
        </div>
        <v-spacer></v-spacer>

        <v-chip label color="orangeBookingBg">
          <v-icon color="orangeBooking">mdi-flash</v-icon>
          <span class="orangeBooking--text mt-n1 font-regular-12"
            >رزرو آنی</span
          >
        </v-chip>
      </v-card-actions>
    </div>

    <!--If list view  -->
    <div v-else>
      <v-row>
        <v-col cols="4">
          <PagesSearchResultImg />
        </v-col>
        <v-col cols="8">
          <v-card-subtitle class="pt-3">
            <v-row>
              <v-col>
                <span class="secondary--text">رشت - گیلان</span>
              </v-col>
              <v-col class="text-left">
                <span class="font-regular-12 secondary--text">(۳۶۰ نظر)</span>
                <span class="font-bold-16" :class="rankColor(3.8)+'--text'">۳.۸</span>
                <v-icon :color="rankColor(3.8)" class="mb-1">mdi-star</v-icon>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text class="black--text">
            <v-row>
              <v-col>
                <p class="mb-1 font-medium-14">
                  آپارتمان مبله دوبلکس در خیابان ولیعصر
                </p>
                <p class="secondary--text font-regular-12">
                  دو خوابه - ظرفیت ۸ نفره - استخر - ماشین لباسشویی
                </p>
                <v-chip small label outlined color="#7575754D" text-color="black">
                  <v-icon color="primary">mdi-shield-check-outline</v-icon>
                  <span class="ms-1 font-regular-12"
                    >گارانتی شده</span
                  >
                </v-chip>
              </v-col>
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
            <div class="font-regular-12">
              <div class="secondary--text">
                <span>قیمت کل</span>
                <span>۲,۵۵۰,۰۰۰</span>
                <span>تومان</span>
              </div>
              <div>
                <span>هر شب</span>
                <span class="font-bold-14">۸۵۰,۰۰۰</span>
                <span class="font-bold-14">تومان</span>
              </div>
            </div>
            <v-spacer></v-spacer>

            <v-chip
              label
              color="#EC484A0D"
              text-color="redOffer"
              v-if="index % 2 == 0"
            >
              <span class="mt-n1 font-regular-14">تخفیف دار</span>
            </v-chip>
            <v-chip label color="#EC484A0D" text-color="redOffer" v-else>
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
    ifGridView: {
      type: Boolean,
      default: true,
    },
    index: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
  },
  methods: {
    rankColor(color) {
      if(color >= 4) {
        return 'primary';
      } else if (color >= 3 ) {
        return 'green2';
      } else {
        return 'orangeBooking'
      }

    }

  }
};
</script>

<style lang="scss">
</style>