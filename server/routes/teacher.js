var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.json([
    { name: "felipe" },
    { name: "felipe2" },
    { name: "felipe3" },
    { name: "felipe4" }
  ]);
});

module.exports = router;
