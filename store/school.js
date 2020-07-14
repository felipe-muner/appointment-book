import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
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
    const resp = await MyApi.school.getAll();
    commit("getAll", resp.data);
  }
};
