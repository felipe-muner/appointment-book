const { Teacher } = require("../models");
const utils = require("../utils/utils");

module.exports = {
  async getAll(req, res) {
    try {
      let teachers = await Teacher.findAll();

      const teachersUpdated = teachers.map(tea => {
        tea.dataValues.formatBirthday = utils.formatDDMMYYYY(tea.birthday);
        tea.dataValues.birthdayYYYYMMDD = utils.extractDate(tea.birthday);
        tea.dataValues.workDays = tea.dataValues.workDays.split(",");
        return tea;
      });

      // teachers.forEach(
      //   t => (t.dataValues.formatBirthday = utils.formatDDMMYYYY(t.birthday))
      // );
      // teachers.forEach(
      //   t => (t.dataValues.birthdayYYYYMMDD = utils.extractDate(t.birthday))
      // );
      res.send(teachersUpdated);
    } catch (error) {
      console.log(error);
      console.log("error teacher getall");
      res.status(400).send({ error: error });
    }
  },

  async create(req, res) {
    try {
      const isEmailInDB = await Teacher.findOne({
        where: { email: req.body.email }
      });
      if (isEmailInDB) {
        return res.json({ code: 400, msg: "ERROR: Duplicated e-mail." });
      }

      const teacher = await Teacher.create({
        email: req.body.email,
        name: req.body.name,
        birthday: req.body.birthday,
        phone: req.body.phone,
        salary: req.body.salary,
        workDays: req.body.workDays.sort().toString(), // sort it
        isTeacherAssistant: req.body.isTeacherAssistant
      });
      res.json({ code: 200, msg: "Teacher created", data: teacher });
    } catch (error) {
      console.log("to aq");
      console.log(error);
      console.log("error teacher create");
      return res.json({ code: 400, msg: "ERROR: " + error });
    }
  },

  async update(req, res) {
    try {
      const teacherToUpdate = await Teacher.findByPk(req.body.teacherID);

      if (teacherToUpdate.email !== req.body.email) {
        const isEmailInDB = await Teacher.findOne({
          where: { email: req.body.email }
        });
        if (isEmailInDB) {
          return res.json({ code: 400, msg: "ERROR: Duplicated e-mail." });
        }
      }

      const teacher = await Teacher.update(
        {
          email: req.body.email,
          name: req.body.name,
          birthday: req.body.birthdayYYYYMMDD,
          phone: req.body.phone,
          isTeacherAssistant: req.body.isTeacherAssistant,
          salary: req.body.salary,
          workDays: req.body.workDays.sort().toString(),
          active: req.body.active
        },
        {
          where: { teacherID: req.body.teacherID }
        }
      );
      const updated = await Teacher.findByPk(req.body.teacherID);
      res.json({ code: 200, msg: "Teacher updated", data: updated });
    } catch (error) {
      console.log(error);
      console.log("error teacher update");
      return res.json({ code: 400, msg: "ERROR: " + error });
    }
  }
};
