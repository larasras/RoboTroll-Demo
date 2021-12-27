"use strict";
var createHmac = require("create-hmac");
var IsVerified;
(function (IsVerified) {
  IsVerified["Verified"] = "VERIFIED";
  IsVerified["NotVerified"] = "NOT_VERIFIED";
})(IsVerified || (IsVerified = {}));
var header = {
  alg: "HS256",
  typ: "RTT",
};
var createToken = function (secret_key, init_payload) {
  var header_base64 = Buffer.from(JSON.stringify(header), "utf8").toString(
    "base64"
  );
  var payload_base64;
  if (typeof init_payload == "undefined") {
    var payload = {
      time_series: [+new Date()],
    }; // for release
    // const payload: Payload = {
    //   time_series: [0],
    // }; // for unit testing
    payload_base64 = Buffer.from(JSON.stringify(payload), "utf8").toString(
      "base64"
    );
  } else {
    payload_base64 = Buffer.from(JSON.stringify(init_payload), "utf8").toString(
      "base64"
    );
  }
  var hmac = createHmac("sha256", secret_key);
  hmac.update(header_base64 + "." + payload_base64);
  var signature_base64 = Buffer.from(hmac.digest(), "utf8").toString("base64");
  return header_base64 + "." + payload_base64 + "." + signature_base64;
};
var verifyToken = function (token, secret_key) {
  var header_base64 = Buffer.from(JSON.stringify(header), "utf8").toString(
    "base64"
  );
  var payload_base64 = token.split(".")[1];
  var hmac = createHmac("sha256", secret_key);
  hmac.update(header_base64 + "." + payload_base64);
  var signature_base64 = Buffer.from(hmac.digest(), "utf8").toString("base64");
  console.log(
    token,
    header_base64 + "." + payload_base64 + "." + signature_base64
  );
  if (token !== header_base64 + "." + payload_base64 + "." + signature_base64) {
    return IsVerified.NotVerified;
  }
  return IsVerified.Verified;
};
var setPayload = function (payload, max_behavior) {
  if (payload.time_series.length >= max_behavior) {
    var time_series = payload.time_series.slice(1);
    payload.time_series = time_series;
  }
  payload.time_series.push(+new Date()); // for release
  // payload.time_series.push(
  //   payload.time_series[payload.time_series.length - 1] + 1
  // ); // for unit testing
  return payload;
};
var getPayload = function (token, secret_key) {
  var is_verified = verifyToken(token, secret_key);
  console.log(is_verified);
  if (is_verified === IsVerified.Verified) {
    var payload_base64 = token.split(".")[1];
    var payload = JSON.parse(
      Buffer.from(payload_base64, "base64").toString("utf8")
    );
    return payload;
  }
  return undefined;
};
var sigmoid = function (z) {
  return 1 / (Math.pow(Math.E, z * -1.0) + 1.0);
};
var predictRobot = function (x, theta) {
  var new_x = x.reduce(function (prevVal, currVal, currIndex, array) {
    if (currIndex != 0) {
      prevVal.push(currVal - array[currIndex - 1]);
    }
    return prevVal;
  }, []);
  new_x.unshift(1);
  return new Promise(function (resolve, reject) {
    if (new_x.length !== theta.length) {
      throw new RangeError("Invalid array length");
    }
    var len = new_x.length;
    var out = 0;
    function help(i) {
      if (i === len) {
        resolve(sigmoid(out));
        return;
      }
      out = out + new_x[i] * theta[i];
      setImmediate(help.bind(null, i + 1));
    }
    help(0);
  });
};
module.exports = {
  createToken: createToken,
  setPayload: setPayload,
  getPayload: getPayload,
  predictRobot: predictRobot,
};
