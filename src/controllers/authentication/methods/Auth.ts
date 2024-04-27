import { AuthenticationStrategy } from "../../../interfaces";

export default class LoginAuthentication implements AuthenticationStrategy {
    authenticate(email: string, password: string): boolean {
        console.log("login by email and password")
        return true;
    }
}