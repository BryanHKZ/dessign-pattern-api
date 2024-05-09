import { Request, Response } from "express";

const isApiHealthy = (req: Request, res: Response) => {
  res.status(200).send("Healthy.");
};

export default {
  isApiHealthy,
};
