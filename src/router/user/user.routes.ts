import { Router } from "express";
import UserController from "../../controllers/UserController";
import auth from "../../middleware/auth";

const usersRouter = Router();

const userController = new UserController();

usersRouter.get("/users", auth, userController.getAllUsers);

export default usersRouter;
