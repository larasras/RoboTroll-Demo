require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var swig = require("swig");

var indexRouter = require("./routes/index");
var storyRouter = require("./routes/story");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("html", swig.renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRETKEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/story", storyRouter);

module.exports = app;
