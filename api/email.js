import axios from "axios";

class Schedule {
  constructor(server) {
    this.server = server;
  }
  async search(payload) {
    return await axios.get(this.server + "/search"), payload;
  }
  async send(payload) {
    return await axios.get(this.server + "/send", payload);
  }
}

export default Schedule;
