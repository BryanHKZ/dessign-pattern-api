import DBConnection from "../database/DBConnection";
import { ITask } from "../interfaces";
import TaskModel from "../models/Task";
import Model_Utils from "../models/Utils";
import ProjectMapper from "./ProjectMapper";

export default class TaskMapper extends DBConnection {
  public static dbName = "task";
  public static fields = [
    "id",
    "name",
    "description",
    "completed",
    "assignedTo",
    "idProject",
    "idCategory",
    "metadata",
  ];

  constructor() {
    super();
  }

  async createTask(task: ITask) {
    try {
      const existProject = await new ProjectMapper().findProjectById(
        task.idProject
      );

      if (!existProject) throw new Error("Project not found");
      const newTask = new TaskModel(task);

      newTask.setMetadataField("createdAt", Model_Utils.formatDate(new Date()));

      await this.save(newTask);

      return newTask;
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(projectId: string, taskId: string, task: ITask) {
    try {
      const existingTask = await this.findTaskByIdAndProjectId(
        parseInt(projectId),
        parseInt(taskId)
      );

      if (!existingTask) return null;

      if (task.name) existingTask.setName(task.name);
      if (task.description) existingTask.setDescription(task.description);
      if (task.completed)
        existingTask.setCompleted(task.completed ? "yes" : "no");
      if (task.assignedTo) existingTask.setAssignedTo(task.assignedTo);
      if (task.idCategory) existingTask.setIdCategory(task.idCategory);
      if (task.idProject) existingTask.setIdProject(task.idProject);

      existingTask.setMetadataField(
        "updatedAt",
        Model_Utils.formatDate(new Date())
      );

      await this.update(projectId, existingTask);

      return existingTask;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTask(idProject: string, idTask: string) {
    try {
      const existingTask = await this.findTaskByIdAndProjectId(
        parseInt(idProject),
        parseInt(idTask)
      );

      if (!existingTask) return null;

      await this.delete(existingTask);

      return existingTask;
    } catch (error) {
      console.error(error);
    }
  }

  async findTaskById(id: number): Promise<TaskModel | null> {
    try {
      const task = await this.executeQuery(
        DBConnection.generateSelectQuery(TaskMapper.dbName, TaskMapper.fields, [
          "id",
        ]),
        [id]
      );
      if (!task.length) return null;

      return new TaskModel(task[0]);
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findAllTasks(): Promise<TaskModel[] | []> {
    try {
      const tasks = await this.executeQuery(
        DBConnection.generateSelectQuery(
          TaskMapper.dbName,
          TaskMapper.fields,
          []
        ),
        []
      );
      return tasks.map((task: ITask) => new TaskModel(task));
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findTaskByIdAndProjectId(
    idProject: number,
    idTask: number
  ): Promise<TaskModel | null> {
    try {
      const task = await this.executeQuery(
        DBConnection.generateSelectQuery(TaskMapper.dbName, TaskMapper.fields, [
          "id",
          "idProject",
        ]),
        [idTask, idProject]
      );
      if (!task.length) return null;

      return new TaskModel(task[0]);
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async findAllTasksByProjectId(idProject: number): Promise<TaskModel[] | []> {
    try {
      const tasks = await this.executeQuery(
        DBConnection.generateSelectQuery(TaskMapper.dbName, TaskMapper.fields, [
          "idProject",
        ]),
        [idProject]
      );
      return tasks.map((task: ITask) => new TaskModel(task));
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async getTasksByCategory(idCategory: number) {
    try {
      const tasks = await this.executeQuery(
        DBConnection.generateSelectQuery(TaskMapper.dbName, TaskMapper.fields, [
          "idCategory",
        ]),
        [idCategory]
      );

      if (!tasks.length) return [];

      return tasks;
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async save(task: TaskModel) {
    const metadataString = JSON.stringify(task.getMetadata());

    const query = DBConnection.generateInsertQuery(
      TaskMapper.dbName,
      TaskMapper.fields,
      true
    );

    const { insertId } = await this.executeQuery(query, [
      task.getName(),
      task.getDescription(),
      task.getCompleted(),
      task.getAssignedToId(),
      task.getIdProject(),
      task.getIdCategory(),
      metadataString,
    ]);

    task.setId(insertId);
    this.disconnect();
  }

  async update(oldIdProject: string, task: TaskModel) {
    try {
      await this.executeQuery(
        DBConnection.generateUpdateQuery(
          TaskMapper.dbName,
          TaskMapper.fields,
          true,
          ["idProject", "id"]
        ),
        [
          task.getName(),
          task.getDescription(),
          task.getCompleted(),
          task.getAssignedToId(),
          task.getIdProject(),
          task.getIdCategory(),
          JSON.stringify(task.getMetadata()),
          oldIdProject,
          task.getId(),
        ]
      );

      this.disconnect();
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }

  async delete(task: TaskModel): Promise<void> {
    try {
      await this.executeQuery(
        DBConnection.generateDeleteQuery(TaskMapper.dbName, [
          "id",
          "idProject",
        ]),
        [task.getId(), task.getIdProject()]
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.disconnect();
    }
  }
}
