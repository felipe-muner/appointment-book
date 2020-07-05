const { Functionality } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      console.log("to aqui functionalidade get all");
      const f = await Functionality.findAll();
      res.send(f);
    } catch (error) {
      console.log(error);
      console.log("error functionality getall");
      res.status(400).send({ error: error });
    }
  },
  async getFunctionalities(profile_ID) {
    try {
      const functionalities = await Functionality.findAll({
        where: {
          profile_ID: profile_ID
        }
      });
      console.log(functionalities);
      return functionalities;
    } catch (error) {
      console.log(error);
      console.log("error ProfileFunctionality getall");
      res.status(400).send({ error: error });
    }
  }
};
