import MyApi from "../api/MyApi";

export const state = () => ({
  oldDay: []
});

export const getters = {
  getLessons: state => {
    return state.oldDay;
  }
};

export const mutations = {
  fetchLessons(state, payload) {
    state.oldDay = payload;
  },
  deleteLesson(state, payload) {
    state.oldDay = state.oldDay.filter(les => les.scheduleID !== payload);
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
    payload.lessonsInSchedule = state.oldDay;
    await MyApi.schedule.copySchedule(payload);
    //decide what do do after rest
  },
  async deleteLesson({ commit, dispatch, state }, payload) {
    await MyApi.schedule.deleteLesson(payload);
    commit("deleteLesson", payload);
  }
};
