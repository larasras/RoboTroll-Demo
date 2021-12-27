var express = require("express");
var router = express.Router();
var rttAuth = require("../autenticate/RBTAutenticate");
var storyGenerator = require("../storyGenerator/utils");

/* GET home page. */
router.get("/:genre", rttAuth.verifyRobot, function (req, res, next) {
  const story = storyGenerator.generateStoryPlot(req.params.genre);
  res.json({ success: true, story: story });
});

module.exports = router;
