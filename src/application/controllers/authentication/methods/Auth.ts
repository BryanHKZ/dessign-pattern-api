import { signJwt } from "../../../../utils/index";
import { AuthenticationStrategy } from "../../../interfaces";
import UserModel from "../../../models/User";
import LoginController from "../LoginController";

export default class LoginAuthentication
  extends LoginController
  implements AuthenticationStrategy
{
  async authenticate(email: string, password: string): Promise<string> {
    const token = await this.login(email, password);
    return token;
  }

  saveToHistory(email: string): void {
    console.log(
      `Inicio de sesión con método Auth Simple exitoso para el usuario: ${email}`
    );
  }

  createToken(user: UserModel): string {
    return signJwt(user.toApi());
  }
}
