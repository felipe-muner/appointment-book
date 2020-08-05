import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  list: [],
  selected: []
});

export const getters = {
  openPanel: state => {
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
    ///full-list
    Vue.set(state, "list", payload);

    //select all email table
    const finalArray = [];
    payload.forEach(el => {
      el.Schedules.forEach(schedule => finalArray.push(schedule));
    });
    Vue.set(state, "selected", finalArray);
  },

  updateSelected(state, payload) {
    Vue.set(state, "selected", payload);
  }
};

export const actions = {
  async search({ commit, dispatch, state }, payload) {
    console.log("tp aq search");
    const resp = await MyApi.email.search(payload);
    commit("search", resp.data.data.selectedList);
  },
  async send({ commit, dispatch, state }) {
    const arraySendEmail = [...state.list];
    arraySendEmail.forEach(teacher => {
      teacher.emailLesson = state.selected.filter(
        sel => teacher.teacherID === sel.teacher_id
      );
    });

    const resp = await MyApi.email.send({ teachers: arraySendEmail });
  },
  async updateSelected({ commit, dispatch, state }, payload) {
    commit("updateSelected", payload);
  }
};
