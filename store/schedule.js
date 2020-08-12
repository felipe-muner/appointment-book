import MyApi from "../api/MyApi";

export const state = () => ({
  currentList: [],
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
    console.log(payload);
    state[payload.list] = state[payload.list].filter(
      les => les.scheduleID !== payload.scheduleID
    );
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
    payload.lessonsInSchedule = state.currentList;
    await MyApi.schedule.copySchedule(payload);
    //decide what do do after rest
  },
  async deleteLesson({ commit, dispatch, state }, payload) {
    await MyApi.schedule.deleteLesson(payload.scheduleID);
    commit("deleteLesson", payload);
  }
};
