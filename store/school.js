import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  types: [
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

export const getters = {
  schoolTypes: state => {
    return state.types;
  },
  getList: state => {
    return state.list;
  }
};

export const mutations = {
  getAll(state, payload) {
    const schools = payload.map(school => {
      school.textToDisplay = school.schoolID + " - " + school.name
      return {...school}
    })
    Vue.set(state, "list", schools);
  }
};

export const actions = {
  async getAll({ commit, state }, payload) {
    const resp = await MyApi.school.getAll();
    commit("getAll", resp.data);
    return resp;
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
