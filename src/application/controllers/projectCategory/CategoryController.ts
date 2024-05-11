import { Request, Response } from "express";
import ProjectCategoryMapper from "../../mappers/ProjectCategoryMapper";
export default class CategoryController {
  private categoryMapper: ProjectCategoryMapper;
  constructor() {
    this.categoryMapper = new ProjectCategoryMapper();
  }

  createCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryMapper.createCategory(req.body);

      if (!category)
        return res.status(404).json({ error: "Proyecto no encontrado" });
      res.status(204).json(await category.toApi());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };

  getCategoriesByProjectId = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryMapper.findAllCategoriesByProjectId(
        req.params.projectId
      );

      let result = [];

      for await (const category of categories) {
        result.push(await category.toApi(true));
      }
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryMapper.updateCategory(
        req.params.projectId,
        req.params.id,
        req.body
      );

      if (!category)
        return res.status(404).json({ error: "Categoría no encontrada" });
      res.status(200).send(await category.toApi());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const a = await this.categoryMapper.deleteCategory(
        req.params.projectId,
        req.params.id
      );

      if (!a) return res.status(404).json({ error: "Categoría no encontrada" });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };
}
