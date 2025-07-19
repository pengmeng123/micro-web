import Vue from "vue";
import Vuex from "vuex";
import { getProfile, getMessageNum } from "@/service";
import { sum } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    messageNum: 0,
  },
  getters: {},
  mutations: {
    SET_PROFILE(state, payload) {
      state.profile = payload;
    },
    SET_MESSAGE_NUM(state, payload) {
      state.messageNum = payload;
    },
  },
  actions: {
    fetchGetProfile({ commit }) {
      return getProfile().then((res) => {
        commit("SET_PROFILE", res);
      });
    },
    fetchMessageNum({ commit }) {
      return getMessageNum().then((res) => {
        const arr = res.data
          .filter((v) => {
            return [19, 44, 64].includes(+v.type);
          })
          .map((v) => v.total);
        commit("SET_MESSAGE_NUM", sum(arr));
      });
    },
  },
  modules: {},
});
