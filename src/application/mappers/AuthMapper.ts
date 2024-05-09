import { AuthenticationStrategy } from "../interfaces";
import DBConnection from "./IntegrationMapper";
import UserMapper from "./UserMapper";

export default class AuthMapper extends DBConnection {
  private authenticationStrategy: AuthenticationStrategy;
  private dbName = "user";

  constructor(strategy: AuthenticationStrategy) {
    super();
    this.authenticationStrategy = strategy;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.executeQuery(
        `SELECT ${this.formatFields(UserMapper.fields)} FROM ${
          this.dbName
        } WHERE email = ${email}`
      );
      if (!user) throw new Error("Usuario no encontrado");

      return "";
    } catch (error) {
      throw new Error("Ha ocurrido un error desconocido");
    }
  }
}
