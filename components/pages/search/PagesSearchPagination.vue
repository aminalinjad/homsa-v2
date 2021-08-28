<template>
    <v-row class="paginationContainer justify-center">
          <v-pagination
            v-model="page"
            :total-visible="7"
            :length="totalPages"
            :class="mapLayout?'paginationFont12':'paginationWidth46'"
          ></v-pagination>
        </v-row>
</template>

<script>
export default {
    props: {
        page: {
            type: Number,
            defult: 1
        },
        totalPages: {
            type: Number,
            defult: 1
        },
        mapLayout: {
            type: Boolean,
            default: false
        }

    }
}
</script>

<style lang="scss">
.paginationContainer {
  .v-pagination {
    &__item, &__navigation  {
      box-shadow: none !important;
      color: var(--v-secondary-base)!important;
    }

    &__item--active {
      color: var(--v-primary-base) !important;
      background-color: var(--v-whiteColor-base) !important;
      border: 1px solid var(--v-primary-base) !important;
    }
  }

  .paginationFont12 {
    .v-pagination {
      &__item {
        font-size: 12px !important;
      }
    }
  }

  .paginationWidth46 {
    .v-pagination {
      &__item, &__navigation {
        width: 46px !important;
        height: 46px !important;
      }
    }
  }
}
</style>