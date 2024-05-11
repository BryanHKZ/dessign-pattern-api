import CategoryController from "../../application/controllers/projectCategory/CategoryController";
import RouterHandler from "../../tools/Router";

const api = new RouterHandler();

const categoryController = new CategoryController();

api.get(
  "/v1/categories/:projectId",
  categoryController.getCategoriesByProjectId
);
api.post("/v1/categories", categoryController.createCategory);
api.put("/v1/categories/:projectId/:id", categoryController.updateCategory);
api.delete("/v1/categories/:projectId/:id", categoryController.deleteCategory);

export default api.getRouter();
