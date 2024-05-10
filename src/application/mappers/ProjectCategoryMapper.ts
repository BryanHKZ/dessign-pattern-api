import DBConnection from "../database/DBConnection";
import { IProjectCategory } from "../interfaces";
import ProjectCategoryModel from "../models/ProjectCategoryModel";

export default class ProjectCategoryMapper extends DBConnection {
  public static dbName = "projectcategory";
  public static fields = ["id", "name", "idProject"];

  constructor() {
    super();
  }

  async createCategory(projectCategory: IProjectCategory) {
    try {
      const newProjectCategory = new ProjectCategoryModel(projectCategory);

      await this.save(newProjectCategory);

      return newProjectCategory;
    } catch (error) {
      console.error(error);
    }
  }

  async updateCategory(projectCategory: IProjectCategory) {
    try {
      const existingProjectCategory = await this.findCategoryById(
        projectCategory.id
      );

      if (!existingProjectCategory) return null;

      if (projectCategory.name)
        existingProjectCategory.setName(projectCategory.name);
      if (projectCategory.project_id)
        existingProjectCategory.setIdProject(projectCategory.project_id);

      await this.update(existingProjectCategory);

      return existingProjectCategory;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCategory(id: number) {
    try {
      const existingProjectCategory = await this.findCategoryById(id);

      if (!existingProjectCategory) return null;

      const tasks = await existingProjectCategory.getTasks();

      if (tasks.length) throw new Error("Category has tasks");

      await this.delete(existingProjectCategory);

      return existingProjectCategory;
    } catch (error) {
      console.error(error);
    }
  }

  async findCategoryById(id: number): Promise<ProjectCategoryModel | null> {
    try {
      const projectCategory = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(
          ProjectCategoryMapper.fields
        )} FROM ${ProjectCategoryMapper.dbName} WHERE id = ?`,
        [id.toString()]
      );
      if (!projectCategory.length) return null;

      return new ProjectCategoryModel(projectCategory[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async findAllCategories(): Promise<ProjectCategoryModel[]> {
    const projectCategories = await this.executeQuery(
      `SELECT ${DBConnection.formatFields(ProjectCategoryMapper.fields)} FROM ${
        ProjectCategoryMapper.dbName
      }`,
      []
    );
    return projectCategories.map(
      (projectCategory: IProjectCategory) =>
        new ProjectCategoryModel(projectCategory)
    );
  }

  async findAllCategoriesByProjectId(
    idProject: number
  ): Promise<ProjectCategoryModel[]> {
    const projectCategories = await this.executeQuery(
      `SELECT ${DBConnection.formatFields(ProjectCategoryMapper.fields)} FROM ${
        ProjectCategoryMapper.dbName
      } WHERE idProject = ?`,
      [idProject.toString()]
    );
    return projectCategories.map(
      (projectCategory: IProjectCategory) =>
        new ProjectCategoryModel(projectCategory)
    );
  }

  async save(projectCategory: ProjectCategoryModel) {
    const query = `INSERT INTO ${
      ProjectCategoryMapper.dbName
    } (${DBConnection.formatFields(
      ProjectCategoryMapper.fields,
      true
    )}) VALUES (?, ?)`;

    const { insertId } = await this.executeQuery(query, [
      projectCategory.getName(),
      projectCategory.getIdProject(),
    ]);
    return insertId;
  }

  async update(projectCategory: ProjectCategoryModel) {
    const query = `UPDATE ${ProjectCategoryMapper.dbName} SET name = ?, idProject = ? WHERE id = ?`;

    await this.executeQuery(query, [
      projectCategory.getName(),
      projectCategory.getIdProject(),
      projectCategory.getId().toString(),
    ]);
  }

  async delete(projectCategory: ProjectCategoryModel) {
    const query = `DELETE FROM ${ProjectCategoryMapper.dbName} WHERE id = ?`;

    await this.executeQuery(query, [projectCategory.getId().toString()]);
  }
}
