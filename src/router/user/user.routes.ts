import UserController from "../../application/controllers/user/UserController";
import RouterHandler from "../../tools/Router";

const api = new RouterHandler();

const userController = new UserController();

api.get("/v1/users", userController.getAllUsers);
api.get("/v1/users/:id", userController.getUserById);
api.post("/v1/users", userController.createUser);
api.put("/v1/users/:id", userController.updateUser);
api.delete("/v1/users/:id", userController.deleteUser);

export default api.getRouter();
