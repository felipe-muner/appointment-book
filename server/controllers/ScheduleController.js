// const { Schedule } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      // const scheduleList = await Schedule.findAll();
      res.json({ code: 200, msg: "get all schedule", data: "getall" });
    } catch (error) {
      console.log(error);
      console.log("error schedule getall");
      res.status(400).send({ error: error });
    }
  },
  async fetchLessons(req, res) {
    try {
      const {school} = req.query
      console.log(JSON.parse(school).schoolID)

      console.log('fetchLessons');
      console.log(req.query);
      console.log(typeof req.query.school);
      console.log('fetchLessons');
      res.json({ code: 200, msg: "fetch lessons", data: JSON.stringify(req.body) });
    } catch (error) {
      console.log(error);
      console.log("error schedule getall");
      res.status(400).send({ error: error });
    }
  },  
  async create(req, res) {
    try {
      console.log(req.body);
      res.json({ code: 200, msg: "New class created", data: "new" });
    } catch (error) {
      console.log(error);
      console.log("error schedule create");
      res.status(400).send({ error: error });
    }
  },
  async checkAvailability(req, res, next) {
    try {
      console.log(req.body);
      next();
    } catch (error) {
      console.log(error);
      console.log("error schedule check Availability");
      res.status(400).send({ error: error });
    }
  },
  async update(req, res) {
    try {
      // const schedule = await Schedule.update();
      // const updated = await School.findByPk(req.body.schoolID);
      res.json({
        code: 200,
        msg: "Schedule updated",
        data: "schedule updated"
      });
    } catch (error) {
      console.log(error);
      console.log("error schedule update");
      res.status(400).send({ error: error });
    }
  }
};
