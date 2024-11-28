import jwt from "jsonwebtoken";
const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as any;
};

const jwtHelpers = {
  generateToken,
  verifyToken,
};

export default jwtHelpers;
