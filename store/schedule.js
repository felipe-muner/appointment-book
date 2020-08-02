import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {
  getLessons: state => {
    return state.list;
  }
};

export const mutations = {
  fetchLessons(state, payload) {
    state.list = payload;
  },
  deleteLesson(state, payload) {
    state.list = state.list.filter(les => les.scheduleID !== payload);
  }
};

export const actions = {
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.new(payload);
  },
  async fetchLessons({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.fetchLessons(payload);
    commit("fetchLessons", resp.data.data);
  },
  async copySchedule({ commit, dispatch, state }, payload) {
    payload.lessonsInSchedule = state.list;
    await MyApi.schedule.copySchedule(payload);
    //decide what do do after rest
  },
  async deleteLesson({ commit, dispatch, state }, payload) {
    await MyApi.schedule.deleteLesson(payload);
    commit("deleteLesson", payload);
  }
};
