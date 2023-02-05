import jwt from "jsonwebtoken";
import config from "config";

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

const privateKey = config.get<string>("privateKey");
const publickey = config.get<string>("publicKey");

const signJwt = (object: object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publickey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};

export { signJwt, verifyJwt };

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
