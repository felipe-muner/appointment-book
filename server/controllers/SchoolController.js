const { School } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const schools = await School.findAll();
      res.send(schools);
    } catch (error) {
      console.log(error);
      console.log("error school getall");
      res.status(400).send({ error: error });
    }
  }
};
