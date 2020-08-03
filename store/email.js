import Vue from "vue";
import MyApi from "../api/MyApi";

export const state = () => ({
  list: [],
  selected: []
});

export const getters = {
  // selectedListFormatted() {
  //   const resp = this.selectedList.map((school) => {
  //     school.felipe = Math.random() * 10;
  //     school.Schedules.map((schedule) => {
  //       schedule.day = new Date(schedule.start).toISOString().split("T")[0];
  //       schedule.startFormatted = schedule.start.substring(11, 16);
  //       schedule.endFormatted = schedule.end.substring(11, 16);
  //     });
  //     return school;
  //   });
  //   return resp;
  // },
  openPanel: state => {
    console.log("to no getter - " + [...Array(state.list.length).keys()]);
    return [...Array(state.list.length).keys()];
  },
  getList: state => {
    const resp = state.list.map(el => {
      el.formattedSchool = el.Schedules.map(sch => ({
        ...sch,
        day: new Date(sch.start).toISOString().split("T")[0],
        startFormatted: sch.start.substring(11, 16),
        endFormatted: sch.end.substring(11, 16)
      }));
      return { ...el, felipe: 20 };
    });
    return resp;
  },
  getSelected: state => {
    return state.selected;
  }
};

export const mutations = {
  search(state, payload) {
    Vue.set(state, "list", [...payload]);
  }
};

export const actions = {
  async search({ commit, dispatch, state }, payload) {
    console.log("tp aq search");
    const resp = await MyApi.email.search(payload);
    commit("search", resp.data.data.selectedList);
    return resp;
  },
  async send({ commit, dispatch, state }, payload) {
    console.log("tp aq send");
    const resp = await MyApi.email.send(payload);
    return resp;
  }
};
