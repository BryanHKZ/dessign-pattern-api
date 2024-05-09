import { Request, Response } from "express";
import UserMapper from "../../mappers/UserMapper";

export default class UserController {
  private userMapper: UserMapper;
  constructor() {
    this.userMapper = new UserMapper();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.getMapper().findAllUsers();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.getMapper().findUserById(parseInt(id));

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createUser = async (req: Request, res: Response) => {
    console.log("🚀 ~ UserController ~ createUser= ~ req:", req);
    try {
      const user = req.body;
      console.log("🚀 ~ UserController ~ createUser= ~ user:", user);
      const newUser = await this.getMapper().createUser(user);

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getMapper = () => {
    if (!this.userMapper) this.userMapper = new UserMapper();
    return this.userMapper;
  };
}
