import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.header("xAccessToken");
  if (token !== process.env.X_ACCESS_TOKEN)
    res.status(401).json({ msg: "Unauthorized." });

  next();
}
