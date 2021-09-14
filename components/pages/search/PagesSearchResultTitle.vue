<template>
  <div>
    <div class="breadCrumbsCls">
      <v-breadcrumbs
        :items="breadcrumbs"
        class="pt-0"
        :class="mapLayout ? 'pb-1' : 'pb-2'"
      ></v-breadcrumbs>
    </div>
    <div class="d-flex align-center">
      <p class="font-regular-18 mb-0 greenDark8--text">اجاره اقامتگاه در شهر رشت</p>
      <span class="ms-2 font-regular-12 secondary--text" v-if="!isFilter">
        (
          <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''">34</span>
          <span>{{$t('search.main.resultsTotal')}}</span>
          )
        </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from '@/store/types.js';

export default {
  props: {
    isFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: "هومسا",
          disabled: false,
          href: "",
        },
        {
          text: "اقامتگاه های استان گیلان",
          disabled: false,
          href: "",
        },
        {
          text: "شهر رشت",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
    }),
  },
};
</script>

<style lang="scss">
//breadcrumb link color

.v-application {
  .breadCrumbsCls a {
    color: var(--v-secondary-base) !important;
  }

  a.v-breadcrumbs {
    &__item {
      &--disabled {
        color: var(--v-blackColor-base) !important;
      }
    }
  }
}
</style>