const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { Schedule, School, Lesson, Teacher } = require("../models");
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
      const { scheduleID } = req.body;
      const result = await Schedule.destroy({
        where: { scheduleID }
      });
      res.json({ code: 200, msg: "delete lesson", data: result });
    } catch (error) {
      console.log(error);
      console.log("error schedule delete lesson");
      res.status(400).send({ error: error });
    }
  },
  async fetchLessons(req, res) {
    try {
      const { date, school } = req.query;

      let scheduleList = await Schedule.findAll({
        where: sequelize.where(
          sequelize.fn("date", sequelize.col("Schedule.start")),
          "=",
          date
        ),
        include: [Teacher, Lesson, School]
      });

      const id = school ? JSON.parse(school).schoolID : false;

      if (id) {
        scheduleList = scheduleList.filter(item => item.school_id === id);
      }

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
      let { date, school, grade, teacher } = req.body;

      let bulkData = [];

      await Promise.all(
        grade.map(async gr => {
          let newLesson = {
            start: date + " " + gr.startTime,
            end: date + " " + gr.endTime,
            grade: gr.grade,
            lesson_id: gr.lessonID,
            teacher_id: teacher.teacherID,
            school_id: school.schoolID
          };
          if (
            !(await Schedule.findOne({
              where: {
                start: newLesson.start,
                end: newLesson.end,
                grade: newLesson.grade,
                school_id: newLesson.school_id
              }
            }))
          ) {
            bulkData.push(newLesson);
          }
        })
      );

      const schedules = await Schedule.bulkCreate(bulkData);

      res.json({
        code: 200,
        msg: "New schedule created",
        data: schedules,
        totalAdded: schedules.length
      });
    } catch (error) {
      console.log(error);
      console.log("error schedule create");
      res.status(400).send({ error: error });
    }
  },
  async copySchedule(req, res) {
    try {
      const { date, lessonsInSchedule } = req.body;

      let bulkData = [];

      await Promise.all(
        lessonsInSchedule.map(async lesson => {
          let formattedStart =
            date + " " + new Date(lesson.start).toTimeString().substr(0, 5);
          let formattedEnd =
            date + " " + new Date(lesson.end).toTimeString().substr(0, 5);

          let newLesson = {
            start: formattedStart,
            end: formattedEnd,
            grade: lesson.grade,
            lesson_id: lesson.lesson_id,
            teacher_id: lesson.Teachers[0].teacherID,
            school_id: lesson.Schools[0].schoolID
          };

          if (
            !(await Schedule.findOne({
              where: {
                start: newLesson.start,
                end: newLesson.end,
                grade: newLesson.grade,
                school_id: newLesson.school_id
              }
            }))
          ) {
            bulkData.push(newLesson);
          }
        })
      );

      const schedules = await Schedule.bulkCreate(bulkData);

      res.json({
        code: 200,
        msg: "New schedule copied",
        data: schedules,
        totalAdded: schedules.length
      });
    } catch (error) {
      console.log(error);
      console.log("error schedule copy");
      res.status(400).send({ error: error });
    }
  },
  async checkAvailability(req, res, next) {
    try {
      // console.log(req.body);
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
