import { Router } from "express";
import UserController from "../../controllers/user/UserController";
import auth from "../../middleware/auth";

const usersRouter = Router();

const userController = new UserController();

usersRouter.get("/users", auth, userController.getAllUsers);

export default usersRouter;
