const sequelize = require("sequelize");
const { Op } = require("sequelize");
const utils = require("../utils/utils");
const { Schedule, Teacher, School } = require("../models");

module.exports = {
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

      searchList = searchList.map(item => {
        return {
          ...item.dataValues,
          shiftArray: utils.drawShift(firstDay, lastDay, item.teacherID)
        };
      });

      searchList = searchList.map(teacher => {
        teacher.Schedules = teacher.Schedules.map(lesson => {
          let day = utils.extractDate(lesson.start);

          let shiftLesson =
            lesson.start.getHours() < 13 ? "Morning" : "Afternoon";

          teacher.shiftArray
            .find(shifts => shifts.day === day && shifts.shift === shiftLesson)
            .lessons.push(lesson);

          return lesson;
        });

        teacher.shiftArray = teacher.shiftArray.map(shift => {
          shift.lessons = shift.lessons.reduce((acc, cur) => {
            shift.textToDisplay += utils.lessonTextToDisplay(cur);
            shift.totalMinutes += (cur.end - cur.start) / 1000 / 60;
            acc.push(cur);
            return acc;
          }, []);
          return shift;
        });
        return teacher;
      });

      res.json({
        msg: "respond with a calculator",
        data: "calculatorController",
        teachers: searchList
      });
    } catch (error) {
      console.log(error);
      console.log("error calculator send");
      res.status(400).send({ error: error });
    }
  }
};
