import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = process.env.EXPIRED_TIME;

  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(payload, secretKey, { expiresIn });
};

export const refreshToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = process.env.EXPIRED_TIME;

  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
};
