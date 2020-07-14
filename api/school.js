import axios from "axios";

class School {
  constructor(server) {
    this.server = server;
  }
  async getAllSchool() {
    return axios.get(this.server + "/school");
  }
}

export default School;
