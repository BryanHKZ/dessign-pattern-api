import MySQLConnection from "../database/MySQL";
import { DatabaseConnection } from "../interfaces";

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

  executeQuery(query: string) {
    return this.databaseStrategy.executeQuery(query);
  }

  formatFields(fields: string[], ignoreId = false) {
    if (ignoreId) {
      return fields.filter((field) => field !== "id").join(",");
    }
    return fields.join(",");
  }
}
