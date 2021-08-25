<template>
  <!-- <div class="resultImgSec" :style="`width:${getImgSecWidth}px`"> -->
  <div class="resultImgSec">
    <v-row class="resultImgSec__top px-2">
      <v-col>
        <v-chip label small color="white" class="font-regular-12"
          >مهمان نواز</v-chip
        >
      </v-col>
      <v-col class="text-left">
        <v-btn icon @click="addFavorite">
          <v-icon :color="favorite ? 'redOfferTime' : ''">mdi-heart</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div class="resultImgSec__image rounded-lg">
      <v-img
          class="rounded-lg"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          :width="getImgSecWidth"
        :height="getImgSecHeight"
        ></v-img>
      <!-- <v-carousel
        :width="getImgSecWidth"
        :height="getImgSecHeight"
        class="rounded-lg"
        show-arrows-on-hover
        hide-delimiter-background
      >
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        >
        </v-carousel-item>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        >
        </v-carousel-item>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        >
        </v-carousel-item>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        >
        </v-carousel-item>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        >
        </v-carousel-item>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        >
        </v-carousel-item>
      </v-carousel> -->
    </div>
    <div class="resultImgSec__bottom" v-if="ifGridView">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <div
            class="grnty rounded-sm d-flex align-center justify-center"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small color="white" v-bind="attrs" v-on="on"
              >mdi-shield-check-outline</v-icon
            >
          </div>
          <!-- <v-icon small color="white" v-bind="attrs" v-on="on"
              >mdi-shield-check-outline</v-icon
            > -->
        </template>
        <span>گارانتی شده</span>
      </v-tooltip>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ifGridView: {
      type: Boolean,
      default: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // imgSecWidth: null,
      favorite: false,
    };
  },
  computed: {
    getImgSecWidth() {
      if (this.ifGridView) {
        return 280;
      } else {
        return 300;
      }
    },
    getImgSecHeight() {
      if (this.ifGridView) {
        // return (this.imgSecWidth * 4) / 7;
        return 158;
      } else {
        // return (this.imgSecWidth * 2) / 3;
        return 200;
      }
    },
  },
  mounted() {
    this.calculateImgSecHeight();
    // window.addEventListener("resize", this.calculateImgSecHeight);
  },
  methods: {
    calculateImgSecHeight() {
      let width = document.getElementsByClassName("resultImgSec__image")[0]
        .clientWidth;
      this.imgSecWidth = width;
    },
    addFavorite() {
      // console.log(this.index);
      this.favorite = !this.favorite;
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
    z-index: 2;
  }
  &__image {
    // width: 224px;
    .v-btn--icon.v-size--default {
      width: 24px!important;
      height: 24px!important;
      border-radius: 50px!important;
    }
    .v-btn--icon.v-size--default .v-icon, .v-btn--fab.v-size--default .v-icon  {
       font-size: 15px!important;

    }
  }

  &__bottom {
    position: absolute;
    bottom: 0;
    margin: 16px;
  }
}

.grnty {
  background: #93a79399;
  width: 20px;
  height: 20px;
}

.v-carousel__controls .v-item-group button {
  width: 5px!important;
  height: 5px!important;

}
.v-carousel__controls .v-item-group button i{
  // width: 20px!important;
  // height: 20px!important;
  font-size: 7px!important;
}
</style>