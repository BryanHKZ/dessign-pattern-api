import DBConnection from "../database/DBConnection";
import { IProject, IProjectCategory } from "../interfaces";
import ProjectModel from "../models/Project";
import ProjectCategoryModel from "../models/ProjectCategoryModel";

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

  async createProject(project: IProject) {
    try {
      const newProject = new ProjectModel(project);

      await this.save(newProject);

      return newProject.toApi();
    } catch (error) {
      console.error(error);
    }
  }

  async updateProject(project: IProject) {
    try {
      const existingProject = await this.findProjectById(project.id);

      if (!existingProject) return null;

      if (project.name) existingProject.setName(project.name);
      if (project.toDate) existingProject.setDate(project.toDate);
      if (project.status) existingProject.setStatus(project.status);
      if (project.createdBy) existingProject.setCreator(project.createdBy);
      if (project.assignedTo) existingProject.setAssignedTo(project.assignedTo);

      await this.update(existingProject);

      return existingProject.toApi();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProject(id: number) {
    try {
      const existingProject = await this.findProjectById(id);

      if (!existingProject) return null;

      await this.delete(id);

      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async findProjectById(id: number): Promise<ProjectModel | null> {
    try {
      const project = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(ProjectMapper.fields)} FROM ${
          ProjectMapper.dbName
        } WHERE id = ?`,
        [id.toString()]
      );
      if (!project.length) return null;

      return new ProjectModel(project[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async findAllProjects(): Promise<ProjectModel[] | []> {
    const projects = await this.executeQuery(
      `SELECT ${DBConnection.formatFields(ProjectMapper.fields)} FROM ${
        ProjectMapper.dbName
      }`,
      []
    );
    return projects.map((project: IProject) => new ProjectModel(project));
  }

  async findCategoriesByProjectId(
    idProject: number
  ): Promise<ProjectCategoryModel[]> {
    try {
      const categories = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(ProjectMapper.fields)} FROM ${
          ProjectMapper.dbName
        } WHERE idProject = ?`,
        [idProject.toString()]
      );
      if (!categories.length) return [];

      return categories.map(
        (project: IProjectCategory) => new ProjectCategoryModel(project)
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async save(project: ProjectModel) {
    const query = `INSERT INTO ${
      ProjectMapper.dbName
    } (${DBConnection.formatFields(
      ProjectMapper.fields,
      true
    )}) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const { insertId } = await this.executeQuery(query, [
      project.getName(),
      project.getDate().toISOString(),
      project.getStatus(),
      project.getCreatorId().toString(),
      project.getAssignedToId().toString(),
      JSON.stringify(project.getMetadata()),
    ]);

    project.setId(insertId);
  }

  async update(project: ProjectModel) {
    const query = `UPDATE ${ProjectMapper.dbName} SET ${DBConnection.mapFields(
      ProjectMapper.fields,
      true
    )} WHERE id = ?`;

    await this.executeQuery(query, [
      project.getName(),
      project.getDate().toISOString(),
      project.getStatus(),
      project.getCreatorId().toString(),
      project.getAssignedToId().toString(),
      JSON.stringify(project.getMetadata()),
      project.getId().toString(),
    ]);
  }

  async delete(id: number) {
    const query = `DELETE FROM ${ProjectMapper.dbName} WHERE id = ?`;

    await this.executeQuery(query, [id.toString()]);
  }
}
