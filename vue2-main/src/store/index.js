import Vue from "vue";
import Vuex from "vuex";
import { getProfile } from "@/service";

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
  actions: {
    fetchGetProfile({ commit }) {
      return getProfile().then((res) => {
        commit("SET_PROFILE", res);
      });
    },
  },
  modules: {},
});
