import express from "express";
import AuthController from "../../application/controllers/authentication/AuthController";

const api = express.Router();

const authController = new AuthController();

api.post("/v1/login/oauth", authController.loginByOAuth);
api.post("/v1/login", authController.loginByEmailAndPassword);

export default api;
