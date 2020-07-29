module.exports = {
  async calculateSalary(req, res, next) {
    try {
      console.log(req.body);
      req.myData = "calculator salary controller";
      next();
    } catch (error) {
      console.log(error);
      console.log("error email send");
      res.status(400).send({ error: error });
    }
  }
};
