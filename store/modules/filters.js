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
  },
  [types.filters.mutations.MUTATE_UPDATE_FILTER_DEFAULT]: (state, payload) => {
    if(payload.childItemIndexInFilters !== null) {
      state.filters[payload.filterIndex].children[payload.childIndexInFilters].children[payload.childItemIndexInFilters].default = payload.default;
     // if(0) === false
    } else if (payload.childIndexInFilters >= 0 ) {
      state.filters[payload.filterIndex].children[payload.childIndexInFilters].default = payload.default;
    } else {
      state.filters[payload.filterIndex].default = payload.default;
    }
  },

  [types.filters.mutations.MUTATE_UPDATE_FILTER_CHECKBOX_DEFAULT]: (state, payload) => {
    if(payload.childItemIndexInFilters !== null) {
      state.filters[payload.filterIndex].children[payload.childIndexInFilters].children[payload.childItemIndexInFilters].default = payload.default;
    } else {
      state.filters[payload.filterIndex].children[payload.childIndexInFilters].default = payload.default;
    }
  },
  [types.filters.mutations.MUTATE_UPDATE_FILTER_COUNTER_DEFAULT]: (state, payload) => {
    if( payload.itemIndex >=0 ) {
      console.log('if in store')
      state.filters[payload.filterIndex].children[payload.itemIndex].default = payload.default;
    } else  {
      console.log('else in store')
      state.filters[payload.filterIndex].default = payload.default;
    }
  },
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
  },
  [types.filters.actions.SET_UPDATE_FILTER_DEFAULT]: ({commit}, payload) => {
    commit(types.filters.mutations.MUTATE_UPDATE_FILTER_DEFAULT, payload);
  },

  [types.filters.actions.SET_UPDATE_FILTER_COUNTER_DEFAULT]: ({commit}, payload) => {
    commit(types.filters.mutations.MUTATE_UPDATE_FILTER_COUNTER_DEFAULT, payload);
  },
  [types.filters.actions.SET_UPDATE_FILTER_CHECKBOX_DEFAULT]: ({commit}, payload) => {
    commit(types.filters.mutations.MUTATE_UPDATE_FILTER_CHECKBOX_DEFAULT, payload);
  },

};

export default {
  state,
  getters,
  mutations,
  actions
};
