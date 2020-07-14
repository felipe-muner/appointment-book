var express = require("express");
var router = express.Router();

const teacherController = require("../controllers/TeacherController");

router.get("/", teacherController.getAll);

module.exports = router;
