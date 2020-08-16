const sequelize = require("sequelize");
const { Op } = require("sequelize");

const { Schedule, Teacher, School } = require("../models");

module.exports = {
  async search(req, res, next) {
    try {
      let { monthYear } = req.query;
      let year = parseInt(monthYear.split("-")[0]);
      let month = parseInt(monthYear.split("-")[1]) - 1;

      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);

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
        include: [
          {
            model: Schedule,
            include: [School, Teacher]
          }
        ]
      });

      req.myData = "calculator salary controller";
      req.teachers = searchList;
      next();
    } catch (error) {
      console.log(error);
      console.log("error calculator send");
      res.status(400).send({ error: error });
    }
  }
};
