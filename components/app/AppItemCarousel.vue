<template>
  <div class="itemHooper">
    <v-btn
      class="itemHooper__chevronRight"
      elevation="1"
      icon
      x-small
      @click.prevent="slidePrev"
    >
      <v-icon>$arrowRight</v-icon>
    </v-btn>
    <v-btn
      class="itemHooper__chevronLeft"
      elevation="1"
      icon
      x-small
      @click.prevent="slideNext"
    >
      <v-icon>$arrowLeft</v-icon>
    </v-btn>
    <div class="mx-7 itemHooper__main">
      <hooper
        class="itmHoopr"
        :rtl="$vuetify.rtl"
        :itemsToShow="4.5"
        ref="carousel"
        @slide="updateCarousel"
      >
        <slide v-for="(tag, index) in tags" :key="index" class="me-2">
          <v-chip outlined label class="tagItem" @click="filterTag(index)" color="greyLight4" text-color="secondary">
            <v-icon >mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>

          </v-chip>
        </slide>
        <!-- <hooper-navigation slot="hooper-addons"></hooper-navigation> -->
      </hooper>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";
export default {
  components: {
    Hooper,
    Slide,
  },
  data() {
    return {
      tags: ['', '', '', '', '', '','', '', '', '']
    }

  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
       this.$refs.carousel.slideNext();
    },
    updateCarousel(payload) {
      this.myCarouselData = payload.currentSlide;
    },
    filterTag(index) {
    }
  },
};
</script>

<style lang="scss" scope>
.itmHoopr {
  height: 100%;
  
}
.itemHooper {
  position: relative;
  &__chevronRight {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0 !important;
  }
  &__chevronLeft {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0 !important;
  }
  .hooper .hooper-slide {
    width: auto !important;

  }
}

.tagItem {
  height: 40px!important;
  width: 166px!important;
}

.tagItem:active , .tagItem:hover {
  color: var(--v-primary-base)!important;
}

</style>