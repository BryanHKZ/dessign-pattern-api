import DBConnection from "../database/DBConnection";
import { IProject, IProjectCategory } from "../interfaces";
import ProjectModel from "../models/Project";
import ProjectCategoryModel from "../models/ProjectCategoryModel";
import Model_Utils from "../models/Utils";

export default class ProjectMapper extends DBConnection {
  public static dbName = "project";
  public static fields = [
    "id",
    "name",
    "toDate",
    "status",
    "createdBy",
    "assignedTo",
    "metadata",
  ];

  constructor() {
    super();
  }

  async createProject(project: IProject): Promise<ProjectModel | null> {
    try {
      if (project.toDate) project.toDate = new Date(project.toDate);
      const newProject = new ProjectModel(project);

      newProject.setMetadataField(
        "createdAt",
        Model_Utils.formatDate(new Date())
      );

      await this.save(newProject);

      return newProject;
    } catch (error) {
      console.error(error);
      throw new Error("Ha ocurrido un error creando el proyecto");
    }
  }

  async updateProject(
    id: string,
    project: IProject
  ): Promise<ProjectModel | null> {
    try {
      const existingProject = await this.findProjectById(parseInt(id));

      if (!existingProject) return null;

      if (project.name) existingProject.setName(project.name);
      if (project.toDate) existingProject.setDate(project.toDate);
      if (project.status) existingProject.setStatus(project.status);
      if (project.createdBy) existingProject.setCreator(project.createdBy);
      if (project.assignedTo) existingProject.setAssignedTo(project.assignedTo);

      existingProject.setMetadataField(
        "updatedAt",
        Model_Utils.formatDate(new Date())
      );

      await this.update(existingProject);

      return existingProject;
    } catch (error) {
      console.error(error);
      throw new Error("Ha ocurrido un error actualizando el proyecto");
    }
  }

  async deleteProject(id: string): Promise<boolean | null> {
    try {
      const existingProject = await this.findProjectById(parseInt(id));

      if (!existingProject) return null;

      await this.delete(parseInt(id));

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Ha ocurrido un error eliminando el proyecto");
    }
  }

  async findProjectById(id: number): Promise<ProjectModel | null> {
    try {
      const project = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(ProjectMapper.fields)} FROM ${
          ProjectMapper.dbName
        } WHERE id = ?`,
        [id]
      );
      if (!project.length) return null;

      return new ProjectModel(project[0]);
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findAllProjects(): Promise<ProjectModel[]> {
    try {
      const projects = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(ProjectMapper.fields)} FROM ${
          ProjectMapper.dbName
        } WHERE status = ?`,
        ["active"]
      );
      return projects.map((project: IProject) => new ProjectModel(project));
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findCategoriesByProjectId(
    idProject: number
  ): Promise<ProjectCategoryModel[]> {
    try {
      const categories = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(ProjectMapper.fields)} FROM ${
          ProjectMapper.dbName
        } WHERE id = ?`,
        [idProject.toString()]
      );
      if (!categories.length) return [];

      return categories.map(
        (project: IProjectCategory) => new ProjectCategoryModel(project)
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async save(project: ProjectModel) {
    const query = `INSERT INTO ${
      ProjectMapper.dbName
    } (${DBConnection.formatFields(
      ProjectMapper.fields,
      true
    )}) VALUES (?, ?, ?, ?, ?, ?)`;

    const { insertId } = await this.executeQuery(query, [
      project.getName(),
      project.getDate(),
      project.getStatus(),
      project.getCreatorId(),
      project.getAssignedToId(),
      JSON.stringify(project.getMetadata()),
    ]);

    project.setId(insertId);

    this.disconnect();
  }

  async update(project: ProjectModel) {
    const query = `UPDATE ${ProjectMapper.dbName} SET ${DBConnection.mapFields(
      ProjectMapper.fields,
      true
    )} WHERE id = ?`;

    await this.executeQuery(query, [
      project.getName(),
      project.getDate(),
      project.getStatus(),
      project.getCreatorId(),
      project.getAssignedToId(),
      JSON.stringify(project.getMetadata()),
      project.getId(),
    ]);

    this.disconnect();
  }

  async delete(id: number) {
    const query = `DELETE FROM ${ProjectMapper.dbName} WHERE id = ?`;

    await this.executeQuery(query, [id]);

    this.disconnect();
  }
}
