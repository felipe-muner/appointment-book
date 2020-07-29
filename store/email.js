import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {};

export const mutations = {};

export const actions = {
  async search({ commit, dispatch, state }, payload) {
    console.log("tp aq search");
    const resp = await MyApi.email.search(payload);
    return resp;
  },
  async send({ commit, dispatch, state }, payload) {
    console.log("tp aq send");
    const resp = await MyApi.email.send(payload);
    return resp;
  }
};
