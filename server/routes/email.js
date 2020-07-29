var express = require("express");
var router = express.Router();

const EmailController = require("../controllers/EmailController");

router
  .get("/", function(req, res, next) {
    res.json({ msg: "respond with a email" });
  })
  .get("/search", EmailController.search, function(req, res, next) {
    console.log(req.myData);
    res.json({ msg: "respond with a search email route", data: req.myData });
  })
  .get("/send", EmailController.send, function(req, res, next) {
    console.log(req.myData);
    res.json({ msg: "respond with a send email route", data: req.myData });
  });

module.exports = router;
