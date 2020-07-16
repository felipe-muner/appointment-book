var express = require("express");
var router = express.Router();

const schoolController = require("../controllers/SchoolController");

router.get("/", schoolController.getAll)
.post("/create", schoolController.create)
.put("/update", schoolController.update)

module.exports = router;
