import * as types from "@/store/types";

const state = () => ({
  hoveredItem: null,
  searchResults: []
});
const getters = {
  [types.search.getters.GET_SEARCH_RESULTS]: state => {
    return state.searchResults;
  },
  [types.search.getters.GET_HOVERED_ITEM]: state => {
    return state.hoveredItem;
  },
};

const mutations = {
  [types.search.mutations.MUTATE_SEARCH_RESULTS]: (state, payload) => {
    state.searchResults = payload;
  },
  [types.search.mutations.MUTATE_HOVERED_ITEM]: (state, payload) => {
    state.hoveredItem = payload;
  },
};

const actions = {
  [types.search.actions.SET_SEARCH_RESULTS]: ({ commit }, payload) => {
    commit(types.search.mutations.MUTATE_SEARCH_RESULTS, payload);
  },
  [types.search.actions.SET_HOVERED_ITEM]: ({ commit }, payload) => {
    commit(types.search.mutations.MUTATE_HOVERED_ITEM, payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
