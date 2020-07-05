const { ProfileFunctionality } = require("../models");
const { Functionality } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      console.log("to aqui ProfileFunctionality get all");
      const pf = await ProfileFunctionality.findAll();
      res.send(pf);
    } catch (error) {
      console.log(error);
      console.log("error ProfileFunctionality getall");
      res.status(400).send({ error: error });
    }
  },
  async getProfileFunctionality(profile_ID) {
    try {
      const functionalities = await ProfileFunctionality.findAll({
        where: {
          profile_ID: profile_ID
        },
        include: [Functionality]
      });
      return functionalities;
    } catch (error) {
      console.log(error);
      console.log("error ProfileFunctionality getall");
      res.status(400).send({ error: error });
    }
  }
};
