import { IProjectCategory, ITask, Status } from "../interfaces";
import ProjectCategoryMapper from "../mappers/ProjectCategoryMapper";
import TaskMapper from "../mappers/TaskMapper";
import UserMapper from "../mappers/UserMapper";
import UserModel from "./User";
import Model_Utils from "./Utils";

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

  getDate(): string {
    return Model_Utils.formatDate(this.toDate);
  }

  getStatus(): Status {
    return this.status;
  }

  getCreatorId(): number | null {
    return this.createdBy || null;
  }

  getAssignedToId(): number | null {
    return this.assignedTo || null;
  }

  async getCreator(): Promise<UserModel | null> {
    if (!this.getCreatorId()) return null;
    const existUser = await new UserMapper().findUserById(this.getCreatorId());

    if (!existUser) return null;

    return existUser;
  }

  async getAssignedTo(): Promise<UserModel | null> {
    if (!this.getAssignedToId()) return null;

    const existUser = await new UserMapper().findUserById(
      this.getAssignedToId()
    );

    if (!existUser) return null;

    return existUser;
  }

  getMetadata(): any {
    if (!this.metadata) return {};
    return JSON.parse(this.metadata);
  }

  async getCategories(): Promise<IProjectCategory[]> {
    try {
      const categories =
        await new ProjectCategoryMapper().findAllCategoriesByProjectId(
          this.getId().toString()
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

  async toApi(simple = false): Promise<any> {
    const base: any = {
      id: this.getId(),
      name: this.getName(),
      toDate: this.getDate(),
      status: this.getStatus(),
    };

    if (!simple) {
      let tasks = await this.getTasks();
      const isAssigned = await this.getAssignedTo();
      const hasCreator = await this.getCreator();

      base.createdBy = hasCreator ? await hasCreator.toApi() : null;
      base.assignedTo = isAssigned ? await isAssigned.toApi() : null;
      base.categories = await this.getCategories();
      base.tasks = tasks;
    }

    return base;
  }
}
