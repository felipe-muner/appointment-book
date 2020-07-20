import MyApi from "../api/MyApi";

export const state = () => ({
  list: []
});

export const getters = {
  getList: state => {
    return state.list;
  }
};

export const mutations = {
  getAll(state, payload) {
    console.log("get all again");
    state.list = payload;
  }
};

export const actions = {
  async getAll({ commit, state }, payload) {
    const resp = await MyApi.teacher.getAll();
    commit("getAll", resp.data);
  },
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.teacher.new(payload);
    dispatch("getAll");
    return resp;
  },
  async update({ commit, dispatch, state }, payload) {
    console.log(payload);
    const resp = await MyApi.teacher.update(payload);
    dispatch("getAll");
    return resp;
  }
};
