const RoboTroll = require("./dist/index");

const secret_key = "thisissecret";

test('create new token and verify it', () => {
    const token = RoboTroll.createToken(secret_key);
    const payload = RoboTroll.getPayload(token, secret_key);
    expect(payload).not.toBeUndefined();
});

test('set new token from existing token (add behavior)', () => {
    const token = RoboTroll.createToken(secret_key);
    const payload = RoboTroll.getPayload(token, secret_key);
    const new_payload = RoboTroll.setPayload(payload, 3);
    expect(new_payload).toEqual({time_series: [0,1]});
});

test('set new token from existing token (add behavior) to max', () => {
    const token = RoboTroll.createToken(secret_key);
    const payload = RoboTroll.getPayload(token, secret_key);
    let new_payload;
    let i = 1
    while (i <= 11) {
        new_payload = RoboTroll.setPayload(payload, 10);
        i = i + 1;
    }
    console.log(new_payload);
    expect(new_payload).toEqual({time_series: [2,3,4,5,6,7,8,9,10,11]});
});

test('test prediction', () => {
    return RoboTroll.predictRobot([1,2,4], [3, 4]).then((result) => {
        console.log(result)
        expect(result).toBe(0.999983298578152)
      })
});