import { IProjectCategory, ITask } from "../interfaces";
import TaskMapper from "../mappers/TaskMapper";

export default class ProjectCategoryModel {
  private id: number;
  private name: string;
  private idProject: string;

  constructor(projectCategory: any) {
    this.id = projectCategory.id;
    this.name = projectCategory.name;
    this.idProject = projectCategory.idProject;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getIdProject(): string {
    return this.idProject;
  }

  async getTasks(): Promise<ITask[]> {
    try {
      const tasks = await new TaskMapper().getTasksByCategory(this.getId());
      return tasks;
    } catch (error) {
      console.error(error);
    }
  }

  setId(id: number): void {
    this.id = id;
  }

  setName(name: string): void {
    this.name = name;
  }

  setIdProject(idProject: string): void {
    this.idProject = idProject;
  }

  async toApi(includeTasks = false): Promise<IProjectCategory> {
    const base: IProjectCategory = {
      id: this.getId(),
      name: this.getName(),
      project_id: this.getIdProject(),
    };

    if (includeTasks) {
      base.tasks = await this.getTasks();
    }

    return base;
  }
}
