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
    console.log("123deleteLessons");
    return await axios.delete(this.server + "/schedule/lesson", {
      data: { foo: "bar" }
    });
  }
  async new(payload) {
    return await axios.post(this.server + "/schedule/create", payload);
  }
  async update(payload) {
    return await axios.put(this.server + "/schedule/update", payload);
  }
}

export default Schedule;
