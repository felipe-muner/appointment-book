import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {
  openPanel: state => {
    return [...Array(state.list.length).keys()];
  },
  getList: state => {
    return state.list;
  }
};

export const mutations = {
  search(state, payload) {
    Vue.set(state, "list", payload);
  },
  initCalculator(state) {
    Vue.set(state, "list", []);
  },
  closePanel(state, payload) {
    console.log("to no close panel");
  }
};

export const actions = {
  closePanel({ commit, dispatch, state }, payload) {
    commit("closePanel", payload);
  },
  async search({ commit, dispatch, state }, payload) {
    const resp = await MyApi.calculator.search(payload);
    commit("search", resp.data.teachers);
  },
  async initCalculator({ commit, dispatch, state }, payload) {
    console.log("chamei vuex init calculator");
    commit("initCalculator");
  }
};
