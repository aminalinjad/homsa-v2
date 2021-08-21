import * as types from "@/store/types";

const state = () => ({
  currencies: []
});
const getters = {
  [types.currencies.getters.GET_CURRENCIES]: state => {
    return state.currencies;
  }
};

const mutations = {
  [types.currencies.mutations.MUTATE_CURRENCIES]: (state, payload) => {
    state.currencies = payload;
  }
};

const actions = {
  [types.currencies.actions.SET_CURRENCIES]: ({ commit }, payload) => {
    commit(types.currencies.mutations.MUTATE_CURRENCIES, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};