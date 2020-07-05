const { UserAccessControl } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const uac = await UserAccessControl.findAll();
      res.send(uac);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error });
    }
  },
  async getProfile(user) {
    try {
      const userProfile = await UserAccessControl.findOne({
        where: {
          user_ID: user.userID,
          system_ID: process.env.SYSTEM_ID
        }
      });
      return userProfile;
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error });
    }
  }
};
