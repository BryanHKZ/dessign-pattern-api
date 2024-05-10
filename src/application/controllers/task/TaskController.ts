import { Request, Response } from "express";
import TaskMapper from "../../mappers/TaskMapper";

export default class TaskController {
  private taskMapper: TaskMapper;
  constructor() {
    this.taskMapper = new TaskMapper();
  }

  async createTask(req: Request, res: Response) {
    try {
      const task = await this.taskMapper.createTask(req.body);
      res.status(201).send(task);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const task = await this.taskMapper.findTaskById(parseInt(req.params.id));
      if (!task) {
        res.status(404).send("Task not found");
        return;
      }
      res.status(200).send(task);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskMapper.findAllTasks();
      res.status(200).send(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const task = await this.taskMapper.updateTask(req.body);
      res.status(200).send(task);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      await this.taskMapper.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}
