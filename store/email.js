import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  list: [],
  selected: []
});

export const getters = {
  // selectedListFormatted() {
  //   const resp = this.selectedList.map((school) => {
  //     school.felipe = Math.random() * 10;
  //     school.Schedules.map((schedule) => {
  //       schedule.day = new Date(schedule.start).toISOString().split("T")[0];
  //       schedule.startFormatted = schedule.start.substring(11, 16);
  //       schedule.endFormatted = schedule.end.substring(11, 16);
  //     });
  //     return school;
  //   });
  //   return resp;
  // },
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
  cleanArray(state, payload) {
    Vue.set(state, "list", [...[]]);
  }
};

export const actions = {
  async search({ commit, dispatch, state }, payload) {
    console.log("tp aq search");
    const resp = await MyApi.email.search(payload);
    commit("search", resp.data.data.selectedList);
    return resp;
  },
  async send({ commit, dispatch, state }, payload) {
    console.log("tp aq send");
    const resp = await MyApi.email.send(payload);
    return resp;
  },
  async cleanArray({ commit, dispatch, state }, payload) {
    commit("cleanArray", []);
  }
};
