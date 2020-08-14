const nodemailer = require("nodemailer");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const utils = require("../utils/utils");
const cheerio = require("cheerio");
const fs = require("fs");

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
      // const htmlDiv = `<div><h2>Hi ${name}</h2></div>`;
      let filename = "utils/templateTeacherEmail.html";
      let template = fs.readFileSync(process.cwd() + "/" + filename, "utf8");
      let mapIcon = "https://cdn0.iconfinder.com/data/icons/tuts/256/maps.png";
      // let mapIcon = 'https://freeiconshop.com/wp-content/uploads/edd/location-map-flat.png'

      const $ = cheerio.load(template);

      req.body.teachers.forEach(teacher => {
        let { emailLesson, name, email } = teacher;

        $("#name").text(name);
        $("#email").text(email);

        $("#tbodyLessons").empty();

        emailLesson.forEach(les => {
          $("#tbodyLessons").append(
            `<tr>
              <td>${les.Schools[0].name}</td>
              <td>${les.grade}</td>
              <td>
                ${utils.formatDDMMYYYY(les.start)}
              </td>
              <td>
                ${utils.extractTime(les.start)} - ${utils.extractTime(les.end)}
              </td>
              <td>
                <a href="${les.Schools[0].address}">
                  <img style="width:20px;height:20px;" src="${mapIcon}">
                </a>
              </td>
            </tr>`
          );
        });
        sendEmail({ to: email, htmlContent: $.html() });
      });
      next();
    } catch (error) {
      console.log(error);
      console.log("error email send");
      res.status(400).send({ error: error });
    }
  }
};

function sendEmail(infoEmail) {
  console.log("start");
  console.log(infoEmail);
  console.log("end");
  const mailOptions = {
    from: "felipe.muner@gmail.com", // sender address
    to: infoEmail.to, // list of receivers
    subject: "WorldLink - Schedule", // Subject line
    html: infoEmail.htmlContent // html content email
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  try {
  } catch (error) {
    console.log(error);
  }
}
