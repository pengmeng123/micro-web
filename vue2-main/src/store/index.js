import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
  },
  getters: {},
  mutations: {
    SET_PROFILE(state, payload) {
      state.profile = payload;
    },
  },
  actions: {},
  modules: {},
});
