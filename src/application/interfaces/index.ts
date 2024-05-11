export type Status = "active" | "inactive" | "deleted";

export interface IUser {
  id?: number;
  status: Status;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  metadata?: string;
}

export interface IProject {
  id: number;
  name: string;
  toDate: Date;
  status: Status;
  createdBy: number;
  assignedTo: number;
  metadata?: string;
}

export interface IProjectCategory {
  id: number;
  name: string;
  idProject: string;
  tasks?: ITask[];
}

export interface ITask {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  assignedTo?: number;
  idCategory?: number;
  idProject?: number;
  metadata?: string;
}

export interface AuthenticationStrategy {
  authenticate(email: string, password: string): Promise<string>;
}

export interface DatabaseConnection {
  connect(): void;
  disconnect(): void;
  executeQuery(query: string, values: string[]): Promise<any>;
}
