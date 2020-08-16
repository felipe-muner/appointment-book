module.exports = {
  async search(req, res, next) {
    try {
      let { monthYear } = req.query;
      let year = parseInt(monthYear.split("-")[0]);
      let month = parseInt(monthYear.split("-")[1]) - 1;

      // const searchMonth = new Date(year, month - 1);

      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);

      console.log(firstDay);
      console.log(lastDay);

      req.myData = "calculator salary controller";
      next();
    } catch (error) {
      console.log(error);
      console.log("error calculator send");
      res.status(400).send({ error: error });
    }
  }
};
