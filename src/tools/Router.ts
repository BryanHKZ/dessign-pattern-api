import express, { NextFunction, Request, Response, Router } from "express";
import auth from "../middleware/auth";

class RouterHandler {
  private router: Router;

  constructor() {
    if (!this.router) {
      this.router = express.Router();
      return this;
    }
    this.router = this.getRouter();
  }

  public get(
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    this.router.get(path, auth, handler);
  }

  public post(
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    this.router.post(path, auth, handler);
  }

  public put(
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    this.router.put(path, auth, handler);
  }

  public delete(
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    this.router.delete(path, auth, handler);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default RouterHandler;
