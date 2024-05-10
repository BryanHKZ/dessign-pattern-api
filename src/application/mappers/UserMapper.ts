import DBConnection from "../database/DBConnection";
import { IUser } from "../interfaces";
import UserModel from "../models/User";

export default class UserMapper extends DBConnection {
  public static dbName = "user";
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
    try {
      const user = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(UserMapper.fields)} FROM ${
          UserMapper.dbName
        } WHERE email = ?`,
        [email]
      );
      if (!user.length) return null;

      return new UserModel(user[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async findUserById(id?: number): Promise<UserModel | null> {
    try {
      const user = await this.executeQuery(
        `SELECT ${DBConnection.formatFields(UserMapper.fields)} FROM ${
          UserMapper.dbName
        } WHERE id = ?`,
        [id.toString()]
      );
      if (!user.length) return null;

      return new UserModel(user[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async findAllUsers(): Promise<UserModel[] | []> {
    const users = await this.executeQuery(
      `SELECT ${DBConnection.formatFields(UserMapper.fields)} FROM ${
        UserMapper.dbName
      }`,
      []
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

      const newUser = new UserModel(user);
      newUser.setMetadataField("createdAt", new Date().toISOString());

      await this.save(newUser);

      return newUser;
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(id: number, user: IUser): Promise<UserModel | null> {
    try {
      const existingUser = await this.findUserById(id);

      if (!existingUser) return null;

      if (user.firstName) existingUser.setFirstName(user.firstName);
      if (user.lastName) existingUser.setLastName(user.lastName);
      if (user.email) existingUser.setEmail(user.email);
      if (user.password) existingUser.setPassword(user.password);
      if (user.status) existingUser.setStatus(user.status);

      existingUser.setMetadataField("updatedAt", new Date().toISOString());

      await this.update(existingUser);

      return existingUser;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await this.delete(id);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async save(user: UserModel) {
    const metadataString = JSON.stringify(user.getMetadata());

    const query = `INSERT INTO ${
      UserMapper.dbName
    } (${DBConnection.formatFields(
      UserMapper.fields,
      true
    )}) VALUES (?, ?, ?, ?, ?, ?)`;

    const { insertId } = await this.executeQuery(query, [
      user.getEmail(),
      user.getFirstName(),
      user.getLastName(),
      user.getStatus(),
      user.getPassword(),
      metadataString,
    ]);

    user.setId(insertId);
    this.disconnect();
  }

  async update(user: UserModel) {
    const metadataString = JSON.stringify(user.getMetadata());

    const query = `UPDATE ${UserMapper.dbName} SET ${DBConnection.mapFields(
      UserMapper.fields,
      true
    )} WHERE id = ?`;

    await this.executeQuery(query, [
      user.getEmail(),
      user.getFirstName(),
      user.getLastName(),
      user.getStatus(),
      user.getPassword(),
      metadataString,
      user.getId().toString(),
    ]);
    this.disconnect();
  }

  async delete(id: number) {
    await this.executeQuery(`DELETE FROM ${UserMapper.dbName} WHERE id = ?`, [
      id.toString(),
    ]);

    this.disconnect();
  }
}
