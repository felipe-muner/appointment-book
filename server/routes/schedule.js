var express = require("express");
var router = express.Router();

const scheduleController = require("../controllers/ScheduleController");

router
  .get("/", scheduleController.getAll)
  .get("/fetch-lessons", scheduleController.fetchLessons)
  .post(
    "/create",
    scheduleController.checkAvailability,
    scheduleController.create
  )
  .post("/copy-schedule", scheduleController.copySchedule)
  .put("/update", scheduleController.update)
  .delete("/lesson", scheduleController.deleteLesson);

module.exports = router;
