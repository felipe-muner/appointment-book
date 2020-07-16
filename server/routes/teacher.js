var express = require("express");
var router = express.Router();

const teacherController = require("../controllers/TeacherController");

router
  .get("/", teacherController.getAll)
  .post("/create", teacherController.create)
  .put("/update", teacherController.update)

module.exports = router;
