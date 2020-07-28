import axios from "axios";

class Schedule {
  constructor(server) {
    this.server = server;
  }
  async getAll() {
    return await axios.get(this.server + "/schedule");
  }
  async fetchLessons(payload) {
    return await axios.get(this.server + "/schedule/fetch-lessons", {
      params: {
        ...payload
      }
    });
  }
  async deleteLesson(payload) {
    return await axios.delete(this.server + "/schedule/lesson", {
      data: { scheduleID: payload }
    });
  }
  async addLesson(payload) {
    return await axios.post(this.server + "/schedule/lesson", payload);
  }
  async newFromCopy(payload) {
    return await axios.post(this.server + "/schedule/new-from-copy", payload);
  }
  async new(payload) {
    return await axios.post(this.server + "/schedule/create", payload);
  }
  async update(payload) {
    return await axios.put(this.server + "/schedule/update", payload);
  }
}

export default Schedule;
