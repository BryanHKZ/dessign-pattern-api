import DBConnection from "../database/DBConnection";
import { IProjectCategory } from "../interfaces";
import ProjectCategoryModel from "../models/ProjectCategoryModel";
import ProjectMapper from "./ProjectMapper";

export default class ProjectCategoryMapper extends DBConnection {
  public static dbName = "projectcategory";
  public static fields = ["id", "name", "idProject"];

  constructor() {
    super();
  }

  async createCategory(projectCategory: IProjectCategory) {
    try {
      const existProject = await new ProjectMapper().findProjectById(
        parseInt(projectCategory.idProject)
      );

      if (!existProject) return null;

      const newProjectCategory = new ProjectCategoryModel(projectCategory);

      await this.save(newProjectCategory);

      return newProjectCategory;
    } catch (error) {
      console.error(error);
    }
  }

  async updateCategory(
    projectId: string,
    categoryId: string,
    projectCategory: IProjectCategory
  ) {
    try {
      const existingProjectCategory = await this.findCategoryInProject(
        projectId,
        categoryId
      );

      if (!existingProjectCategory) return null;

      if (projectCategory.name)
        existingProjectCategory.setName(projectCategory.name);
      if (projectCategory.idProject)
        existingProjectCategory.setIdProject(projectCategory.idProject);

      await this.update(existingProjectCategory);

      return existingProjectCategory;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCategory(idProject: string, idCategory: string) {
    try {
      const existingProjectCategory = await this.findCategoryInProject(
        idProject,
        idCategory
      );

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
        [id]
      );
      if (!projectCategory.length) return null;

      return new ProjectCategoryModel(projectCategory[0]);
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findAllCategories(): Promise<ProjectCategoryModel[]> {
    try {
      const projectCategories = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(
          ProjectCategoryMapper.fields
        )} FROM ${ProjectCategoryMapper.dbName}`,
        []
      );
      return projectCategories.map(
        (projectCategory: IProjectCategory) =>
          new ProjectCategoryModel(projectCategory)
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findAllCategoriesByProjectId(
    idProject: string
  ): Promise<ProjectCategoryModel[]> {
    try {
      const projectCategories = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(
          ProjectCategoryMapper.fields
        )} FROM ${ProjectCategoryMapper.dbName} WHERE idProject = ?`,
        [idProject.toString()]
      );
      return projectCategories.map(
        (projectCategory: IProjectCategory) =>
          new ProjectCategoryModel(projectCategory)
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findCategoryInProject(
    idProject: string,
    id: string
  ): Promise<ProjectCategoryModel | null> {
    try {
      const projectCategory = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(
          ProjectCategoryMapper.fields
        )} FROM ${ProjectCategoryMapper.dbName} WHERE idProject = ? AND id = ?`,
        [idProject.toString(), id]
      );
      if (!projectCategory.length) return null;

      return new ProjectCategoryModel(projectCategory[0]);
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
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

    this.disconnect();
    return insertId;
  }

  async update(projectCategory: ProjectCategoryModel) {
    const query = `UPDATE ${ProjectCategoryMapper.dbName} SET name = ?, idProject = ? WHERE id = ?`;

    await this.executeQuery(query, [
      projectCategory.getName(),
      projectCategory.getIdProject(),
      projectCategory.getId().toString(),
    ]);

    this.disconnect();
  }

  async delete(projectCategory: ProjectCategoryModel) {
    const query = `DELETE FROM ${ProjectCategoryMapper.dbName} WHERE id = ?`;

    await this.executeQuery(query, [projectCategory.getId().toString()]);

    this.disconnect();
  }
}
