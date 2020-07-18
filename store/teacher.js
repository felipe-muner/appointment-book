import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {};

export const mutations = {
  getAll(state, payload) {
    state.list = payload;
  }
};

export const actions = {
  async getAll({ commit, state }, payload) {
    const resp = await MyApi.teacher.getAll();
    commit("getAll", resp.data);
  }
};
