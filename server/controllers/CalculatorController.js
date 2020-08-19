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

      searchList.forEach(teacher => {
        teacher.Schedules.forEach(lesson => {
          let day = utils.extractDate(lesson.start);

          let shiftLesson =
            lesson.start.getHours() < 13 ? "Morning" : "Afternoon";

          teacher.shiftArray
            .find(shifts => shifts.day === day && shifts.shift === shiftLesson)
            .lessons.push(lesson);
        });
        // /\ seta as aulas em cada shift
        /////////////////////////////////////////////
        // \/ soma os minutos do shift
        teacher.shiftArray.forEach(shift => {
          console.log("comecei");
          console.log(shift);
          shift.totalMinutes = shift.lessons.reduce(
            (sum, cur) => sum + (cur.end - cur.start) / 1000 / 60,
            0
          );
          // shift.lessons.forEach(lesson => {
          //   shift.totalMinutes += (lesson.end - lesson.start) / 1000 / 60;
          //   console.log(lesson.get());
          // });
          console.log(shift.totalMinutes);
          console.log("terminei");
          // let total = shift.lessons.reduce((a, b) => ({ x: a.x + b.x }));
        });

        // console.log("----init");
        // console.log(teacher.shiftArray);
        // console.log("----fim");
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
