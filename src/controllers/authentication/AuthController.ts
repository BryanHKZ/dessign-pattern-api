import { Request, Response } from "express";
import AuthMapper from "./AuthMapper";
import LoginAuthentication from "./methods/Auth";
import OAuthAuthentication from "./methods/OAuth";

export default class AuthController {
  constructor() {}

  loginByOAuth = (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const mapper = new AuthMapper(new OAuthAuthentication());

      mapper.login(email, password);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  loginByEmailAndPassword = (req: Request, res: Response) => {
    try {
      console.log("🚀 ~ AuthController ~ loginByOAuth ~ req:", req);

      const { email, password } = req.body;
      const mapper = new AuthMapper(new LoginAuthentication());

      mapper.login(email, password);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
