import express from "express";
import UserController from "../../application/controllers/user/UserController";
import auth from "../../application/decorators/auth";

const api = express.Router();

const userController = new UserController();

api.get("/v1/users", userController.getAllUsers);
api.get("/v1/users/:id", userController.getUserById);
api.post("/v1/users", auth, userController.createUser);

export default api;
