import * as types from "@/store/types";

const state = () => ({
  filters: []
});
const getters = {
  [types.filters.getters.GET_FILTERS]: state => {
    return state.filters;
  }
};

const mutations = {
  [types.filters.mutations.MUTATE_FILTERS]: (state, payload) => {
    state.filters = payload;
  }
};

const actions = {
  [types.filters.actions.SET_FILTERS]: ({ commit }, payload) => {
    commit(types.filters.mutations.MUTATE_FILTERS, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
