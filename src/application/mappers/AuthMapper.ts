import DBConnection from "../database/DBConnection";
import { AuthenticationStrategy } from "../interfaces";
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
      const userMapper = new UserMapper();
      const user = await userMapper.findUserByEmail(email);

      if (!user) throw new Error("Usuario no encontrado");

      return "";
    } catch (error) {
      throw new Error("Ha ocurrido un error desconocido");
    }
  }
}
