import TaskController from "../../application/controllers/task/TaskController";
import RouterHandler from "../../tools/Router";

const api = new RouterHandler();

const taskController = new TaskController();

api.get("/v1/tasks", taskController.getTasks);
api.get("/v1/tasks/:id", taskController.getTaskById);
api.post("/v1/tasks", taskController.createTask);
api.put("/v1/tasks/:id", taskController.updateTask);
api.delete("/v1/tasks/:id", taskController.deleteTask);

export default api.getRouter();
