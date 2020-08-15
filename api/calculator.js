import axios from "axios";

class Calculator {
  constructor(server) {
    this.server = server;
  }
  async search(payload) {
    console.log("to aqui api");
    return await axios.get(this.server + "/calculator", {
      params: {
        ...payload
      }
    });
  }
}

export default Calculator;
