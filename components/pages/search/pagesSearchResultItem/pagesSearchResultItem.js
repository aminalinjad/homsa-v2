import StarIcon from "@/assets/AppIcons/starFavorite.vue";

export default {
  props: {
    place: {
      type: Object
    },
    gridViewMode: {
      type: Boolean,
      default: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  components: { StarIcon },
  data() {
    return {
      rank: 4.2,
    };
  },
  methods: {
    rankColor(color) {
      if (color >= 4) {
        return "primary";
      } else if (color >= 3) {
        return "green2";
      } else {
        return "orangeBooking";
      }
    },
  },
};
