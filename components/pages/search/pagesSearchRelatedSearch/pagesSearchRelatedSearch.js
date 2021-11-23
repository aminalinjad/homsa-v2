import {mapGetters} from "vuex"
import * as types from "@/store/types.js";

export default {
  computed: {
    ...mapGetters({
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`,
    }),
  },
};
