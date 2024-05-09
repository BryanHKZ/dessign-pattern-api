abstract class LoginController {
  abstract validateAuthentication(email: string, password: string): boolean;
  abstract saveToHistory(email: string): void;
  abstract createToken(email: string): string;

  login(email: string, password: string): string {
    try {
      const isAuthenticated = this.validateAuthentication(email, password);

      if (!isAuthenticated) {
        throw new Error("Credenciales inválidas");
      }

      this.saveToHistory(email);

      const token = this.createToken(email);

      return token;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      throw new Error("Error en el inicio de sesión");
    }
  }
}

export default LoginController;
