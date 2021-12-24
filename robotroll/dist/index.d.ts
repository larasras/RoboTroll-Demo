declare const createHmac: any;
declare enum IsVerified {
    Verified = "VERIFIED",
    NotVerified = "NOT_VERIFIED"
}
declare const header: {
    alg: string;
    typ: string;
};
declare type Payload = {
    time_series: number[];
};
declare const createToken: (secret_key: string, init_payload?: Payload | undefined) => string;
declare const verifyToken: (token: string, secret_key: string) => IsVerified;
declare const setPayload: (payload: Payload, max_behavior: number) => Payload;
declare const getPayload: (token: string, secret_key: string) => Payload | undefined;
declare const sigmoid: (z: number) => number;
declare const predictRobot: (x: number[], theta: number[]) => Promise<number>;
