module.exports = {
  async search(req, res, next) {
    try {
      console.log(req.query);
      req.myData = "calculator salary controller";
      next();
    } catch (error) {
      console.log(error);
      console.log("error calculator send");
      res.status(400).send({ error: error });
    }
  }
};
