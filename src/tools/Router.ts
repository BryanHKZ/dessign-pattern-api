import express, { Request, Response, Router } from "express";
import auth from "../application/decorators/auth";

class RouterHandler {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public get(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.router.get(path, auth, handler);
  }

  public post(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.router.post(path, auth, handler);
  }

  public put(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.router.put(path, auth, handler);
  }

  public delete(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.router.delete(path, auth, handler);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default RouterHandler;
