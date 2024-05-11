import DBConnection from "../database/DBConnection";
import { AuthenticationStrategy } from "../interfaces";

export default class AuthMapper extends DBConnection {
  private authenticationStrategy: AuthenticationStrategy;

  constructor(strategy: AuthenticationStrategy) {
    super();
    this.authenticationStrategy = strategy;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const token = await this.authenticationStrategy.authenticate(
        email,
        password
      );

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
