export default {
  props: {
    filter: {
      type: Object,
      default() {
        return{}
      }
    }
  },
  data() {
    return {
      expand: 0
    }
  }
}
