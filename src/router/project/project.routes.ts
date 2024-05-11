import ProjectController from "../../application/controllers/project/ProjectController";
import RouterHandler from "../../tools/Router";

const api = new RouterHandler();

const projectController = new ProjectController();

api.get("/v1/projects", projectController.getProjects);
api.get("/v1/projects/:id", projectController.getProjectById);
api.post("/v1/projects", projectController.createProject);
api.put("/v1/projects/:id", projectController.updateProject);
api.delete("/v1/projects/:id", projectController.deleteProject);

export default api.getRouter();
