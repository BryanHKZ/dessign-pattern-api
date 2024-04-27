import { Request } from "express";
import AuthMapper from "./AuthMapper";
import LoginAuthentication from "./methods/Auth";
import OAuthAuthentication from "./methods/OAuth";

export default class AuthController {
    constructor() {
    }

    loginByOAuth(req: Request) {
        const { email, password } = req.body
        const mapper = new AuthMapper(new OAuthAuthentication())

        mapper.login(email, password)
    }

    loginByEmailAndPassword(req: Request) {
        const { email, password } = req.body
        const mapper = new AuthMapper(new LoginAuthentication())

        mapper.login(email, password)
    }
}