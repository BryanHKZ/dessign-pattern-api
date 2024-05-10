import { Request, Response } from "express";
import UserMapper from "../../mappers/UserMapper";

export default class UserController {
  private mapper: UserMapper;
  constructor() {
    this.mapper = new UserMapper();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.mapper.findAllUsers();

      res.status(200).json(users.map((user) => user.toApi()));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.mapper.findUserById(parseInt(id));

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user.toApi());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const newUser = await this.mapper.createUser(user);

      res.status(201).json(newUser.toApi());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = req.body;
      const updatedUser = await this.mapper.updateUser(parseInt(id), user);

      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(updatedUser.toApi());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedUser = await this.mapper.findUserById(parseInt(id));

      if (!deletedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      await this.mapper.deleteUser(parseInt(id));

      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
