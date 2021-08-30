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
      <p class="font-regular-18 mb-0">اجاره اقامتگاه در شهر رشت</p>
      <span class="ms-2 font-regular-12 secondary--text" v-if="!isFilter">(۳۴ مورد)</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
          href: "#",
        },
        {
          text: "اقامتگاه های استان گیلان",
          disabled: false,
          href: "#",
        },
        {
          text: "شهر رشت",
          disabled: true,
          href: "#",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      mapLayout: "modules/structure/GET_MAP_LAYOUT",
    }),
  },
};
</script>

<style lang="scss">
//breadcrumb link color
.v-application .breadCrumbsCls a {
  color: var(--v-secondary-base) !important;
}

.v-application .breadCrumbsCls a.v-breadcrumbs__item--disabled {
  color: var(--v-blackColor-base) !important;
}
</style>