// import auth from "@/tools/authentication";
// import storage from '~/tools/storage'
export default {
  state() {
    return {
      // step: 0,
    }
  },
  getters: {
    // step(state) {
    //   return state.step
    // },
  },
  mutations: {
    // setStep(state, payload) {
    //   storage.set("gatewayStep", payload);
    //   state.step = payload
    // },
  },
  actions: {
    getData({ commit }) {
      return this.$axios(
        {
          url: 'v4/core/currencies',
          method: 'get',
          headers: {
            // 'Content-Type': 'application/json',
          }
        }
      )
        .then((res)=> {
        })
        .catch((err) => {
        })
    },

  },
}
