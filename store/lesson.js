import MyApi from "../api/MyApi";

export const state = () => ({
  classes: ["Kindergarten", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
});

export const getters = {
  getClasses: state => {
    return state.classes;
  }
};

export const mutations = {};

export const actions = {
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.lesson.new(payload);
    return resp;
  }
};
