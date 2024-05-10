import UserMapper from "../mappers/UserMapper";
import ProjectModel from "./Project";
import ProjectCategoryModel from "./ProjectCategoryModel";
import UserModel from "./User";

export default class TaskModel {
  private id: number;
  private name: string;
  private description: string;
  private completed: "yes" | "no";
  private idUser: number;
  private idCategory: number;
  private idProject: number;
  private metadata: string;

  constructor(task: any) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;
    this.completed = task.completed;
    this.idUser = task.idUser;
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

  getIdUser(): number {
    return this.idUser;
  }

  getIdCategory(): number {
    return this.idCategory;
  }

  getIdProject(): number {
    return this.idProject;
  }

  isCompleted(): boolean {
    return this.completed === "yes";
  }

  async getAssignedTo(): Promise<UserModel | null> {
    try {
      const userMapper = new UserMapper();

      const user = await userMapper.findUserById(this.idUser).then((user) => {
        return user;
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  async getCategory(): Promise<ProjectCategoryModel | null> {
    try {
      //DO REQUEST TO DATABASE TO GET CATEGORY
      return null;
    } catch (error) {
      return null;
    }
  }

  async getProject(): Promise<ProjectModel | null> {
    try {
      //DO REQUEST TO DATABASE TO GET PROJECT
      return null;
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

  setIdUser(idUser: number): void {
    this.idUser = idUser;
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
      project: project ? project.toApi() : null,
      metadata: this.getMetadata(),
    };

    return base;
  }
}