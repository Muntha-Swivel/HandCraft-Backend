"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
// export function signJwt(
//   object: Object,
//   keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
//   options?: jwt.SignOptions | undefined
// ) {
//   const signingKey = Buffer.from(
//     config.get<string>(keyName),
//     "base64"
//   ).toString("ascii");
//   return jwt.sign(object, signingKey, {
//     ...(options && options),
//     algorithm: "RS256",
//   });
// }
// jwt.sign(
//   { foo: "bar" },
//   privateKey,
//   { algorithm: "RS256" },
//   function (err, token) {
//     console.log(token);
//   }
// );
const privateKey = config_1.default.get("privateKey");
const publickey = config_1.default.get("publicKey");
const signJwt = (object, options) => {
    return jsonwebtoken_1.default.sign(object, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publickey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
};
exports.verifyJwt = verifyJwt;
// export function verifyJwt(
//   token: string,
//   keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
// ) {
//   const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
//     "ascii"
//   );
//   try {
//     const decoded = jwt.verify(token, publicKey);
//     return {
//       valid: true,
//       expired: false,
//       decoded,
//     };
//   } catch (e: any) {
//     console.error(e);
//     return {
//       valid: false,
//       expired: e.message === "jwt expired",
//       decoded: null,
//     };
//   }
// }
