const { Lesson } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const lessons = await Lesson.findAll();
      res.send(lessons);
    } catch (error) {
      console.log(error);
      console.log("error lesson getall");
      res.status(400).send({ error: error });
    }
  },
  async create(req, res, next) {
    try {
      console.log("felipe---");
      console.log(req.body);
      console.log("felipe---");

      const bulkLessons = [];

      req.body.lessons.forEach(les =>
        bulkLessons.push({
          day: les.day.name,
          grade: les.grade,
          startTime: "10:10",
          endTime: "10:45",
          school_ID: req.school.schoolID
        })
      );
      console.log(bulkLessons);
      const lessons = await Lesson.bulkCreate(bulkLessons);

      console.log("bulk---");
      console.log(lessons);
      console.log("bulk---");

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
  }
};
