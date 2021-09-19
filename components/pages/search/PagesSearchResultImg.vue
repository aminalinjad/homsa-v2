<template>
  <div class="resultImgSec">
    <v-row class="resultImgSec__top px-1">
      <v-col>
        <v-chip label small color="white" class="font-regular-12"
          >مهمان نواز</v-chip
        >
      </v-col>
      <v-col class="pa-2" :class="$vuetify.rtl ? 'text-left' : 'text-right'">
        <v-btn icon @click="addFavorite">
          <Heart
            :clr="
              favorite
                ? $vuetify.theme.dark
                  ? $vuetify.theme.themes.dark.redOfferTime
                  : $vuetify.theme.themes.light.redOfferTime
                : null
            "
            :strk="
              favorite
                ? $vuetify.theme.dark
                  ? $vuetify.theme.themes.dark.redOfferTime
                  : $vuetify.theme.themes.light.redOfferTime
                : null
            "
          />
        </v-btn>
      </v-col>
    </v-row>
    <div class="resultImgSec__image rounded-lg">
      <v-carousel
        :width="ifGridView ? 280 : 300"
        :height="ifGridView ? 158 : 200"
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
      </v-carousel>
    </div>
    <div class="resultImgSec__bottom" v-if="ifGridView">
      <v-tooltip :left="$vuetify.rtl" :right="!$vuetify.rtl" color="greenDark8">
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
        </template>
        <span>گارانتی شده</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import Heart from "@/assets/AppIcons/heart.vue";

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
  components: {
    Heart,
  },
  data() {
    return {
      favorite: false,
    };
  },
  methods: {
    addFavorite() {
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
    .v-btn {
      &--icon.v-size {
        &--default {
          width: 24px !important;
          height: 24px !important;
          border-radius: 50px !important;

          .v-icon {
            font-size: 15px !important;
          }
        }
      }

      &--fab.v-size {
        &--default {
          .v-icon {
            font-size: 15px !important;
          }
        }
      }
    }
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

.v-carousel {
  &__controls {
    .v-item-group {
      button {
        width: 5px !important;
        height: 5px !important;

        i {
          font-size: 7px !important;
        }
      }
    }
  }
}
</style>
