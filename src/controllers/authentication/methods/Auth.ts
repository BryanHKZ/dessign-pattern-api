import { AuthenticationStrategy } from "../../../interfaces";

export default class UsernameAndPasswordAuthentication implements AuthenticationStrategy {
    authenticate(username: string, password: string): boolean {
        
        return true;
    }
}