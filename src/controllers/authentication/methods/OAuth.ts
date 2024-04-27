import { AuthenticationStrategy } from "../../../interfaces";

export default class OAuthAuthentication implements AuthenticationStrategy {
    authenticate(email: string, password: string): boolean {
        console.log("login by oauth")
        return true; // Placeholder for actual logic
    }
}