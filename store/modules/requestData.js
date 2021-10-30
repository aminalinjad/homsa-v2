import * as types from "@/store/types";

const state = () => ({
  requestData: {}
});
const getters = {
  [types.requestData.getters.GET_REQUEST_DATA]: state => {
    return state.requestData;
  }
};

const mutations = {
  [types.requestData.mutations.MUTATE_REQUEST_DATA]: (state, payload) => {
    state.requestData = payload;
  }
};

const actions = {
  [types.requestData.actions.SET_REQUEST_DATA]: ({ commit }, payload) => {
    commit(types.requestData.mutations.MUTATE_REQUEST_DATA, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
