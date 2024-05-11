import UserMapper from "../../mappers/UserMapper";
import UserModel from "../../models/User";
abstract class LoginController {
  abstract saveToHistory(email: string): void;
  abstract createToken(user: UserModel): string;

  async login(email: string, password: string): Promise<string> {
    try {
      const isAuthenticated = await this.checkIfCredentialsAreValid(
        email,
        password
      );

      if (!isAuthenticated) {
        throw new Error("Credenciales inválidas");
      }

      this.saveToHistory(email);

      const token = this.createToken(isAuthenticated);

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async checkIfCredentialsAreValid(
    email: string,
    password: string
  ): Promise<UserModel | null> {
    const userMapper = new UserMapper();
    const existUser = await userMapper.findUserByEmail(email);
    if (!existUser) {
      return null;
    }

    if (existUser.getPassword() !== password) {
      return null;
    }

    return existUser;
  }
}

export default LoginController;
