var express = require("express");
var router = express.Router();
var rttAuth = require("../autenticate/RBTAutenticate");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = router;
