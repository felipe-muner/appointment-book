import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {
  getLessons: state => {
    console.log(state);
    console.log("--felipe to aqui");
    return state.list;
  }
};

export const mutations = {
  fetchLessons(state, payload) {
    state.list = payload;
  },
  deleteLesson(state, payload) {
    state.list = payload.filter(les => les.scheduleID !== payload.scheduleID);
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
  },
  async copySchedule({ commit, dispatch, state }, payload) {
    payload.lessonsInSchedule = state.list;
    const resp = await MyApi.schedule.copySchedule(payload);
    //decide what do do after rest
  },
  async deleteLesson({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.deleteLesson(payload);
    commit("deleteLesson", resp.data.data);
  }
};
