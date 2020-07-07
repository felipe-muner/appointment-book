const { AppointmentBook } = require("../models");

module.exports = {
  async getAll(req, res) {
    try {
      const appointmentBookList = await AppointmentBook.findAll();
      res.send(appointmentBookList);
    } catch (error) {
      console.log(error);
      console.log("error appointmentBookList getall");
      res.status(400).send({ error: error });
    }
  }
};
