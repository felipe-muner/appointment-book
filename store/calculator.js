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
  }
};

export const actions = {
  async search({ commit, dispatch, state }, payload) {
    const resp = await MyApi.calculator.search(payload);
    console.log(resp.data.teachers);
    commit("search", resp.data.teachers);
  }
};
