const sequelize = require("sequelize");
const { Op } = require("sequelize");
const utils = require("../utils/utils");
const { Schedule, Teacher, School } = require("../models");

module.exports = {
  createShifts(req, res, next) {
    let arrayShift = utils.drawShift(req.firstDay, req.lastDay);
    req.teachers.forEach(t => t.setDataValue("shiftArray", arrayShift));
    next();
  },
  setUpLessons(req, res, next) {
    req.teachers.forEach(teacher => {
      teacher.Schedules.forEach(lesson => {
        console.log(lesson);
        let day = utils.extractDate(lesson.start);
        console.log(day);
        // let shiftLesson = () ? 'morning' : 'afternoon'
        //   teacher.shiftArray
        //     .find(
        //       shifts => shifts.day === day && shifts.shift === shiftLesson
        //     ).lessons.push(lesson);
      });
    });
    next();
  },
  async search(req, res, next) {
    try {
      let { monthYear } = req.query;

      let year = parseInt(monthYear.split("-")[0]);
      let month = parseInt(monthYear.split("-")[1]) - 1;

      let firstDay = new Date(year, month, 1);
      let lastDay = new Date(year, month + 1, 0);

      let where = {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("date", sequelize.col("start")),
            ">=",
            firstDay
          ),
          sequelize.where(
            sequelize.fn("date", sequelize.col("end")),
            "<=",
            lastDay
          )
        ]
      };

      let searchList = await Teacher.findAll({
        where,
        include: [
          {
            model: Schedule,
            include: [School]
          }
        ]
      });

      req.teachers = searchList;
      req.firstDay = firstDay;
      req.lastDay = lastDay;

      next();
    } catch (error) {
      console.log(error);
      console.log("error calculator send");
      res.status(400).send({ error: error });
    }
  }
};
