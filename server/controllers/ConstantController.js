const { Constant } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const constants = await Constant.findAll();
      res.send(constants);
    } catch (error) {
      console.log(error);
      console.log("error constant getall");
      res.status(400).send({ error: error });
    }
  }
};
