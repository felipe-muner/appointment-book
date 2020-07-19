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
}

export default Teacher;
