import { mapGetters } from "vuex";
import * as types from '@/store/types.js';

export default {
  props: {
    isFilter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      mapLayout: `modules/structure/${types.structure.getters.GET_MAP_LAYOUT}`,
      getSearchResult: `modules/search/${types.search.getters.GET_SEARCH_RESULTS}`
    }),
  },
};
