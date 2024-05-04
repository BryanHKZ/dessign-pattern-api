import express, { NextFunction, Request, Response, Router } from "express";

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
    this.router.get(path, handler);
  }

  public post(
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    this.router.post(path, handler);
  }

  public put(
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    this.router.put(path, handler);
  }

  public delete(
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
  ): void {
    this.router.delete(path, handler);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default RouterHandler;
