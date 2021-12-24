const createHmac = require("create-hmac");

enum IsVerified {
  Verified = "VERIFIED",
  NotVerified = "NOT_VERIFIED",
}

const header: {
  alg: string;
  typ: string;
} = {
  alg: "HS256",
  typ: "RTT",
};

type Payload = {
  time_series: number[];
};

const createToken = (secret_key: string, init_payload?: Payload): string => {
  const header_base64: string = Buffer.from(
    JSON.stringify(header),
    "utf8"
  ).toString("base64");
  let payload_base64: string;
  if (typeof init_payload == "undefined") {
    const payload: Payload = {
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
  const hmac = createHmac("sha256", secret_key);
  hmac.update(header_base64 + "." + payload_base64);
  const signature_base64: string = Buffer.from(hmac.digest(), "utf8").toString(
    "base64"
  );
  return header_base64 + "." + payload_base64 + "." + signature_base64;
};

const verifyToken = (token: string, secret_key: string): IsVerified => {
  const header_base64: string = Buffer.from(
    JSON.stringify(header),
    "utf8"
  ).toString("base64");
  const payload_base64: string = token.split(".")[1];
  const hmac = createHmac("sha256", secret_key);
  hmac.update(header_base64 + "." + payload_base64);
  const signature_base64: string = Buffer.from(hmac.digest(), "utf8").toString(
    "base64"
  );
  console.log(
    token,
    header_base64 + "." + payload_base64 + "." + signature_base64
  );
  if (token !== header_base64 + "." + payload_base64 + "." + signature_base64) {
    return IsVerified.NotVerified;
  }
  return IsVerified.Verified;
};

const setPayload = (payload: Payload, max_behavior: number): Payload => {
  if (payload.time_series.length >= max_behavior) {
    const time_series = payload.time_series.slice(1);
    payload.time_series = time_series;
  }
  payload.time_series.push(+new Date()); // for release
  // payload.time_series.push(
  //   payload.time_series[payload.time_series.length - 1] + 1
  // ); // for unit testing
  return payload;
};

const getPayload = (token: string, secret_key: string): Payload | undefined => {
  const is_verified: IsVerified = verifyToken(token, secret_key);
  console.log(is_verified);
  if (is_verified === IsVerified.Verified) {
    const payload_base64: string = token.split(".")[1];
    const payload: Payload = JSON.parse(
      Buffer.from(payload_base64, "base64").toString("utf8")
    );
    return payload;
  }
  return undefined;
};

const sigmoid = (z: number): number => {
  return 1 / (Math.pow(Math.E, z * -1.0) + 1.0);
};

const predictRobot = (x: number[], theta: number[]): Promise<number> => {
  var new_x: number[] = x.reduce((prevVal: number[], currVal: number, currIndex: number, array: number[]) => {
    if (currIndex != 0){
      prevVal.push(currVal - array[currIndex -1])
    }
    return prevVal
  }, []);
  return new Promise((resolve, reject) => {
    if (new_x.length !== theta.length) {
      throw new RangeError("Invalid array length");
    }
    var len: number = new_x.length;
    var out: number = 0;
    function help(i: number) {
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

module.exports = { createToken, setPayload, getPayload, predictRobot };
