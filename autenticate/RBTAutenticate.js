const model = require("../robotroll_model/model");
var RoboTroll = require("../robotroll");

const initPayload = {
  time_series: [1],
};

const maximum_behavior = 10;
const max_age = 30000;

exports.verifyRobot = (req, res, next) => {
  if (req.query.robot_is !== "true") {
    next();
    return;
  }
  if (+new Date() - req.session.maxAge >= max_age) {
    req.session.rtt = undefined;
  }
  const token = req.session.rtt;
  if (token == null) {
    req.session.rtt = RoboTroll.createToken(
      process.env.RTT_SECRETKEY,
      initPayload
    );
    req.session.maxAge = +new Date();
  } else {
    const payload = RoboTroll.getPayload(token, process.env.RTT_SECRETKEY);
    if (typeof payload == "undefined") {
      res.sendStatus(500);
    } else if (payload.time_series.length === maximum_behavior) {
      if (!RoboTroll.predictRobot(payload.time_series, model.model)) {
        let new_payload = RoboTroll.setPayload(payload, 10);
        req.session.rtt = RoboTroll.createToken(
          process.env.RTT_SECRETKEY,
          new_payload
        );
        req.session.maxAge = +new Date();
      } else {
        res.sendStatus(500);
      }
    } else {
      let new_payload = RoboTroll.setPayload(payload, 10);
      req.session.rtt = RoboTroll.createToken(
        process.env.RTT_SECRETKEY,
        new_payload
      );
      req.session.maxAge = +new Date();
    }
  }
  next();
};
