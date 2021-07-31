<template>
  <v-card flat class="rounded-lg">
    <!-- image sec  -->
    <div class="resultImgSec">
      <v-row class="resultImgSec__top px-2">
        <v-col>
          <v-chip label small color="white" class="font-regular-12"
            >مهمان نواز</v-chip
          >
        </v-col>
        <v-col class="text-left">
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div class="resultImgSec__image rounded-lg">
        <v-img
          class="rounded-lg"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          width="100%"
        ></v-img>
      </div>
      <div class="resultImgSec__bottom">
        <div class="grnty rounded-sm d-flex align-center justify-center">
          <v-icon small color="white">mdi-shield-check-outline</v-icon>
        </div>
      </div>
    </div>

    <!-- text sec  -->
    <v-card-subtitle class="pt-3">
      <v-row>
        <v-col>
          <span>رشت - گیلان</span>
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

      <v-chip label color="orangeBookingBg" >
          
        <v-icon color="orangeBooking">mdi-flash</v-icon>
        <span class="orangeBooking--text mt-n1 font-regular-12">رزرو آنی</span>
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    rankColor() {
      // this.
    },
  },
};
</script>

<style lang="scss">
.resultImgSec {
  position: relative;
  &__top {
    position: absolute;
    width: 100%;
    top: 16px;
    margin-inline: auto;
    z-index: 10;
  }
  &__image {
  }

  &__bottom {
    position: absolute;
    bottom: 0;
    margin: 16px;
  }
}

.grnty {
  background: #01220099;
  width: 20px;
  height: 20px;
}
</style>