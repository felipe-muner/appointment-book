const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { Schedule, Lesson, Teacher } = require("../models");
const utils = require("../utils/utils");

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
  async deleteLesson(req, res) {
    try {
      // const scheduleList = await Schedule.findAll();
      res.json({
        code: 200,
        msg: "delete lesson",
        data: "de202020lete lesson"
      });
    } catch (error) {
      console.log(error);
      console.log("error schedule delete lesson");
      res.status(400).send({ error: error });
    }
  },
  async fetchLessons(req, res) {
    try {
      const { date, school } = req.query;
      const id = JSON.parse(school).schoolID;

      const scheduleList = await Schedule.findAll({
        // where: sequelize.where(sequelize.fn('date', sequelize.col('Schedule.start')), '=', date),
        where: {
          [Op.and]: [
            { school_id: id },
            sequelize.where(
              sequelize.fn("date", sequelize.col("Schedule.start")),
              "=",
              date
            )
          ]
        },
        include: [Teacher, Lesson]
      });

      scheduleList.forEach(ev => {
        ev.setDataValue(
          "lessonTime",
          utils.extractTime(ev.start) + " - " + utils.extractTime(ev.end)
        );
      });

      res.json({
        code: 200,
        msg: "fetch lessons",
        data: scheduleList
      });
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
