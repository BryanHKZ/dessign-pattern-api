import { Request, Response } from "express";
import ProjectMapper from "../../mappers/ProjectMapper";

export default class ProjectController {
  private projectMapper: ProjectMapper;
  constructor() {
    this.projectMapper = new ProjectMapper();
  }

  createProject = async (req: Request, res: Response) => {
    try {
      const project = await this.projectMapper.createProject(req.body);

      if (project) {
        res.status(201).json(await project.toApi());
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  getProjectById = async (req: Request, res: Response) => {
    try {
      const project = await this.projectMapper.findProjectById(
        parseInt(req.params.id)
      );
      if (!project) {
        res.status(404).send("Project not found");
        return;
      }
      res.status(200).send(await project.toApi());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  getProjects = async (req: Request, res: Response) => {
    try {
      const projects = await this.projectMapper.findAllProjects();

      let result = [];

      for await (const project of projects) {
        result.push(await project.toApi());
      }

      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  updateProject = async (req: Request, res: Response) => {
    try {
      const project = await this.projectMapper.updateProject(
        req.params.id,
        req.body
      );
      if (!project)
        return res.status(404).json({ error: "Proyecto no encontrado" });
      res.status(200).send(await project.toApi());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  deleteProject = async (req: Request, res: Response) => {
    try {
      const r = await this.projectMapper.deleteProject(req.params.id);
      if (!r) return res.status(404).json({ error: "Proyecto no encontrado" });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
}
