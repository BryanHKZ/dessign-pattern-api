import { AuthenticationStrategy } from "../../../interfaces";
import LoginController from "../LoginController";

export default class OAuthAuthentication
  extends LoginController
  implements AuthenticationStrategy
{
  authenticate(email: string, password: string): boolean {
    this.login(email, password);
    return true;
  }

  validateAuthentication(email: string, password: string): boolean {
    console.log("Validando inicio de sesión con método OAuth");
    return true;
  }

  saveToHistory(email: string): void {
    console.log(
      `Inicio de sesión con método OAuth exitoso para el usuario: ${email}`
    );
  }

  createToken(email: string): string {
    console.log(`Token generado con método OAuth para el usuario: ${email}`);
    return "token";
  }
}
