import UserController from "../../controllers/user/UserController";
import RouterHandler from "../../tools/Router";

const api = new RouterHandler();

const userController = new UserController();

api.get("/v1/users", userController.getAllUsers);

export default api.getRouter();
