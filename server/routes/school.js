var express = require("express");
var router = express.Router();

const schoolController = require("../controllers/SchoolController");
const lessonController = require("../controllers/LessonController");

router
  .get("/", schoolController.getAll)
  .post(
    "/create",
    schoolController.create,
    lessonController.create,
    (req, res) => {
      res.json({ code: 200, msg: "School created", data: req.school });
    }
  )
  .put("/update", schoolController.update);

module.exports = router;
