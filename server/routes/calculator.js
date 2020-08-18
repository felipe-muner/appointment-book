var express = require("express");
var router = express.Router();

const CalculatorController = require("../controllers/CalculatorController");

router.get("/", CalculatorController.calcSalary, function(req, res) {
  res.json({
    msg: "respond with a calculator",
    data: req.myData,
    teachers: req.teachers
  });
});

module.exports = router;
