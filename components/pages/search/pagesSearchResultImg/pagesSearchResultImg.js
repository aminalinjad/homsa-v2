import Heart from "@/assets/AppIcons/heart.vue";

export default {
  props: {
    gridViewMode: {
      type: Boolean,
      default: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array
    }
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
