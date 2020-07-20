var express = require("express");
var router = express.Router();

const scheduleController = require("../controllers/ScheduleController");

router
  .get("/", scheduleController.getAll)
  .post(
    "/create",
    scheduleController.checkAvailability,
    scheduleController.create
  )
  .put("/update", scheduleController.update);

module.exports = router;
