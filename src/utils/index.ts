import jwt from "jsonwebtoken";
export const initEnvironmentVariables = () => {
  require("dotenv").config();
};

export const signJwt = (data: any) => {
  return jwt.sign(data, process.env.SECRET_API_KEY, {
    expiresIn: parseInt(process.env.TOKEN_API_EXPIRATION || "3600") * 1000,
  });
};
