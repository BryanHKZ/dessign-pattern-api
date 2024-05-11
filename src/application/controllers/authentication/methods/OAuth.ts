import { signJwt } from "../../../../utils/index";
import { AuthenticationStrategy } from "../../../interfaces";
import UserModel from "../../../models/User";
import LoginController from "../LoginController";

export default class OAuthAuthentication
  extends LoginController
  implements AuthenticationStrategy
{
  private token: string;
  constructor(token: string) {
    console.log("🚀 ~ constructor ~ token:", token);
    super();
    this.token = token;
  }
  authenticate = async (email: string, password: string): Promise<string> => {
    if (process.env.AUTH_TOKEN !== this.token) {
      throw new Error("Token OAuth inválido");
    }

    const token = await this.login(email, password);
    return token;
  };

  saveToHistory(email: string): void {
    console.log(
      `Inicio de sesión con método OAuth exitoso para el usuario: ${email}`
    );
  }

  createToken(user: UserModel): string {
    return signJwt({ ...user.toApi(), method: "OAuth" });
  }
}
