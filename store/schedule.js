import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {};

export const mutations = {};

export const actions = {
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.schedule.new(payload);
    return resp;
  }
};
