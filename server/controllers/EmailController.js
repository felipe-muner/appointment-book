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
      const where = {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("date", sequelize.col("start")),
            ">=",
            req.query.startDate
          ),
          sequelize.where(
            sequelize.fn("date", sequelize.col("end")),
            "<=",
            req.query.endDate
          )
        ]
      };

      let searchList = await Schedule.findAll({
        where: where,
        include: [Teacher, Lesson, School]
      });

      req.myData = "email controller search";
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
      console.log(req.body);
      console.log(req.query);
      console.log(req.params);
      req.myData = "email controller send";
      next();
    } catch (error) {
      console.log(error);
      console.log("error email send");
      res.status(400).send({ error: error });
    }
  }
};
