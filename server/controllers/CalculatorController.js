const sequelize = require("sequelize");
const { Op } = require("sequelize");
const utils = require("../utils/utils");
const { Schedule, Teacher, School } = require("../models");

module.exports = {
  setUpLessons(req, res, next) {
    let newTeacherArray = req.teachers.slice();

    req.teachers.forEach(teacher => {
      teacher.Schedules.forEach(lesson => {
        console.log(lesson.start);
        let day = utils.extractDate(lesson.start);

        let shiftLesson =
          lesson.start.getHours() < 13 ? "morning" : "afternoon";

        teacher.dataValues.shiftArray
          .find(shifts => shifts.day === day && shifts.shift === shiftLesson)
          .lessons.push(lesson);
      });
    });
    req.newTeacherArray = newTeacherArray;
    next();
  },
  async calcSalary(req, res, next) {
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

      // let shifts = utils.drawShift(firstDay, lastDay);
      searchList = searchList.map(item => {
        return {
          ...item.dataValues,
          shiftArray: utils.drawShift(firstDay, lastDay, item.teacherID)
        };
      });

      searchList.forEach(teacher => {
        teacher.Schedules.forEach(lesson => {
          let day = utils.extractDate(lesson.start);

          let shiftLesson =
            lesson.start.getHours() < 13 ? "Morning" : "Afternoon";

          teacher.shiftArray
            .find(shifts => shifts.day === day && shifts.shift === shiftLesson)
            .lessons.push(lesson);
        });
      });

      req.teachers = searchList;
      next();
    } catch (error) {
      console.log(error);
      console.log("error calculator send");
      res.status(400).send({ error: error });
    }
  }
};
