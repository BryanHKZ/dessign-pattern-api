import { Request, Response } from "express";
import AuthMapper from "../../mappers/AuthMapper";
import LoginAuthentication from "./methods/Auth";
import OAuthAuthentication from "./methods/OAuth";

export default class AuthController {
  constructor() {}

  loginByOAuth = (req: Request, res: Response) => {
    try {
      // const { email, password } = req.body;
      const mapper = new AuthMapper(new OAuthAuthentication());

      const responseToken = mapper.login("aaaa@gmail.com", "12345");

      res.status(200).json({ token: responseToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  loginByEmailAndPassword = (req: Request, res: Response) => {
    try {
      // const { email, password } = req.body;
      const mapper = new AuthMapper(new LoginAuthentication());

      const responseToken = mapper.login("aaaa@gmail.com", "12345");

      res.status(200).json({ token: responseToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
