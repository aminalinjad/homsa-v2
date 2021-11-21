import * as types from "@/store/types";

const state = () => ({
  token: null
});
const getters = {
  [types.token.getters.GET_TOKEN]: state => {
    return state.token;
  }
};

const mutations = {
  [types.token.mutations.MUTATE_TOKEN]: (state, payload) => {
    state.token = payload;
  }
};

const actions = {
  [types.token.actions.SET_TOKEN]: ({ commit }, payload) => {
    commit(types.token.mutations.MUTATE_TOKEN, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
