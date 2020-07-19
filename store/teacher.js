import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {};

export const mutations = {
  getAll(state, payload) {
    console.log("get all again");
    state.list = payload;
  }
};

export const actions = {
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.teacher.new(payload);
    dispatch("getAll");
  },
  async getAll({ commit, state }, payload) {
    const resp = await MyApi.teacher.getAll();
    commit("getAll", resp.data);
  }
};
