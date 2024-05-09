import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  // Check if JWT is valid

  // if (token !== process.env.AUTH_TOKEN)
  //   res.status(401).json({ message: "Unauthorized." });

  next();
}
