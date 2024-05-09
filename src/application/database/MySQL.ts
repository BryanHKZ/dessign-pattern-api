import mysql from "mysql2/promise";
import { initEnvironmentVariables } from "../../utils";
import { DatabaseConnection } from "../interfaces";

export default class MySQLConnection implements DatabaseConnection {
  private connection: mysql.Connection;

  constructor() {
    initEnvironmentVariables();
    this.createConnection();
  }

  async createConnection() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        database: process.env.MYSQL_DB_NAME,
        password: process.env.MYSQL_DB_PASS,
        port: parseInt(process.env.MYSQL_DB_PORT),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async connect() {
    await this.createConnection();
    console.log("Connected to MySQL");
  }

  disconnect() {
    if (this.connection) {
      this.connection.end();
    }
  }

  async executeQuery(query: string) {
    console.log("🚀 ~ MySQLConnection ~ executeQuery ~ query:", query);
    try {
      const [results, fields] = await this.connection.query(query);
      console.log(
        "🚀 ~ MySQLConnection ~ executeQuery ~ results, fields:",
        results,
        fields
      );

      return results;
    } catch (error) {
      console.log("DBQuery", error);
    } finally {
      this.disconnect();
    }
  }
}
