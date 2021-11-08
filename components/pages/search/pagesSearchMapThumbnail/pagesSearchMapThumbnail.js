export default {
  methods: {
    mapLayoutMode() {
      this.$router.push({query: {...this.$route.query, showMap: 'true'}})
    }
  },
}
