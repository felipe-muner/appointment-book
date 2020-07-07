const { Teacher } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const teachers = await Teacher.findAll();
      res.send(teachers);
    } catch (error) {
      console.log(error);
      console.log("error teacher getall");
      res.status(400).send({ error: error });
    }
  }
};
