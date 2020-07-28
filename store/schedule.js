import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {
  getLessonsByDaySchool: state => {
    return state.list;
  }
};

export const mutations = {
  fetchLessons(state, payload) {
    console.log(payload);
    state.list = payload;
  }
};

export const actions = {
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.new(payload);
    return resp;
  },
  async fetchLessons({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.fetchLessons(payload);
    commit("fetchLessons", resp.data.data);
    return resp;
  },
  async fetchLessonsToCopy({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.fetchLessons(payload);
    return resp;
  },
  async newFromCopy({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.newFromCopy(payload);
    return resp;
  },
  async deleteLesson({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.deleteLesson(payload);
    return resp;
  }
};
