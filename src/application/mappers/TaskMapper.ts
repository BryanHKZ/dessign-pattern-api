import DBConnection from "../database/DBConnection";
import { ITask } from "../interfaces";
import TaskModel from "../models/Task";

export default class TaskMapper extends DBConnection {
  public static dbName = "task";
  public static fields = [
    "id",
    "name",
    "description",
    "completed",
    "idUser",
    "idProject",
    "idCategory",
    "metadata",
  ];

  constructor() {
    super();
  }

  async createTask(task: ITask) {
    try {
      const newTask = new TaskModel(task);

      await this.save(newTask);

      return newTask;
    } catch (error) {
      console.error(error);
    }
  }

  async updateTask(task: ITask) {
    try {
      const existingTask = await this.findTaskById(task.id);

      if (!existingTask) return null;

      if (task.name) existingTask.setName(task.name);
      if (task.description) existingTask.setDescription(task.description);
      if (task.completed)
        existingTask.setCompleted(task.completed ? "yes" : "no");
      if (task.assignedTo) existingTask.setIdUser(task.assignedTo);
      if (task.category) existingTask.setIdCategory(task.category);

      await this.update(existingTask);

      return existingTask;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTask(id: string) {
    try {
      const existingTask = await this.findTaskById(parseInt(id));

      if (!existingTask) return null;

      await this.delete(existingTask.getId());

      return existingTask;
    } catch (error) {
      console.error(error);
    }
  }

  async findTaskById(id: number): Promise<TaskModel | null> {
    try {
      const task = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(TaskMapper.fields)} FROM ${
          TaskMapper.dbName
        } WHERE id = ?`,
        [id.toString()]
      );
      if (!task.length) return null;

      return new TaskModel(task[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async findAllTasks(): Promise<TaskModel[] | []> {
    const tasks = await this.executeQuery(
      `SELECT ${DBConnection.formatFields(TaskMapper.fields)} FROM ${
        TaskMapper.dbName
      }`,
      []
    );
    return tasks.map((task: ITask) => new TaskModel(task));
  }

  async findAllTasksByProjectId(idProject: number): Promise<TaskModel[] | []> {
    const tasks = await this.executeQuery(
      `SELECT ${DBConnection.formatFields(TaskMapper.fields)} FROM ${
        TaskMapper.dbName
      } WHERE idProject = ?`,
      [idProject.toString()]
    );
    return tasks.map((task: ITask) => new TaskModel(task));
  }

  async getTasksByCategory(idCategory: number) {
    try {
      const tasks = await this.executeQuery(
        `SELECT * FROM task WHERE idCategory = ?`,
        [idCategory.toString()]
      );

      if (!tasks.length) return [];

      return tasks;
    } catch (error) {
      console.error(error);
    }
  }

  async save(task: TaskModel) {
    const metadataString = JSON.stringify(task.getMetadata());

    const query = `INSERT INTO ${
      TaskMapper.dbName
    } (${DBConnection.formatFields(
      TaskMapper.fields,
      true
    )}) VALUES (?, ?, ?, ?, ?, ?)`;

    const { insertId } = await this.executeQuery(query, [
      task.getName(),
      task.getDescription(),
      task.getCompleted(),
      task.getIdUser().toString(),
      task.getIdCategory().toString(),
      metadataString,
    ]);

    task.setId(insertId);
    this.disconnect();
  }

  async update(task: TaskModel) {
    try {
      const updatedTask = await this.executeQuery(
        `UPDATE ${TaskMapper.dbName} SET ${DBConnection.mapFields(
          TaskMapper.fields,
          true
        )},  WHERE id = ?`,
        [
          task.getName(),
          task.getDescription(),
          task.getCompleted(),
          task.getIdUser().toString(),
          task.getIdCategory().toString(),
          JSON.stringify(task.getMetadata()),
          task.getId().toString(),
        ]
      );
      return new TaskModel(updatedTask);
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.executeQuery(`DELETE FROM ${TaskMapper.dbName} WHERE id = ?`, [
        id.toString(),
      ]);
    } catch (error) {
      console.error(error);
    }
  }
}
