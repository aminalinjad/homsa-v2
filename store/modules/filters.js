import * as types from "@/store/types";

const state = () => ({
  filters: [],
  histogramPrices: []
});
const getters = {
  [types.filters.getters.GET_FILTERS]: state => {
    return state.filters;
  },
  [types.filters.getters.GET_HISTOGRAM_PRICES]: state => {
    return state.histogramPrices;
  }
};

const mutations = {
  [types.filters.mutations.MUTATE_FILTERS]: (state, payload) => {
    state.filters = payload;
  },
  [types.filters.mutations.MUTATE_HISTOGRAM_PRICES]: (state, payload) => {
    state.histogramPrices = payload;
  }
};

const actions = {
  [types.filters.actions.SET_FILTERS]: ({ commit }, payload) => {
    commit(types.filters.mutations.MUTATE_FILTERS, payload);
  },
  [types.filters.actions.SET_HISTOGRAM_PRICES]: ({ commit }, payload) => {
    commit(types.filters.mutations.MUTATE_HISTOGRAM_PRICES, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
