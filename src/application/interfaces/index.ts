export type Status = "active" | "inactive" | "deleted";

export interface IUser {
  id?: number;
  status: Status;
  name: string;
  email: string;
  password?: string;
  metadata?: string;
}

export interface IProject {
  id: number;
  name: string;
  toDate: Date;
  status: Status;
  createdBy: IUser | null;
  assignedTo: IUser | null;
  metadata?: string;
}

export interface IProjectCategory {
  id: number;
  name: string;
  project_id: string;
  tasks?: ITask[];
}

export interface ITask {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  assignedTo?: IUser;
  category?: IProjectCategory;
  project?: IProject;
  metadata?: string;
}

export interface AuthenticationStrategy {
  authenticate(email: string, password: string): boolean;
}

export interface DatabaseConnection {
  connect(): void;
  disconnect(): void;
  executeQuery(query: string): Promise<any>;
}
