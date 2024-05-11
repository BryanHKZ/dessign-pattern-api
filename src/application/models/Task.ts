import ProjectCategoryMapper from "../mappers/ProjectCategoryMapper";
import ProjectMapper from "../mappers/ProjectMapper";
import UserMapper from "../mappers/UserMapper";
import ProjectModel from "./Project";
import ProjectCategoryModel from "./ProjectCategoryModel";
import UserModel from "./User";

export default class TaskModel {
  private id: number;
  private name: string;
  private description: string;
  private completed: "yes" | "no";
  private assignedTo: number;
  private idCategory: number;
  private idProject: number;
  private metadata: string;

  constructor(task: any) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;
    this.completed = task.completed;
    this.assignedTo = task.assignedTo;
    this.idCategory = task.idCategory;
    this.idProject = task.idProject;
    this.metadata = task.metadata;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getCompleted() {
    return this.completed;
  }

  getAssignedToId(): number | null {
    return this.assignedTo || null;
  }

  getIdCategory(): number | null {
    return this.idCategory || null;
  }

  getIdProject(): number | null {
    return this.idProject || null;
  }

  isCompleted(): boolean {
    return this.completed === "yes";
  }

  async getAssignedTo(): Promise<UserModel | null> {
    try {
      const userMapper = new UserMapper();

      const user = await userMapper
        .findUserById(this.assignedTo)
        .then((user) => {
          return user;
        });

      return user;
    } catch (error) {
      return null;
    }
  }

  async getCategory(): Promise<ProjectCategoryModel | null> {
    try {
      const mapper = new ProjectCategoryMapper();

      const category = await mapper.findCategoryById(this.getIdCategory());

      return category;
    } catch (error) {
      return null;
    }
  }

  async getProject(): Promise<ProjectModel | null> {
    try {
      const mapper = new ProjectMapper();
      const project = await mapper.findProjectById(this.getIdProject());

      return project;
    } catch (error) {
      return null;
    }
  }

  getMetadata(): any {
    if (!this.metadata) return {};
    return JSON.parse(this.metadata);
  }

  setId(id: number): void {
    this.id = id;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setCompleted(completed: "yes" | "no"): void {
    this.completed = completed;
  }

  setAssignedTo(assignedTo: number): void {
    this.assignedTo = assignedTo;
  }

  setIdCategory(idCategory: number): void {
    this.idCategory = idCategory;
  }

  setIdProject(idProject: number): void {
    this.idProject = idProject;
  }

  setMetadataField(key: string, value: any): void {
    const metadata = this.getMetadata();
    metadata[key] = value;
    this.metadata = JSON.stringify(metadata);
  }

  async toApi(): Promise<any> {
    const assignedTo = await this.getAssignedTo();
    const category = await this.getCategory();
    const project = await this.getProject();

    const base = {
      id: this.getId(),
      name: this.getName(),
      description: this.getDescription(),
      completed: this.isCompleted(),
      assignedTo: assignedTo ? assignedTo.toApi() : null,
      category: category ? await category.toApi() : null,
      project: project ? await project.toApi(true) : null,
      metadata: this.getMetadata(),
    };

    return base;
  }
}
