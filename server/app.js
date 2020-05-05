require("dotenv").config();
var express = require("express");
var cookieParser = require("cookie-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const systemRouter = require("./routes/system");
const functionalityRouter = require("./routes/functionality");

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/system", systemRouter);
app.use("/functionality", functionalityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(404);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
