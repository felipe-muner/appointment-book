import MyApi from "../api/MyApi";

export const state = () => ({
  type: [
    {
      id: 1,
      name: "Kindergarten"
    },
    {
      id: 2,
      name: "Primary"
    },
    {
      id: 3,
      name: "Secondary"
    }
  ],
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
    const resp = await MyApi.school.getAll();
    commit("getAll", resp.data);
  },
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.school.new(payload);
    dispatch("getAll");
    return resp;
  },
  async update({ commit, dispatch, state }, payload) {
    console.log(payload);
    const resp = await MyApi.school.update(payload);
    dispatch("getAll");
    return resp;
  }
};
