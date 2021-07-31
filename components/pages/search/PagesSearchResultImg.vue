<template>
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
</template>

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