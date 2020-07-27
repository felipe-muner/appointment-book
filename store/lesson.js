import MyApi from "../api/MyApi";

export const state = () => ({
  grades: [
    "Kindergarten",
    "1-A",
    "1-B",
    "1-C",
    "1-D",
    "1-E",
    "2-A",
    "2-B",
    "2-C",
    "2-D",
    "2-E",
    "3-A",
    "3-B",
    "3-C",
    "3-D",
    "3-E",
    "4-A",
    "4-B",
    "4-C",
    "4-D",
    "4-E",
    "5-A",
    "5-B",
    "5-C",
    "5-D",
    "5-E",
    "6-A",
    "6-B",
    "6-C",
    "6-D",
    "6-E",
    "7-A",
    "7-B",
    "7-C",
    "7-D",
    "7-E",
    "8-A",
    "8-B",
    "8-C",
    "8-D",
    "8-E"
  ],
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
  getGrades: state => {
    return state.grades;
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
  },
  async deleteLesson({ commit, dispatch, state }, payload) {
    const resp = await MyApi.school.deleteLesson(payload);
    return resp;
  },
  async addLesson({ commit, dispatch, state }, payload) {
    const resp = await MyApi.school.addLesson(payload);
    return resp;
  }
};
