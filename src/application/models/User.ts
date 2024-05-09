import { IUser, Status } from "../interfaces";

export default class UserModel {
  private id: number;
  private firstName: string;
  private lastName: string;
  private status: Status;
  private email: string;
  private password: string;
  private metadata: string;

  constructor(user: any) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.status = user.status;
  }

  getId(): number {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getFullName(): string {
    return `${this.getFirstName()} ${this.getLastName()}`;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getStatus(): Status {
    return this.status;
  }

  getMetadata(): any {
    if (!this.metadata) return {};
    return JSON.parse(this.metadata);
  }

  setId(id: number): void {
    this.id = id;
  }

  setName(firstName: string): void {
    this.firstName = firstName;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setStatus(status: Status): void {
    this.status = status;
  }

  setMetadataField(key: string, value: any): void {
    const metadata = this.getMetadata();
    metadata[key] = value;
    this.metadata = JSON.stringify(metadata);
  }

  toApi(includePrivateFields = false): IUser {
    const base: IUser = {
      id: this.getId(),
      name: this.getFullName(),
      email: this.getEmail(),
      status: this.getStatus(),
    };

    if (includePrivateFields) {
      base.password = this.getPassword();
      base.metadata = this.getMetadata();
    }

    return base;
  }
}
