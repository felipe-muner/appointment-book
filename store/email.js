import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  list: [],
  selected: []
});

export const getters = {
  openPanel: state => {
    console.log("to no getter - " + [...Array(state.list.length).keys()]);
    return [...Array(state.list.length).keys()];
  },
  getList: state => {
    return state.list;
  },
  getSelected: state => {
    return state.selected;
  }
};

export const mutations = {
  search(state, payload) {
    Vue.set(state, "list", [...payload]);
  },
  cleanSearch(state, payload) {
    Vue.set(state, "list", [...[]]);
    Vue.set(state, "selected", [...[]]);
  },
  updateSelected(state, payload) {
    state.selected = [...payload];
  }
};

export const actions = {
  async search({ commit, dispatch, state }, payload) {
    console.log("tp aq search");
    const resp = await MyApi.email.search(payload);
    commit("search", resp.data.data.selectedList);
  },
  async send({ commit, dispatch, state }, payload) {
    console.log("tp aq send");
    const resp = await MyApi.email.send(payload);
    return resp;
  },
  async cleanSearch({ commit, dispatch, state }, payload) {
    commit("cleanSearch", []);
  },
  async updateSelected({ commit, dispatch, state }, payload) {
    commit("updateSelected", payload);
  }
};
