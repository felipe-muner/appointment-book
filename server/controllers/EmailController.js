const nodemailer = require("nodemailer");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const utils = require("../utils/utils");

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
      const { startDate, endDate, groupBySearch } = req.query;
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

      let searchList = await Teacher.findAll({
        where,
        include: [
          {
            model: Schedule,
            include: [School, Teacher]
          }
        ]
      });
      
      searchList.forEach(sched => {
        console.log(sched);
        sched.Schedules.forEach(item => {
          item.setDataValue(
            "day",
            new Date(item.start).toISOString().split("T")[0]
          );
          item.setDataValue(
            "lessonTime",
            utils.extractTime(item.start) + " - " + utils.extractTime(item.end)
          );
        });
      });

      req.selectedList = searchList;
      next();
    } catch (error) {
      console.log(error);
      console.log("error email search");
      res.status(400).send({ error: error });
    }
  },
  async send(req, res, next) {
    try {
      
      console.log(req.body)
      // const unique = [...new Set(data.map(item => item.age))];

      
      next();
    } catch (error) {
      console.log(error);
      console.log("error email send");
      res.status(400).send({ error: error });
    }
  }
};
