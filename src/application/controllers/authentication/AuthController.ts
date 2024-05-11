import { Request, Response } from "express";
import AuthMapper from "../../mappers/AuthMapper";
import LoginAuthentication from "./methods/Auth";
import OAuthAuthentication from "./methods/OAuth";

export default class AuthController {
  constructor() {}

  loginByOAuth = async (req: Request, res: Response) => {
    try {
      const { email, password, authToken } = req.body;
      const mapper = new AuthMapper(new OAuthAuthentication(authToken));

      const responseToken = await mapper.login(email, password);

      if (!responseToken) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      res.status(200).json({ token: responseToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  loginByEmailAndPassword = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const mapper = new AuthMapper(new LoginAuthentication());

      const responseToken = await mapper.login(email, password);

      if (!responseToken) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      res.status(200).json({ token: responseToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
