import Heart from "@/assets/AppIcons/heart.vue";

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array
    }
  },
  components: {
    Heart
  },
  data() {
    return {
      favorite: false,
    };
  },
  mounted() {
  },
  methods: {
    addFavorite() {
      this.favorite = !this.favorite;
    },
  },
};
