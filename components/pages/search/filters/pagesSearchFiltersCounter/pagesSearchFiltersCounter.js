import MinusIcon from "@/assets/AppIcons/minus.vue";
import AddIcon from "@/assets/AppIcons/add.vue";

export default {
  props: {
    filter: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    MinusIcon,
    AddIcon,
  },
  data() {
    return {
      expand: 0
    }
  },
  methods: {
    minusIconColorForCounterFilter(filterValue) {
      return filterValue === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },
    minusIconColor(filterValue) {
      return filterValue === 0 ? this.$vuetify.theme.themes.light.secondary : this.$vuetify.theme.themes.light.greenDark8;
    },
  }
}
