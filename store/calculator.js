import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {
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
    console.log("to aqui");
    const resp = await MyApi.calculator.search(payload);
    commit("search", resp.data.data);
  }
};
