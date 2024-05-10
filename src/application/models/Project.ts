import { IProjectCategory, ITask, Status } from "../interfaces";
import ProjectMapper from "../mappers/ProjectMapper";
import TaskMapper from "../mappers/TaskMapper";
import UserMapper from "../mappers/UserMapper";
import UserModel from "./User";

export default class ProjectModel {
  private id: number;
  private name: string;
  private toDate: Date;
  private status: Status;
  private createdBy: number;
  private assignedTo: number;
  private metadata: string;

  constructor(project: any) {
    this.id = project.id;
    this.name = project.name;
    this.toDate = project.toDate;
    this.status = project.status;
    this.createdBy = project.createdBy;
    this.assignedTo = project.assignedTo;
    this.metadata = project.metadata;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.toDate;
  }

  getStatus(): Status {
    return this.status;
  }

  getCreatorId(): number {
    return this.createdBy;
  }

  getAssignedToId(): number {
    return this.assignedTo;
  }

  async getCreator(): Promise<UserModel | null> {
    const existUser = await new UserMapper().findUserById(this.createdBy);

    if (!existUser) return null;

    return existUser;
  }

  async getAssignedTo(): Promise<UserModel | null> {
    const existUser = await new UserMapper().findUserById(this.createdBy);

    if (!existUser) return null;

    return existUser;
  }

  getMetadata(): any {
    if (!this.metadata) return {};
    return JSON.parse(this.metadata);
  }

  async getCategories(): Promise<IProjectCategory[]> {
    try {
      const categories = await new ProjectMapper().findCategoriesByProjectId(
        this.getId()
      );

      if (!categories.length) return [];

      let res = [];

      for await (const category of categories) {
        res.push(await category.toApi());
      }

      return res;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getTasks(): Promise<ITask[]> {
    try {
      const taskMapper = new TaskMapper();
      const tasks = await taskMapper.findAllTasksByProjectId(this.getId());

      if (!tasks.length) return [];

      let res = [];

      for await (const task of tasks) {
        res.push(await task.toApi());
      }

      return res;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  setId(id: number): void {
    this.id = id;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDate(toDate: Date): void {
    this.toDate = toDate;
  }

  setStatus(status: Status): void {
    this.status = status;
  }

  async setCreator(id: number) {
    const existUser = await new UserMapper().findUserById(id);

    if (!existUser) throw new Error("User creator not found");

    this.createdBy = id;
  }

  async setAssignedTo(id: number) {
    const existUser = await new UserMapper().findUserById(id);

    if (!existUser) throw new Error("User assigned to not found");

    this.assignedTo = id;
  }

  setMetadataField(key: string, value: any): void {
    const metadata = this.getMetadata();
    metadata[key] = value;
    this.metadata = JSON.stringify(metadata);
  }

  async toApi(): Promise<any> {
    const base = {
      id: this.getId(),
      name: this.getName(),
      toDate: this.getDate(),
      status: this.getStatus(),
      createdBy: (await this.getCreator()).toApi(),
      assignedTo: (await this.getAssignedTo()).toApi(),
      metadata: this.getMetadata(),
    };

    return base;
  }
}
