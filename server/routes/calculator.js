var express = require("express");
var router = express.Router();

const CalculatorController = require("../controllers/CalculatorController");

router.get("/", CalculatorController.calcSalary);

module.exports = router;
