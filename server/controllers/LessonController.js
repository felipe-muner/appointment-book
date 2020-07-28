const { Lesson } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const lessons = await Lesson.findAll();
      lessons.forEach(l =>
        l.setDataValue("timeRange", l.startTime + " - " + l.endTime)
      );
      res.send(lessons);
    } catch (error) {
      console.log(error);
      console.log("error lesson getall");
      res.status(400).send({ error: error });
    }
  },
  async create(req, res, next) {
    try {
      const bulkLessons = [];

      req.body.lessons.forEach(les =>
        bulkLessons.push({
          day: les.day.name,
          grade: les.grade,
          startTime: les.startTime,
          endTime: les.endTime,
          school_ID: req.school.schoolID
        })
      );

      const lessons = await Lesson.bulkCreate(bulkLessons);

      next();
    } catch (error) {
      console.log(error);
      console.log("error school create");
      res.status(400).send({ error: error });
    }
  },
  async update(req, res) {
    //updatelesson
    // try {
    //   const school = await School.update(
    //     {
    //       name: req.body.name,
    //       address: req.body.address,
    //       neighborhood: req.body.neighborhood,
    //       active: req.body.active
    //     },
    //     {
    //       where: { schoolID: req.body.schoolID }
    //     }
    //   );
    //   const updated = await School.findByPk(req.body.schoolID);
    //   res.json({ code: 200, msg: "School updated", data: updated });
    // } catch (error) {
    //   console.log(error);
    //   console.log("error school update");
    //   res.status(400).send({ error: error });
    // }
  },

  async deleteLesson(req, res) {
    try {
      const { lessonID } = req.body;
      const result = await Lesson.destroy({
        where: { lessonID }
      });
      res.json({ code: 200, msg: "delete lesson", data: result });
    } catch (error) {
      console.log(error);
      console.log("error schedule delete lesson");
      res.status(400).send({ error: error });
    }
  },

  async addLesson(req, res) {
    try {
      const lesson = await Lesson.create({
        day: req.body.day,
        grade: req.body.grade,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        school_ID: req.body.school_ID
      });
      res.json({ code: 200, msg: "add lesson", data: lesson });
    } catch (error) {
      console.log(error);
      console.log("error school add lesson");
      res.status(400).send({ error: error });
    }
  }
};
