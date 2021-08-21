import * as types from "@/store/types";

const state = () => ({
  mapLayout: false
});
const getters = {
  [types.structure.getters.GET_MAP_LAYOUT]: state => {
    return state.mapLayout;
  }
};

const mutations = {
  [types.structure.mutations.MUTATE_MAP_LAYOUT]: (state, payload) => {
    state.mapLayout = payload;
  }
};

const actions = {
  [types.structure.actions.SET_MAP_LAYOUT]: ({ commit }, payload) => {
    commit(types.structure.mutations.MUTATE_MAP_LAYOUT, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
