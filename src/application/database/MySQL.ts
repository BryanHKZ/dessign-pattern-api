import mysql from "mysql2/promise";
import { initEnvironmentVariables } from "../../utils";
import { DatabaseConnection } from "../interfaces";

export default class MySQLConnection implements DatabaseConnection {
  private connection: mysql.Connection;

  constructor() {
    initEnvironmentVariables();
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        database: process.env.MYSQL_DB_NAME,
        password: process.env.MYSQL_DB_PASS,
        port: parseInt(process.env.MYSQL_DB_PORT),
      });

      console.log("Connected to MySQL");
    } catch (error) {
      console.error(error);
    }
  }

  disconnect() {
    setTimeout(() => {
      this.connection.end({ timeout: 3000 });
      console.log("Disconnected from MySQL");
    }, 2000);
  }

  async executeQuery(query: string) {
    try {
      await this.connect();

      const [results] = await this.connection.query(query);

      return results;
    } catch (error) {
      console.log("DBQueryError", error);
    }
  }
}
