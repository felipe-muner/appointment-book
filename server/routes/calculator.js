var express = require("express");
var router = express.Router();

const CalculatorController = require("../controllers/CalculatorController");

router.get("/", CalculatorController.search, function(req, res, next) {
  res.json({
    msg: "respond with a calculator",
    data: req.myData,
    teachers: req.teachers
  });
});

module.exports = router;
