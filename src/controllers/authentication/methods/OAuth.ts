import { AuthenticationStrategy } from "../../../interfaces";

export default class OAuthAuthentication implements AuthenticationStrategy {
    authenticate(username: string, password: string): boolean {
        // Your OAuth authentication logic here
        return true; // Placeholder for actual logic
    }
}