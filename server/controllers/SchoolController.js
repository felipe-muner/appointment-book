const { School, Lesson } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const schools = await School.findAll({
        include: [Lesson]
      });
      console.log(schools);
      res.send(schools);
    } catch (error) {
      console.log(error);
      console.log("error school getall");
      res.status(400).send({ error: error });
    }
  },
  async create(req, res, next) {
    try {
      const school = await School.create({
        name: req.body.name,
        address: req.body.address,
        neighborhood: req.body.neighborhood
      });

      req.school = school;
      next();
    } catch (error) {
      console.log(error);
      console.log("error school create");
      res.status(400).send({ error: error });
    }
  },
  async update(req, res) {
    try {
      const school = await School.update(
        {
          name: req.body.name,
          address: req.body.address,
          neighborhood: req.body.neighborhood,

          active: req.body.active
        },
        {
          where: { schoolID: req.body.schoolID }
        }
      );
      const updated = await School.findByPk(req.body.schoolID);
      res.json({ code: 200, msg: "School updated", data: updated });
    } catch (error) {
      console.log(error);
      console.log("error school update");
      res.status(400).send({ error: error });
    }
  }
};
