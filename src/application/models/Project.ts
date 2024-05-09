import { IProject, Status } from "../interfaces";
import UserModel from "./User";

export default class ProjectModel {
  private id: number;
  private name: string;
  private toDate: Date;
  private status: Status;
  private createdBy: UserModel;
  private assignedTo: UserModel;
  private metadata: string;

  constructor(project: any) {
    this.id = project.id;
    this.name = project.name;
    this.toDate = project.toDate;
    this.status = project.status;
    this.createdBy = new UserModel(project.createdBy);
    this.assignedTo = new UserModel(project.assignedTo);
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

  getCreator(): UserModel | null {
    return this.createdBy;
  }

  getAssignedTo(): UserModel | null {
    return this.assignedTo;
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

  setDate(toDate: Date): void {
    this.toDate = toDate;
  }

  setStatus(status: Status): void {
    this.status = status;
  }

  setMetadataField(key: string, value: any): void {
    const metadata = this.getMetadata();
    metadata[key] = value;
    this.metadata = JSON.stringify(metadata);
  }

  toApi(includePrivateFields = false): IProject {
    const base: IProject = {
      id: this.getId(),
      name: this.getName(),
      toDate: this.getDate(),
      status: this.getStatus(),
      createdBy: this.getCreator()?.toApi(),
      assignedTo: this.getAssignedTo()?.toApi(),
    };

    if (includePrivateFields) {
      base.metadata = this.getMetadata();
    }

    return base;
  }
}
