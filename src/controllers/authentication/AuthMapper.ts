import { AuthenticationStrategy } from "../../interfaces";
import DBConnection from "../../tools/DBConnection";
import LoginAuthentication from "./methods/Auth";

export default class AuthMapper extends DBConnection {
    private authenticationStrategy: AuthenticationStrategy;

    constructor(strategy: AuthenticationStrategy) {
        super()
        this.authenticationStrategy = strategy;
    }

    login(email: string, password: string): boolean {
        return this.authenticationStrategy.authenticate(email, password);
    }
}