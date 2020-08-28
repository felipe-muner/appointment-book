import axios from "axios";

class Calculator {
  constructor(server) {
    this.server = server;
  }
  async search(payload) {
    return await axios.get(this.server + "/calculator", {
      params: {
        ...payload
      }
    });
  }
}

export default Calculator;
