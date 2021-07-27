<template>
  <div>
    <v-row>
      <v-col cols="3">
        <PagesSearchFilters :filters="filters" />
      </v-col>
      <v-col cols="9">
        <PagesSearchContent />
      </v-col>
    </v-row>
    <!-- <p class="font-bold-34">تست فونت</p>
    <v-btn color="primary" @click="goId">test</v-btn> -->
  </div>
</template>
<script>
export default {
  layout: "search",
  props: [],
  data() {
    return {
      id: 444,
      filters: [
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
      ],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    goId() {
      this.$router.push(`/${this.id}`);
      this.$store.dispatch("getData");
      // .then((res) => {
      //   console.log("res in pg", res)
      // })
      // .catch((err) => {
      //   console.log("errr iin pg", err)
      // })
    },
  },
};
</script>
<style scoped lang="scss"></style>

