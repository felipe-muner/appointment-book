import axios from "axios";

class Teacher {
  constructor(server) {
    this.server = server;
  }
  async getAll() {
    return await axios.get(this.server + "/teacher");
  }
  async new(payload) {
    return await axios.post(this.server + "/teacher/create", payload);
  }
  async update(payload) {
    return await axios.put(this.server + "/teacher/update", payload);
  }
}

export default Teacher;
