import { Request, Response } from "express";
import TaskMapper from "../../mappers/TaskMapper";

export default class TaskController {
  private taskMapper: TaskMapper;
  constructor() {
    this.taskMapper = new TaskMapper();
  }

  createTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskMapper.createTask(req.body);
      res.status(201).send(task.toApi());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await this.taskMapper.findTaskById(parseInt(req.params.id));
      if (!task) {
        res.status(404).json({ error: "Tarea no encontrada" });
        return;
      }
      res.status(200).send(task.toApi());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };

  getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskMapper.findAllTasks();
      res.status(200).send(tasks.map(async (task) => await task.toApi()));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskMapper.updateTask(req.body);
      res.status(200).send(task.toApi());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      await this.taskMapper.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ha ocurrido un error" });
    }
  };
}
