import axios from "axios";

class School {
  constructor(server) {
    this.server = server;
  }
  async getAll() {
    return await axios.get(this.server + "/school");
  }
}

export default School;
