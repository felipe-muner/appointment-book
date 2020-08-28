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
        cpTeacher.finalSalaryFormatted = 0;
        cpTeacher.extraMinutesSalary = 0;

        cpTeacher.shiftArray = cpTeacher.shiftArray.map(shift => {
          let cpShift = { ...shift };
          cpShift.lessons = cpShift.lessons.reduce((acc, cur) => {
            //CALCULATE MINUTES PER SHIFT TEST EXTRA MINUTES
            cpShift.textToDisplay += utils.lessonTextToDisplay(cur);
            cpShift.totalMinutes += (cur.end - cur.start) / 1000 / 60;

            if (cpShift.totalMinutes > defaultMinutesShift) {
              cpTeacher.extraMinutesSalary +=
                cpShift.totalMinutes - defaultMinutesShift;
            }

            acc.push(cur);
            return acc;
          }, []);
          return cpShift;
        });

        cpTeacher.salary = cpTeacher.salary * 22500;

        console.log("\n");
        console.log("------------------------");
        console.log("--teacher worked log");
        console.log("teacher id: " + cpTeacher.teacherID);
        console.log("maximum minutes per shift: " + defaultMinutesShift);
        console.log("worked shifts: " + cpTeacher.workedShifts);
        console.log("total shifts: " + cpTeacher.totalShifts);

        const shiftValue = cpTeacher.salary / cpTeacher.totalShifts;
        console.log("shift Value: " + shiftValue);

        const percWorkedShifts = cpTeacher.workedShifts / cpTeacher.totalShifts;
        console.log("  %  percent worked shifts : " + percWorkedShifts);

        console.log(
          "base salary: " + new Intl.NumberFormat().format(cpTeacher.salary)
        );
        console.log(" % salary : " + percWorkedShifts * cpTeacher.salary);

        const totalShiftValue = percWorkedShifts * cpTeacher.salary;
        console.log(
          "   salary : " +
            new Intl.NumberFormat("vi", {
              style: "currency",
              currency: "DNG",
              minimumFractionDigits: 3,
              currencyDisplay: "symbol"
            }).format(totalShiftValue)
        );
        console.log(
          "   salary ROUNDED : " +
            new Intl.NumberFormat("vi", {
              style: "currency",
              currency: "DNG",
              minimumFractionDigits: 0,
              currencyDisplay: "symbol"
            }).format(Math.round(totalShiftValue)) +
            " - " +
            Math.round(totalShiftValue)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        );

        console.log("extra minutes shifts: " + cpTeacher.extraMinutesSalary);

        const extraMoney =
          (cpTeacher.extraMinutesSalary / defaultMinutesShift) * shiftValue;
        console.log("extra money shifts: " + extraMoney);

        cpTeacher.finalSalary = totalShiftValue + extraMoney;
        cpTeacher.finalSalaryFormatted = Math.round(cpTeacher.finalSalary)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        console.log("final salary: " + cpTeacher.finalSalary);
        console.log(
          "final salary ROUNDED : " +
            Math.round(cpTeacher.finalSalary)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        );

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
