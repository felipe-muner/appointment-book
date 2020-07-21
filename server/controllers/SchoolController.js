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
  },
  async create(req, res) {
    try {
      console.log(req.body);
      const school = await School.create({
        name: req.body.name,
        address: req.body.address,
        neighborhood: req.body.neighborhood
      });
      res.json({ code: 200, msg: "School created", data: school });
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

          mondayMorning: req.body.mondayMorning,
          mondayMorningTime: req.body.mondayMorningTime,
          mondayAfternoon: req.body.mondayAfternoon,
          mondayAfternoonTime: req.body.mondayAfternoonTime,

          tuesdayMorning: req.body.tuesdayMorning,
          tuesdayMorningTime: req.body.tuesdayMorningTime,
          tuesdayAfternoon: req.body.tuesdayAfternoon,
          tuesdayAfternoonTime: req.body.tuesdayAfternoonTime,

          wednesdayMorning: req.body.wednesdayMorning,
          wednesdayMorningTime: req.body.wednesdayMorningTime,
          wednesdayAfternoon: req.body.wednesdayAfternoon,
          wednesdayAfternoonTime: req.body.wednesdayAfternoonTime,

          thursdayMorning: req.body.thursdayMorning,
          thursdayMorningTime: req.body.thursdayMorningTime,
          thursdayAfternoon: req.body.thursdayAfternoon,
          thursdayAfternoonTime: req.body.thursdayAfternoonTime,

          fridayMorning: req.body.fridayMorning,
          fridayMorningTime: req.body.fridayMorningTime,
          fridayAfternoon: req.body.fridayAfternoon,
          fridayAfternoonTime: req.body.fridayAfternoonTime,

          saturdayMorning: req.body.saturdayMorning,
          saturdayMorningTime: req.body.saturdayMorningTime,
          saturdayAfternoon: req.body.saturdayAfternoon,
          saturdayAfternoonTime: req.body.saturdayAfternoonTime,

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
