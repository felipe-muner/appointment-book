const nodemailer = require("nodemailer");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { Schedule, Teacher, Lesson, School } = require("../models");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASS_GMAIL
  }
});

module.exports = {
  recoverPassword(email) {
    const mailOptions = {
      from: "felipe.muner@gmail.com", // sender address
      to: email, // list of receivers
      subject: "System Message - Did you forget your password?", // Subject line
      html: "<button>Click here to change your password</button>" // plain text body
    };
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    try {
    } catch (error) {
      console.log(error);
    }
  },
  async search(req, res, next) {
    try {
      const { startDate, endDate } = req.query;
      let where = {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("date", sequelize.col("start")),
            ">=",
            startDate
          ),
          sequelize.where(
            sequelize.fn("date", sequelize.col("end")),
            "<=",
            endDate
          )
        ]
      };

      let searchList = await Schedule.findAll({
        attributes: ["school_id"],
        group: ["school_id"],
        where: where,
        include: [School]
      });

      await Promise.all(
        searchList.map(async schoolItem => {
          where.school_id = schoolItem.School.schoolID;
          schoolItem.setDataValue(
            "lessonsInSchool",
            await Schedule.findAll({
              where: where
            })
          );
        })
      );

      delete where.school_id;

      let searchListTeacher = await Schedule.findAll({
        attributes: ["teacher_id"],
        group: ["teacher_id"],
        where: where,
        include: [Teacher]
      });

      await Promise.all(
        searchListTeacher.map(async searchListTeacher => {
          where.teacher_id = searchListTeacher.Teacher.teacherID;
          searchListTeacher.setDataValue(
            "teacherList",
            await Schedule.findAll({
              where: where
            })
          );
        })
      );

      req.myData = "email controller search";
      req.selectedList = searchList;
      req.searchListTeacher = searchListTeacher;
      next();
    } catch (error) {
      console.log(error);
      console.log("error email search");
      res.status(400).send({ error: error });
    }
  },
  async send(req, res, next) {
    try {
      const { startDate, endDate } = req.query;
      let where = {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("date", sequelize.col("start")),
            ">=",
            startDate
          ),
          sequelize.where(
            sequelize.fn("date", sequelize.col("end")),
            "<=",
            endDate
          )
        ]
      };

      let searchList = await School.findAll({
        where,
        include: [
          {
            model: Schedule,
            where: {},
            include: [
              {
                model: Teacher
              }
            ]
          }
        ]
      });

      req.myData = searchList;
      next();
    } catch (error) {
      console.log(error);
      console.log("error email send");
      res.status(400).send({ error: error });
    }
  }
};
