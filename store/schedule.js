import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  indexList: [],
  oldList: [],
  newList: []
});

export const getters = {
  getList: state => list => {
    return state[list];
  }
};

export const mutations = {
  fetchLessons(state, payload) {
    console.log(payload);
    state[payload.list] = payload.lessons;
  },
  deleteLesson(state, payload) {
    state[payload.list] = state[payload.list].filter(
      les => les.scheduleID !== payload.scheduleID
    );
  },
  deleteLessonToCopy(state, payload) {
    state.oldList = state.oldList.filter(les => les.scheduleID !== payload);
  },
  initCopySchedule(state) {
    Vue.set(state, "oldList", []);
    Vue.set(state, "newList", []);
  }
};

export const actions = {
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.new(payload);
  },
  async fetchLessons({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.fetchLessons(payload);
    payload.lessons = resp.data.data;
    commit("fetchLessons", payload);
  },
  async copySchedule({ commit, dispatch, state }, payload) {
    payload.lessonsInSchedule = state.oldList;
    const resp = await MyApi.schedule.copySchedule(payload);
    dispatch("fetchLessons", payload);
    return resp;
  },
  async deleteLesson({ commit, dispatch, state }, payload) {
    await MyApi.schedule.deleteLesson(payload.scheduleID);
    commit("deleteLesson", payload);
  },
  async deleteLessonToCopy({ commit, dispatch, state }, payload) {
    commit("deleteLessonToCopy", payload);
  },
  async initCopySchedule({ commit, dispatch, state }, payload) {
    commit("initCopySchedule");
  }
};
