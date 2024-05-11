import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export default function (req: any, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ mensaje: "Token no proporcionado" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.SECRET_API_KEY,
    (err: jwt.VerifyErrors, decoded: any) => {
      if (err) {
        return res.status(401).json({ mensaje: "Token inválido" });
      }

      req.user = decoded;
      next();
    }
  );
}
