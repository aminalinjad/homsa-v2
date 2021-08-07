<template>
  <div class="itemHooper">
    <v-btn
      class="itemHooper__chevronRight"
      elevation="1"
      icon
      x-small
      @click.prevent="slidePrev"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn
      class="itemHooper__chevronLeft"
      elevation="1"
      icon
      x-small
      @click.prevent="slideNext"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div class="mx-7 itemHooper__main">
      <hooper
        class="itmHoopr"
        :rtl="ifRtl"
        :itemsToShow="4.5"
        ref="carousel"
        @slide="updateCarousel"
      >
        <slide v-for="(tag, index) in tags" :key="index" class="me-2">
          <!-- <div
            class="d-flex tagItem rounded secondary--text mx-1 pt-2 pb-2 px-3"
          >
            <v-icon>mdi-diamond-outline</v-icon>
            <span class="ps-2 font-regular-14">اقامتگاه‌های لوکس</span>
          </div> -->
          <v-chip outlined label class="tagItem" @click="filterTag(index)" color="borderGray" text-color="secondary">
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
  computed: {
    ifRtl() {
      if (this.$vuetify.rtl) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    slidePrev() {
      if (this.ifRtl) {
        this.$refs.carousel.slidePrev();
      } else {
        this.$refs.carousel.slideNext();
      }
    },
    slideNext() {
      if (this.ifRtl) {
        this.$refs.carousel.slideNext();
      } else {
        this.$refs.carousel.slidePrev();
      }
    },
    updateCarousel(payload) {
      this.myCarouselData = payload.currentSlide;
    },
    filterTag(index) {
      console.log('tag ',index);
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
  &__main {
  }
  .hooper .hooper-slide {
    width: auto !important;

  }

  //  .nextBtnRight {
  //     right: 0!important;
  // }
  //  .nextBtnLeft {
  //     left: 0!important;
  // }
}

.tagItem {
  // border: #f5f5f5 solid 1px;
  height: 40px!important;
  width: 166px!important;
}

.tagItem:active , .tagItem:hover {
  color: #359138!important;
}


</style>