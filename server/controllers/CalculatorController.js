const sequelize = require("sequelize");
const { Op } = require("sequelize");
const utils = require("../utils/utils");
const { Schedule, Teacher, School, Constant } = require("../models");

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
        order: [["teacherID", "ASC"]],
        include: [
          {
            model: Schedule,
            include: [School]
          }
        ]
      });

      searchList = searchList.map(item => {
        let newItem = {
          ...item.dataValues
        };
        newItem.workDays = newItem.workDays.split(",");
        newItem.shiftArray = utils.drawShift(firstDay, lastDay, newItem);
        return newItem;
      });

      const defaultMinutesShift = parseInt(
        (
          await Constant.findOne({
            where: {
              constantID: 3
            },
            raw: true
          })
        ).value
      );

      console.log(typeof defaultMinutesShift);

      searchList = searchList.map(teacher => {
        let cpTeacher = { ...teacher };
        cpTeacher.Schedules = cpTeacher.Schedules.map(lesson => {
          let day = utils.extractDate(lesson.start);

          let shiftLesson =
            lesson.start.getHours() < 13 ? "Morning" : "Afternoon";

          cpTeacher.shiftArray
            .find(shifts => shifts.day === day && shifts.shift === shiftLesson)
            .lessons.push(lesson);

          return lesson;
        });

        cpTeacher.workedShifts = cpTeacher.shiftArray.filter(
          shift => shift.lessons.length
        ).length;

        cpTeacher.totalShifts = cpTeacher.shiftArray.length;

        cpTeacher.finalSalary = 0;
        cpTeacher.extraMinutesSalary = 0;

        cpTeacher.shiftArray = cpTeacher.shiftArray.map(shift => {
          let cpShift = { ...shift };
          cpShift.lessons = cpShift.lessons.reduce((acc, cur) => {
            cpShift.textToDisplay += utils.lessonTextToDisplay(cur);
            cpShift.totalMinutes += (cur.end - cur.start) / 1000 / 60;

            // if (cpShift.totalMinutes > parseInt(Constant.defaultMinutesShift)) {
            //   cpTeacher.extraMinutesSalary +=
            //     cpShift.totalMinutes - parseInt(Constant.defaultMinutesShift);
            // }

            acc.push(cur);
            return acc;
          }, []);
          return cpShift;
        });

        // console.log("amountShift----");

        // console.log(cpTeacher.salary);

        // console.log(cpTeacher.shiftArray.length);

        // cpTeacher.salaryPerShift =
        //   cpTeacher.salary / cpTeacher.shiftArray.length;

        // console.log(cpTeacher.salaryPerShift);
        // console.log(cpTeacher.salaryPerShift * 22500);

        // console.log(cpTeacher.salaryPerShift.toFixed(2));

        // console.log(
        //   ((Math.round(cpTeacher.salaryPerShift * 100) / 100) * 22500).toFixed(
        //     2
        //   )
        // );
        // console.log((cpTeacher.salaryPerShift * 22500).toFixed(2));
        // console.log("amountShift----");
        console.log("--worked");
        console.log(cpTeacher.teacherID);
        console.log(cpTeacher.workedShifts);
        console.log("--worked");

        return cpTeacher;
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
