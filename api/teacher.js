import axios from "axios";

class Teacher {
  constructor(server) {
    this.server = server;
  }
  async getAll() {
    return await axios.get(this.server + "/teacher");
  }
}

export default Teacher;
