var express = require("express");
var router = express.Router();

const schoolController = require("../controllers/SchoolController");

router.get("/", schoolController.getAll);

module.exports = router;
