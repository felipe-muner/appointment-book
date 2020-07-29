import axios from "axios";

class Schedule {
  constructor(server) {
    this.server = server;
  }
  async search(payload) {
    return await axios.get(this.server + "/email/search", {
      params: {
        ...payload
      }
    });
  }
  async send(payload) {
    return await axios.get(this.server + "/email/send", {
      params: {
        ...payload
      }
    });
  }
}

export default Schedule;
