import { DatabaseConnection } from "../interfaces";
import MySQLConnection from "./MySQL";

export default class DBConnection {
  private databaseStrategy: DatabaseConnection;

  constructor() {
    this.databaseStrategy = new MySQLConnection();
  }

  connect() {
    this.databaseStrategy.connect();
  }

  disconnect() {
    this.databaseStrategy.disconnect();
  }

  public executeQuery(query: string, values: any[]) {
    return this.databaseStrategy.executeQuery(query, values);
  }

  static mapFields(fields: string[], ignoreId = false) {
    let finalFields = fields;
    if (ignoreId) {
      finalFields = fields.filter((field) => field !== "id");
    }
    return finalFields.map((field) => `${field} = ?`).join(", ");
  }

  static formatFields(fields: string[], ignoreId = false) {
    if (ignoreId) {
      return fields.filter((field) => field !== "id").join(",");
    }
    return fields.join(",");
  }
}
