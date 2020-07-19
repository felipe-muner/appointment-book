import axios from "axios";

class School {
  constructor(server) {
    this.server = server;
  }
  async getAll() {
    return await axios.get(this.server + "/school");
  }
  async new(payload) {
    return await axios.post(this.server + "/school/create", payload);
  }
  async update(payload) {
    return await axios.put(this.server + "/school/update", payload);
  }
}

export default School;
