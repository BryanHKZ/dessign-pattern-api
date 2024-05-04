import { Request, Response } from "express";
import UserMapper from "./UserMapper";

export default class UserController {
  getAllUsers(req: Request, res: Response) {
    const userMapper = new UserMapper();
    console.log("🚀 ~ UserController ~ getAllUsers ~ userMapper:", userMapper);

    userMapper
      .findAllUsers()
      .then((users) => {
        console.log("🚀 ~ UserController ~ .then ~ users:", users);
        res.status(200).json(users);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
}
