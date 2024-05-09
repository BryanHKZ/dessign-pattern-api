import { IUser } from "../interfaces";
import UserModel from "../models/User";
import DBConnection from "./IntegrationMapper";

export default class UserMapper extends DBConnection {
  private dbName = "user";
  public static fields = [
    "email",
    "firstName",
    "id",
    "lastName",
    "status",
    "password",
    "metadata",
  ];

  constructor() {
    super();
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    //DO REQUEST TO DATABASE AND RETURNED DATA MUST BE MAPPED TO USER MODEL
    try {
      const user = await this.executeQuery(
        `SELECT ${this.formatFields(UserMapper.fields)} FROM ${
          this.dbName
        } WHERE email = ${email}`
      );
      if (!user) return null;

      return new UserModel(user);
    } catch (error) {
      console.log(error);
    }
  }
  async findUserById(id?: number): Promise<UserModel | null> {
    try {
      const user = await this.executeQuery(
        `SELECT ${this.formatFields(UserMapper.fields)} FROM ${
          this.dbName
        } WHERE id = ${id}`
      );
      if (!user) return null;

      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async findAllUsers(): Promise<UserModel[] | []> {
    const users = await this.executeQuery(
      `SELECT ${this.formatFields(UserMapper.fields)} FROM ${this.dbName}`
    );
    return users.map((user: IUser) => new UserModel(user));
  }
  async createUser(user: IUser): Promise<UserModel | null> {
    try {
      if (!user.metadata) {
        user.metadata = "{}";
      } else {
        user.metadata = JSON.stringify(user.metadata);
      }

      const newUser = await this.executeQuery(
        `INSERT INTO ${this.dbName} (${this.formatFields(
          UserMapper.fields,
          true
        )}) VALUES ('${Object.values(user).join("','")}')`
      );

      if (!newUser) return null;

      console.log("🚀 ~ UserMapper ~ createUser ~ newUser:", newUser);

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
}
