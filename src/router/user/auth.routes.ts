import AuthController from "../../application/controllers/authentication/AuthController";
import RouterHandler from "../../tools/Router";

const api = new RouterHandler();

const authController = new AuthController();

api.post("/v1/login/oauth", authController.loginByOAuth);
api.post("/v1/login", authController.loginByEmailAndPassword);

export default api.getRouter();
