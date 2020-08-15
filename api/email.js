import axios from "axios";

class Email {
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
    return await axios.post(this.server + "/email/send", payload);
  }
}

export default Email;
