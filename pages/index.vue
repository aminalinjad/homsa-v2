<template>
  <PagesSearchContent v-if="!mapLayout" />
  <PagesSearchMap v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "search",
  props: [],
  data() {
    return {
      id: 444,
    };
  },
  watch: {
    mapLayout() {
      if (this.mapLayout) {
        this.$nuxt.setLayout("map");
      } else {
        this.$nuxt.setLayout("search");
      }
    },
  },
  computed: {
    ...mapGetters({
      mapLayout: "modules/structure/GET_MAP_LAYOUT",
    }),
  },
  mounted() {
    this.getFilterData();
  },
  methods: {
    ...mapActions({
      setMapLayout: "modules/structure/SET_MAP_LAYOUT",
      setFilters: "modules/filters/SET_FILTERS",
    }),
    goId() {
      this.$router.push(`/${this.id}`);
      this.$store.dispatch("getData");
    },
    changeLayout() {
      this.ifMapLayout = !this.ifMapLayout;
    },
    getFilterData() {
      let filters = [
        {
          type: "map",
        },
        {
          type: "price",
          step: 200,
          min: 200,
          max: 1000000,
          options: [
            {
              price: 100000,
              count: 5,
            },
            {
              price: 200000,
              count: 10,
            },
            {
              price: 500000,
              count: 20,
            },
            {
              price: 700000,
              count: 5,
            },
          ],
        },
        {
          type: "count",
          options: ["اتاق خواب"],
        },
        {
          type: "count",
          title: "امکانات خواب",
          expand: [0],
          options: [
            "تخت خواب دو نفره",
            "تخت خواب تک نفره",
            "تخت کودک",
            "کاناپه تخت خواب شو",
            "تشک",
          ],
        },
        { type: "boolean", label: "رزرو آنی" },
        { type: "boolean", label: "مهمان نواز" },
        { type: "boolean", label: "تخفیف‌دار" },
        { type: "boolean", label: "ضدعفونی" },
        { type: "select", title: "اقامتگاه", expand: [] },
        { type: "select", title: "آشپزخانه", expand: [] },
        {
          type: "select",
          title: "نزدیک به",
          expand: [0],
          options: ["دریا", "دریاچه", "جنگل", "حرم"],
        },
        {
          type: "select",
          title: "قوانین و مقررات",
          expand: [0],
          options: ["استعمال دخانیات", "ورود حیوانات خانگی", "برگزاری مراسم"],
        },
        {
          type: "selectGroup",
          title: "امکانات",
          options: [
            {
              type: "select",
              title: "آشپزخانه",
              expand: [0],
              options: ["یخچال", "مایکروویو", "لوازم آشپزی", "اجاق گاز"],
            },
            {
              type: "select",
              title: "رفاهی",
              expand: [0],
              options: ["یخچال", "مایکروویو", "لوازم آشپزی"],
            },
            {
              type: "select",
              title: "بهداشتی",
              expand: [0],
              options: ["یخچال", "مایکروویو"],
            },
            {
              type: "select",
              title: "امکانات سرمایشی گرمایشی",
              expand: [0],
              options: ["لوازم آشپزی", "اجاق گاز"],
            },
            {
              type: "select",
              title: "وعده غذایی",
              expand: [0],
              options: ["یخچال", "مایکروویو", "لوازم آشپزی", "اجاق گاز"],
            },
          ],
        },
      ];
      this.setFilters(filters);
    },
  },
};
</script>
<style scoped lang="scss">
.resultContainerMap {
  flex: 0 0 504px;
  overflow: hidden;
}

.mapContainer {
  // flex: 0 0 1008px;
  overflow: hidden;
}
</style>

