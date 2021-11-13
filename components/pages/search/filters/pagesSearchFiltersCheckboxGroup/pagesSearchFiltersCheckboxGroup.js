export default {
  props: {
    filter: {
      type: Object,
      default() {
        return {}
      }
    },
    filterIndex: {
      type: Number
    },
  },
  data() {
    return {
      expand: 0
    }
  }
}
