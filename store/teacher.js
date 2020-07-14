import MyApi from "../api/MyApi";

export const state = () => ({
  list: [1, 2, 3, 4]
});

export const getters = {};

export const mutations = {
  getAll(state, payload) {
    console.log("to na mutation " + payload);
    state.list = payload;
  }
};

export const actions = {
  async getAll({ commit, state }, payload) {
    console.log({ commit, state, payload });
    const resp = await MyApi.teacher.getAll();
    commit("getAll", resp.data);
  }
};
