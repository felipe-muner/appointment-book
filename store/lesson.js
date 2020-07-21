import MyApi from "../api/MyApi";

export const state = () => ({
  classes: ["Kindergarten", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  days: [
    { id: 0, name: "Sunday" },
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" }
  ]
});

export const getters = {
  getClasses: state => {
    return state.classes;
  },
  getDays: state => {
    return state.days;
  }
};

export const mutations = {};

export const actions = {
  async new({ commit, dispatch, state }, payload) {
    const resp = await MyApi.lesson.new(payload);
    return resp;
  }
};
