const { Teacher } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const teachers = await Teacher.findAll();
      res.send(teachers);
    } catch (error) {
      console.log(error);
      console.log("error teacher getall");
      res.status(400).send({ error: error });
    }
  },
  async create(req, res) {
    try {
      const teacher = await Teacher.create({
        email: req.body.email,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        isTeacherAssistant: req.body.isTeacherAssistant
      });
      res.send(teacher);
    } catch (error) {
      console.log(error);
      console.log("error teacher create");
      res.status(400).send({ error: error });
    }
  },
  async update(req, res) {
    try {
      const teacher = await Teacher.update({
        email: req.body.email,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        phone: req.body.phone,
        isTeacherAssistant: req.body.isTeacherAssistant,
        active: req.body.active
      }, {
        where: { teacherID: req.body.teacherID }
      });
      res.send(teacher);
    } catch (error) {
      console.log(error);
      console.log("error teacher update");
      res.status(400).send({ error: error });
    }
  },  
};
