<template>
  <div>
    <div class="breadCrumbs">
      <v-breadcrumbs
        :nuxt="true"
        :items="getSearchResult.filters.breadcrumbs"
        class="pt-0"
        :class="mapLayout ? 'pb-1' : 'pb-2'"
      >
      <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :href="item.type ? `https://homsa.net/${item.type}-${item.slug}` : 'https://homsa.net'"
        :disabled="item.disable"
      >
        {{ item.title }}
        {{  }}
      </v-breadcrumbs-item>
    </template>
      </v-breadcrumbs>
    </div>
    <div class="d-flex align-center">
      <p class="font-regular-18 mb-0 greenDark8--text">{{ getSearchResult.title }}</p>
      <span class="ms-2 font-regular-12 secondary--text" v-if="!isFilter">
        (
          <span :class="$i18n.locale === 'fa' ? 'font-FaNumregular-12' : ''">{{ getSearchResult.total }}</span>
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
  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`
    }),
  },
};
</script>

<style lang="scss">
//breadcrumb link color

.v-application {
  .breadCrumbs a {
    color: var(--v-secondary-base) !important;
  }

  .v-breadcrumbs {
    &__item {
      color: var(--v-secondary-base) !important;
      &--disabled {
        color: var(--v-greenDark8-base) !important;
      }
    }
  }

  a.v-breadcrumbs {
    &__item {
      &--disabled {
        color: var(--v-greenDark8-base) !important;
      }
    }
  }
}
</style>
