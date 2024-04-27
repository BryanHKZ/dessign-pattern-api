import UserMapper from "./mappers/UserMapper";

export default class UserController {
  getAllUsers() {
    const userMapper = new UserMapper();

    return userMapper.findAllUsers();
  }
}
