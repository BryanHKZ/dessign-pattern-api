import { Router } from "express";
import AuthController from "../../controllers/authentication/AuthController";
const authRoutes = Router();

const authController = new AuthController();

authRoutes.get("/login/oauth", authController.loginByOAuth);
authRoutes.post("/login", authController.loginByEmailAndPassword)


export default authRoutes;
