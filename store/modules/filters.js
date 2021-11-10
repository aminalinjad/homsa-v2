import * as types from "@/store/types";

const state = () => ({
  filters: [],
  histogramPrices: [],
  appliedFilter: []
});
const getters = {
  [types.filters.getters.GET_FILTERS]: state => {
    return state.filters;
  },
  [types.filters.getters.GET_HISTOGRAM_PRICES]: state => {
    return state.histogramPrices;
  },
  [types.filters.getters.GET_APPLIED_FILTER]: state => {
    return state.appliedFilter;
  }

};

const mutations = {
  [types.filters.mutations.MUTATE_FILTERS]: (state, payload) => {
    state.filters = payload;
  },
  [types.filters.mutations.MUTATE_HISTOGRAM_PRICES]: (state, payload) => {
    state.histogramPrices = payload;
  },
  [types.filters.mutations.MUTATE_APPLIED_FILTER]: (state, payload) => {
    state.appliedFilter = payload;
  },
  [types.filters.mutations.MUTATE_UPDATE_APPLIED_FILTER]: (state, payload) => {
    state.appliedFilter[payload.index] = payload.value;
  }
};

const actions = {
  [types.filters.actions.SET_FILTERS]: ({commit}, payload) => {
    commit(types.filters.mutations.MUTATE_FILTERS, payload);
  },
  [types.filters.actions.SET_HISTOGRAM_PRICES]: ({commit}, payload) => {
    commit(types.filters.mutations.MUTATE_HISTOGRAM_PRICES, payload);
  },
  [types.filters.actions.SET_APPLIED_FILTER]: ({commit}, payload) => {
    commit(types.filters.mutations.MUTATE_APPLIED_FILTER, payload);
  },
  [types.filters.actions.SET_UPDATE_APPLIED_FILTER]: ({commit}, payload) => {
    commit(types.filters.mutations.MUTATE_UPDATE_APPLIED_FILTER, payload);
  }

};

export default {
  state,
  getters,
  mutations,
  actions
};
