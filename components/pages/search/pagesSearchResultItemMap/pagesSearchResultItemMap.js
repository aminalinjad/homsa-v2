import LightningIcon from "@/assets/AppIcons/thunderLightning.vue";
import StarIcon from "@/assets/AppIcons/starFavorite.vue";

export default {
  props: {
    place: {
      type: Object
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  components: {
    LightningIcon,
    StarIcon,
  },
  data() {
    return {
      title: " آپارتمان مبله دوبلکس در خیابان ولیعصر",
      rank: 3.8,
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
