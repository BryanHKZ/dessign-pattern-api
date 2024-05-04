import { Request, Response } from "express";
import UserMapper from "./UserMapper";

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
      console.log("🚀 ~ UserController ~ getAllUsers ~ error:", error);
      res.status(500).json({ error: error.message });
    }
  };

  getMapper = () => {
    if (!this.userMapper) this.userMapper = new UserMapper();
    return this.userMapper;
  };
}
